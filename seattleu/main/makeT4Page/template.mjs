import { Client } from '../../../../t4apiwrapper/t4.ts/esm/index.js'
import { url, token } from './config.js'
import XLSX from 'xlsx-js-style'

const { contentType } = new Client(url, token)
const contentTypeIds = process.argv.splice(2), workbook = XLSX.utils.book_new()
const createSheet = async (contentTypeID) => {
  const contentTypeObj = await contentType.get(contentTypeID)
  if(!contentTypeObj.contentTypeElements) {
    console.log(`No content elements for contentTypeID ${contentTypeID}`)
    return null
  }
  const wscols = []
  const row = getRow(contentTypeObj)
  let worksheet = XLSX.utils.json_to_sheet(row)
  setRequiredStyles(worksheet, contentTypeObj.contentTypeElements)
  Object.keys(row[0]).forEach(key => wscols.push({wch: key.length * 1.28}))
  worksheet['!cols'] = wscols
  XLSX.utils.book_append_sheet(workbook, worksheet, contentTypeObj.name)
  console.log(`Added ${contentTypeObj.name} to the current workbook!`)
}

for (let id of contentTypeIds) { await createSheet(id) }
await XLSX.writeFile(workbook, 'book.xlsx')

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

function setRequiredStyles(worksheet, contentTypeElements) {
  contentTypeElements.unshift({compulsory: true})
  contentTypeElements.forEach((element, index) => {
    let cell1 = `${numberToLetters(index)}1`, cell2 = `${numberToLetters(index)}2`
    worksheet[cell1].s = { alignment: { horizontal: 'center' } }
    worksheet[cell2].s = { alignment: { horizontal: 'left' } }
    if (element.compulsory) {
      worksheet[cell1].s.fill = {
        pattern: 'solid',
        fgColor: { rgb: 'FF6961' }
      }
    }
  })
}