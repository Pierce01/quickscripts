import { Client } from '../../../../t4apiwrapper/t4.ts/esm/index.js'
import { url, token } from './config.js'
import XLSX from 'xlsx-js-style'
import { stat } from 'fs/promises'
import { resolve } from 'node:path'

const { contentType, content, list, serverSideLink, upload, hierarchy, isAuthorized } = new Client(url, token)

if (!await isAuthorized()) throw Error('Invalid T4 token')

const sectionInput = process.argv.splice(2)[0]
const regex = /\(max size: \d+\)/, listObjs = {}, deleteQueue = []
const workbook = XLSX.readFile('./book.xlsx')
for (let sheet of workbook.SheetNames) {
  try {
    const { ct, cleanSheet } = await prepareSheet(sheet)
    const { id }  = await content.create(sectionInput, {
      elements: {},
      contentTypeID: ct.id,
      language: 'en',
      status: 0
    })
    if (!id) throw Error(`Failed to create template entry for ${sheet}`)
    const elements = await parseElements(cleanSheet, ct, id)
    if (!Object.keys(elements).length) {
      console.log(`Failed to parse worksheet elements: ${sheet}`)
      deleteQueue.push(id)
      continue
    }
    const newContent = await content.modify(id, sectionInput, { elements })
    console.log(`Created ${newContent.name} with ID of ${newContent.id}`)
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

async function prepareSheet(sheet) {
  const sheetObj = XLSX.utils.sheet_to_json(workbook.Sheets[sheet])[0],
    cleanSheet = {},
    ct = await contentType.get(sheetObj.contentTypeID),
    formattedElements = content.util.getElementNames(ct.contentTypeElements)
  Object.keys(sheetObj).map(sheetName => {
    const trimmedName = sheetName.replace(regex, '').trim()
    cleanSheet[formattedElements[trimmedName] || trimmedName] = sheetObj[sheetName]
  })
  delete cleanSheet.contentTypeID
  return { ct, cleanSheet }
}

async function parseElements(sheet, ct, entryId) {
  let failed = false
  await Promise.all(Object.keys(sheet).map(async key => {
    if (failed) return
    const [id, type] = (key.split('#')[1].split(':')).map(Number)
    try {
      switch (type) {
        case 2:
          sheet[key] = await parseImageUpload(sheet[key], type)
          break
        case 15:
        case 9:
        case 6:
          sheet[key] = await parseListValue(sheet[key], { ct, type, id })
          break
        case 14: 
          sheet[key] = await parseServerSideLink(sheet[key], entryId)
          break
        default:
          break
      }
      sheet[key] = typeof sheet[key] == 'number' ? String(sheet[key]) : sheet[key]
    } catch(error) {
      console.log(error)
      failed = true
    }
  }))
  return failed ? null : sheet
}

async function parseListValue(str, {ct, type, id}) {
  if (str == '') return ''
  const contentElement = ct.contentTypeElements.filter(element => element.id == id && element.type == type)[0]
  if (!contentElement) throw Error(`No contentElement exists with ${id}:${type}`)
  if (!listObjs[contentElement.listId]) {
    listObjs[contentElement.listId] = await list.get(contentElement.listId)
  }
  str = str.toLowerCase()
  const option = listObjs[contentElement.listId].items.filter(item => (item.name.toLowerCase()).includes(str) || (item.value.toLowerCase()).includes(str))
  if(!option.length) throw Error(`No list value exists with value ${str}`)
  return `${contentElement.listId}:${option[0].id}`
}

async function parseServerSideLink(str, entryID) {
  const [sectionId, contentId] = str.split(',').map(str => str.trim()).map(Number)
  if (!sectionId) return ''
  const name = contentId ? (await content.getWithoutSection(contentId, 'en')).name : (await hierarchy.get(sectionId)).name
  let response = await serverSideLink.set({
    active: true,
    attributes: null,
    fromSection: sectionInput,
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
  const returnObj = { existingFile: false }
  if (!fileName.includes('.')) return parseInt(fileName) || returnObj
  const path = resolve(`./media/${fileName}`)
  if (!await stat(path)) throw Error(`${path} does not exist!`)
  const uploadData = await upload.add({
    file: path,
    filename: fileName,
    elementID: id
  })
  returnObj.preferredFilename = uploadData.name
  returnObj.code = uploadData.code
  return returnObj
}