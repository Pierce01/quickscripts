import { Client } from '../../../../t4apiwrapper/t4.ts/esm/index.js'
import XLSX from 'xlsx-js-style'
import { url, token } from './config.js'

const { content } = new Client(url, token)
const workbook = XLSX.readFile('./Bios We Need.xlsx'), outputWb = XLSX.utils.book_new()

const ids = []
for (let sheet of workbook.SheetNames) {
  const entries = XLSX.utils.sheet_to_json(workbook.Sheets[sheet])
  entries.forEach(entry => { ids.push(entry['ID']) })
}
const header = (await content.getWithoutSection(ids[0], 'en')).contentType.contentTypeElements.map(element => element.name), 
  newSheet = []

for (let id of ids) {
  try {
    const elements = (await content.getWithoutSection(id, 'en')).elements, newElements = {}
    Object.keys(elements).map(key => {
      const newName = key.split('#')[0]
      newElements[newName] = elements[key]
    })
    newSheet.push(newElements)
    console.log(`Added ${newElements['Name of Faculty or Staff Member']} to the sheet.`)
  } catch (e) {
    console.log(`Failed to add ${id} to the sheet.`)
  }
}

const ws = XLSX.utils.json_to_sheet(newSheet, { header })
XLSX.utils.book_append_sheet(outputWb, ws, 'Data')
XLSX.writeFile(outputWb, 'book.xlsx')