import { UI } from '../promptUI/UI.mjs'
import { Client } from '../../../../t4apiwrapper/t4.ts/esm/index.js'
import XLSX from 'xlsx-js-style'
import { stat } from 'fs/promises'
import { resolve } from 'node:path'
import fetch from 'node-fetch'

const rsUrl = 'https://cms.seattleu.edu/terminalfour/rs'

;(async () => {
  while(true) {
    const instance = new UI({ keys: ['t4_token'] })
    await main(instance)
    await instance.closeQuestion()
  }
})()

async function main(instance) {
  const config = await instance.start()
  const { contentType, content, list, serverSideLink, upload, hierarchy, isAuthorized } = new Client(rsUrl, config['t4_token'], 'en', fetch)
  const { sectionID, workbookPath } = await instance.ask([{
    name: 'sectionID',
    description: 'Enter section ID',
    required: true,
  }, {
    name: 'workbookPath',
    description: 'Enter the path or file name of workbook file (xlsx)',
    required: true
  }])

  if (!await isAuthorized()) throw Error('Invalid T4 token')
  const regex = /\(max size: \d+\)/, listObjs = {}, deleteQueue = []
  const workbook = XLSX.readFile(resolve(workbookPath))
  for (let sheet of workbook.SheetNames) {
    try {
      await createContentEntries(sheet)
    } catch (e) {
      console.log(`Failed to parse worksheet: ${sheet}\n${e.stack}`)
    }
  }
  
  if (deleteQueue.length) {
    if (await content.purge(deleteQueue)) {
      console.log(`Deleted empty content entries of sheets that failed to parse`)
    } else {
      console.log(`Failed to delete content entries ${deleteQueue.join(', ')}`)
    }
  }
  
  async function createContentEntries(sheet) {
    const { ct, cleanSheets } = await prepareSheet(sheet)
    for (let cleanSheet of cleanSheets) {
      try {
        let { id, contentObj } = await getID(cleanSheet, ct)
        if (!id) throw Error(`Failed to create template entry for ${sheet}`)
        const elements = await parseElements(cleanSheet, ct, id)
        if (!Object.keys(elements).length) {
          console.log(`Failed to parse worksheet elements: ${id}`)
          deleteQueue.push(id)
          continue
        }
  
        if (isModified(cleanSheet, contentObj?.elements)) {
          const newContent = await content.modify(id, sectionID, { elements })
          console.log(newContent)
          console.log(`Modified ${newContent.name} with ID of ${newContent.id}`)
        } else {
          console.log(`Skipping ${id}, no changes found`)
        }
      } catch (e) {
        console.log(`Failed to create content entry`, e)
        continue
      }
    }
  }
  
  async function getID(cleanSheet, ct) {
    let id, contentObj
    if (cleanSheet['ID']) {
      id = cleanSheet['ID']
      console.log(`Using existing content item ${id}`)
      contentObj = await content.get(id, sectionID)
      delete cleanSheet.ID
    } else {
      console.log(`Creating template content item...`)
      id = (await content.create(sectionID, {
        elements: {},
        contentTypeID: ct.id,
        language: 'en',
        status: 0
      })).id
    }
    return {id, contentObj}
  }
  
  async function prepareSheet(sheet) {
    const tempSheet = workbook.Sheets[sheet]
    const contentTypeID = parseInt(tempSheet['A1'].v)
    const startCellRef = XLSX.utils.decode_cell('C2');
    const sheetObjs = XLSX.utils.sheet_to_json(tempSheet, {
      range: {
        s: {
          r: startCellRef.r,
          c: startCellRef.c
        },
        e: {
          r: XLSX.utils.decode_range(tempSheet['!ref']).e.r,
          c: XLSX.utils.decode_range(tempSheet['!ref']).e.c
        }
      }
    })
    const ct = contentTypeID 
        ? await contentType.get(contentTypeID) 
        : (await content.getWithoutSection(sheetObjs[0].ID)).contentType
    const formattedElements = content.util.getElementNames(ct.contentTypeElements)
    const sheets = []
    for (let sheetObj of sheetObjs) {
      const cleanSheet = {}
      Object.keys(sheetObj).map(sheetName => {
        const trimmedName = sheetName.replace(regex, '').replace('&apos;', '\'').trim()
        cleanSheet[formattedElements[trimmedName] || trimmedName] = sheetObj[sheetName]
      })
      sheets.push(cleanSheet)
    }
    return { ct, cleanSheets: sheets }
  }
  
  // war crimes. Needs to be rewritten when T4 API docs
  async function parseElements(sheet, ct, entryId) {
    let failed = false
    await Promise.all(Object.keys(sheet).map(async key => {
      if (failed) return
      const [id, type] = (key.split('#')[1].split(':')).map(Number)
      try {
        switch (type) {
          case 2:
            const imageData = await parseImageUpload(sheet[key], type)
            if (imageData) {
              sheet[key] = await parseImageUpload(sheet[key], type)
            } else {
              delete sheet[key]
              return
            }
            break
          case 10:
          case 15:
          case 9:
          case 8:
          case 6:
            sheet[key] = await parseListValue(sheet[key], { ct, type, id })
            break
          case 14: 
            sheet[key] = await parseServerSideLink(sheet[key], entryId)
            break
          default:
            break
        }
        sheet[key] = typeof sheet[key] == 'number' && type != 5 ? String(sheet[key]) : sheet[key]
      } catch(error) {
        console.log(error)
        failed = true
      }
    }))
    return failed ? null : sheet
  }
  
  async function parseListValue(str, {ct, type, id}) {
    if (str == '') return ''
    const strSplit = str.split(':')
    if (strSplit.length >= 2 && !strSplit[0].match('[a-z]')) return str
    const contentElement = ct.contentTypeElements.filter(element => element.id == id && element.type == type)[0]
    if (!contentElement) throw Error(`No contentElement exists with ${id}:${type}`)
    if (!listObjs[contentElement.listId]) {
      listObjs[contentElement.listId] = await list.get(contentElement.listId)
    }
    str = str.toLowerCase()
    let options = []
    const checkOption = (opt) => listObjs[contentElement.listId].items.filter(item => item.name.toLowerCase() == opt.trim() || item.value.toLowerCase() == opt.trim())
    if (str.includes('|')) {
      str = str.split('|')
      str.forEach(name => {
        const checkedOpt = checkOption(name) 
        if (checkedOpt.length) {
          options.push(checkedOpt.map(opt => opt.id))
        } else {
          console.log(`Couldn't add ${name} to content element ${contentElement.name}`)
        }
      })
    } else {
      options.push((checkOption(str))[0].id)
    }
    if(!options.length) throw Error(`No list value exists with value ${str}`)
    return `${contentElement.listId}:${options.shift()}${formatMultiSelect(options, type, contentElement.listId)}`
  }

  function formatMultiSelect(options, type, id) {
    if (type != 8) {
      return options.length > 0 ? ';' + options.map(optionId => `${id}:${optionId}`).join(';') : ''
    }
    return options.length > 0 ? ', ' + options.join(', ') : ''
  }
  
  async function parseServerSideLink(str, entryID) {
    if (str.includes('type="sslink"')) return str
    const [sectionId, contentId] = str.split(',').map(str => str.trim()).map(Number)
    if (!sectionId) return ''
    const name = contentId ? (await content.getWithoutSection(contentId, 'en')).name : (await hierarchy.get(sectionId)).name
    let response = await serverSideLink.set({
      active: true,
      attributes: null,
      fromSection: sectionID,
      fromContent: entryID,
      toContent: contentId || 0,
      language: 'en',
      toSection: sectionId,
      linkText: name,
      useDefaultLinkText: true,
    })
    if (!response.id) throw Error(`Failed to create SSL for ${entryID}`)
    response = await serverSideLink.set(response)
    return `<t4 sslink_id="${response.id}" type="sslink" />`
  }
  
  async function parseImageUpload(fileName, id) {
    if (fileName == 'exists' || !fileName.includes('.') || fileName == '') return null
    const path = resolve(`./media/${fileName}`)
    if (!await stat(path)) throw Error(`${path} does not exist!`)
    const returnObj = { existingFile: false }
    const uploadData = await upload.add({
      file: path,
      filename: fileName,
      elementID: id
    })
    returnObj.preferredFilename = uploadData.name
    returnObj.code = uploadData.code
    return returnObj
  }
  
  function isModified(sheet, elements) {
    if (!elements) return true
    let compare1 = '', compare2 = ''
    Object.keys(sheet).sort().forEach(name => compare1 += sheet[name] || '')
    Object.keys(elements).sort().forEach(name => {
      const type = Number(name.split('#')[1].split(':')[1])
      return compare2 += (type == 2 ? '' : elements[name]) || ''
    })
    return compare1 != compare2
  }
}