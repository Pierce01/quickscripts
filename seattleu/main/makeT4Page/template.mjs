import { UI } from '../promptUI/UI.mjs'
import { Client, Types } from '../../../../t4apiwrapper/t4.ts/esm/index.js'
import XLSX from 'xlsx-js-style'

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
  const { contentType, list } = new Client(rsUrl, config['t4_token'])
  let { contentTypeIds } = await instance.ask([{name: 'contentTypeIds', required: true, description: 'Enter contentType Ids seperated by commas'}]), 
    workbook = XLSX.utils.book_new()
  const createSheet = async (contentTypeID) => {
    const contentTypeObj = await contentType.get(contentTypeID)
    if(!contentTypeObj.contentTypeElements) {
      console.log(`No content elements for contentTypeID ${contentTypeID}`)
      return null
    }
    const wscols = []
    const row = getRow(contentTypeObj)
    let worksheet = XLSX.utils.json_to_sheet(row)
    await setRequiredStyles(worksheet, contentTypeObj.contentTypeElements)
    Object.keys(row[0]).forEach(key => wscols.push({wch: key.length * 1.28}))
    worksheet['!cols'] = wscols
    XLSX.utils.book_append_sheet(workbook, worksheet, contentTypeObj.name.length >= 31 ? contentTypeObj.name.substring(0, 30) : contentTypeObj.name)
    console.log(`Added ${contentTypeObj.name} to the current workbook!`)
  }

  try {
    contentTypeIds = contentTypeIds.split(',').map(item => item.trim())
    for (let id of contentTypeIds) { await createSheet(id) }
    await XLSX.writeFile(workbook, 'book.xlsx')
  } catch(e) {
    console.error(e.stack || e)
  } 
 
  function getRow(contentTypeObject) {
    const dict = {}, headers = getHeaders(contentTypeObject)
    headers.forEach(header => dict[header] = '')
    dict['contentTypeID'] = contentTypeObject.id
    return [dict]
  }

  function getHeaders(contentTypeObject) {
    const addMaxChar = (str, max) => { return `${str} (max size: ${max})` }
    const elementNames = contentTypeObject.contentTypeElements.map(element => addMaxChar(element.alias || element.name, element.maxSize))
    return ['contentTypeID', ...elementNames]
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
    contentTypeElements.unshift({compulsory: true})
    return Promise.all(contentTypeElements.map(async (element, index) => {
      const col = numberToLetters(index)
      let cell1 = `${col}1`, cell2 = `${col}2`, cell3 = `${col}3`
      worksheet[cell1].s = { alignment: { horizontal: 'center' } }
      worksheet[cell2].s = { alignment: { horizontal: 'left' } }
      await addContext(worksheet, element, cell3)
      if (element.compulsory) {
        worksheet[cell1].s.fill = {
          pattern: 'solid',
          fgColor: { rgb: 'FF6961' }
        }
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
      case 15:
      case 9:
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