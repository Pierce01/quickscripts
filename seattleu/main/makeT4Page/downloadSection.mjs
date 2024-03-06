import { UI } from '../promptUI/UI.mjs'
import { Client, Types, batcher } from '../../../../t4apiwrapper/t4.ts/esm/index.js'
import XLSX from 'xlsx-js-style'

// Needs to be refactored to support new sheet format!

const rsUrl = 'https://cms.seattleu.edu/terminalfour/rs',
  listContext = {}

;(async () => {
  while(true) {
    const instance = new UI({ keys: ['t4_token'] })
    await main(instance)
    await instance.closeQuestion()
  }
})()

async function main(instance) {
  const config = await instance.start()
  const { list, content, hierarchy, contentType, isAuthorized } = new Client(rsUrl, config['t4_token'])
  if (!await isAuthorized()) {
    return console.log('Not authorized')
  }
  const { sectionID } = await instance.ask([{
    name: 'sectionID', description: 'Enter section ID', required: true
  }])
  const sectionContent = await hierarchy.getContents(sectionID)
  const contentIDs = sectionContent.contents.map(item => item.id)
  const contentByContentType = {}
  const fetchItem = async(contentID) => {
    try {
      const item = await content.get(contentID, sectionID)
      if (!contentByContentType[item.contentTypeID]) contentByContentType[item.contentTypeID] = []
      console.log(`Fetched ${item.name}...`)
      contentByContentType[item.contentTypeID].push(item)
    } catch (e) {
      console.log(`Failed to parse content ID ${contentID}\n`, e)
    }
  }
  await batcher(contentIDs, 100, 1000, fetchItem)

  let workbook = XLSX.utils.book_new()
  const createSheet = async (contentTypeID, contentObjs) => {
    const contentTypeObj = await contentType.get(contentTypeID)
    if(!contentTypeObj.contentTypeElements) {
      console.log(`No content elements for contentTypeID ${contentTypeID}`)
      return null
    }
    const wscols = [...Array.from({ length: 2 }, () => ({...{ wch: 8 }}))]
    const row = getRow(contentTypeObj, contentObjs)
    let worksheet = XLSX.utils.json_to_sheet(row, { origin: 'C2'})
    await setRequiredStyles(worksheet, contentTypeObj.contentTypeElements)
    Object.keys(row[0]).forEach(key => wscols.push({wch: key == 'ID' ? 8 : key.length * 1.28}))
    worksheet['!cols'] = wscols
    XLSX.utils.sheet_add_aoa(worksheet, [[contentTypeID, 'Types:']], { origin: 'A1' })
    ;['A1', 'C2'].forEach(cell => worksheet[cell].s = { fill: { pattern: 'solid', fgColor: { rgb: 'FF6961' } } })
    XLSX.utils.book_append_sheet(workbook, worksheet, contentTypeObj.name.length >= 31 ? contentTypeObj.name.substring(0, 30) : contentTypeObj.name)
    console.log(`Added ${contentTypeObj.name} to the current workbook!`)
  }
  try {
    const contentTypeIds = Object.keys(contentByContentType)
    for (let id of contentTypeIds) { await createSheet(id, contentByContentType[id]) }
    await XLSX.writeFile(workbook, `${sectionID}.xlsx`)
  } catch(e) {
    console.error(e.stack || e)
  } 
 
  function getRow(contentTypeObject, contentObjs) {
    const resultArr = [], headers = getHeaders(contentTypeObject)
    contentObjs.forEach(item => {
      const { elements, id } = item, dict = {}
      headers.forEach(header => {
        const type = header[1] ? Number(header[1].split('#')[1].split(':')[1]) : 0
        dict[header[0]] = type == 2 ? 'exists' : elements[header[1]]
      })
      dict['ID'] = id
      resultArr.push(dict)
    })
    return resultArr
  }

  function getHeaders(contentTypeObject) {
    const addMaxChar = (str, max) => { return `${str} (max size: ${max})` }
    const elementNames = contentTypeObject.contentTypeElements.map(element => [addMaxChar(element.alias || element.name, element.maxSize), 
      `${element.name}#${element.id}:${element.type}`])
    return [['ID'], ...elementNames]
  }

  // https://stackoverflow.com/a/64456745
  function numberToLetters(num) {
    let letters = ''
    while (num >= 0) {
        letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[num % 26] + letters
        num = Math.floor(num / 26) - 1
    }
    return letters
  }

  async function setRequiredStyles(worksheet, contentTypeElements) {
    const offset = 3
    return Promise.all(contentTypeElements.map(async (element, index) => {
      const col = numberToLetters(index + offset)
      let cell1 = `${col}2`, cell2 = `${col}3`, cell3 = `${col}1`
      worksheet[cell1].s = { alignment: { horizontal: 'center' } }
      worksheet[cell2].s = { alignment: { horizontal: 'left' } }
      await addContext(worksheet, element, cell3)
      worksheet[cell1].s.fill = {
        pattern: 'solid',
        fgColor: { rgb: element.compulsory ? 'FF6961' : 'ADD8E6' }
      }
    }))
  }

  async function addContext(worksheet, element, origin) {
    let val
    switch(element.type) {
      case 2:
        val = 'Media Upload'
        break
      case 3: {
        val = 'HTML Field'
        break
      }
      case 11: {
        val = 'Media ID'
        break
      }
      case 14: {
        val = 'Server Side Link Field. Format: "SectionID, ContentID" OR "SectionID"'
        break
      }
      case 10:
      case 15:
      case 9:
      case 8:
      case 6: {
        if (!element.listId) break
        if (!listContext[element.listId]) {
          listContext[element.listId] = await list.get(element.listId)
        }
        val = `List Options: ${(listContext[element.listId].items.map(item => item.name)).join(', ')}`
        break
      }
      default: {
        val = 'Text'
      }
    }
    XLSX.utils.sheet_add_aoa(worksheet, [[val]], {origin})
    worksheet[origin].s = { alignment: { horizontal: 'left', wrapText: true } }
    return true
  }
}