import { UI } from '../promptUI/UI.mjs'
import { Client } from '../../../../t4apiwrapper/t4.ts/esm/index.js'
import XLSX from 'xlsx-js-style'
import { stat } from 'fs/promises'
import { resolve } from 'node:path'

const rsUrl = 'https://cms.seattleu.edu/terminalfour/rs'

;(async () => {
  while(true) {
    const instance = new UI()
    await main(instance)
    await instance.closeQuestion()
  }
})()

async function main(instance) {
  const config = await instance.start()
  const { isAuthorized, list, profile } = new Client(rsUrl, config['t4_token'])

  if (!await isAuthorized()) {
    console.log('Failed to login to t4...')
    return null
  }
  console.clear()
  const { firstName } = await profile.get()
  console.log(`Hello ${firstName}!\n\nDownload List Option: 0\nModify List with downloaded XSLX: 1`)

  const { menuOption } = await instance.ask([{
    name: 'menuOption',
    description: 'Select menu option',
    required: true
  }])

  switch(parseInt(menuOption)) {
    case 0: 
      await downloadList(list, instance)
      break
    case 1:
      await modifyList(list, instance)
      break
    default:
      console.log('Invalid Option!')
  }
}

async function downloadList(listManager, instance) {
  const { listId } = await instance.ask([{
    name: 'listId', 
    description: 'Eneter List ID you\'d like to download',
    required: true
  }])

  try {
    const cols = []
    const listObj = await listManager.get(listId),
      workbook = XLSX.utils.book_new(),
      worksheet = XLSX.utils.json_to_sheet(listObj.items)
    Object.keys(listObj.items[0]).forEach(key => cols.push({ wch: key.length * 1.28 }))
    worksheet['!cols'] = cols
    XLSX.utils.book_append_sheet(workbook, worksheet, listObj.name.length >= 31 ? listObj.name.substring(0, 30) : listObj.name)
    await XLSX.writeFile(workbook, `list-${listId}.xlsx`)
    console.log(`Finished writing items to list-${listId}.xlsx`)
  } catch (error) {
    console.log('Failed to write items to xlsx file due to ', error.stack)
  }
}

async function modifyList(listManager, instance) {
  let { xlsxPath } = await instance.ask([{
    name: 'xlsxPath', 
    description: 'Eneter xlsx file path',
    required: true
  }])

  xlsxPath = resolve(xlsxPath)
  if (!await stat(xlsxPath)) {
    console.log('Could not find file at location ' + xlsxPath)
    return null
  }

  const workbook = XLSX.readFile(xlsxPath),
    sheetName = workbook.SheetNames[0],
    data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName])
  if (!data[0].listId) {
    console.log('First row does not contain a listId. Canceling...')
    return null
  }
  console.log(`Modifying ${sheetName} - ${data[0].listId}`)
  try {
    const listObj = await listManager.get(data[0].listId)
    listObj.items = data
    const modifiedList = await listManager.modify(listObj)
    console.log('Modified items:\n', modifiedList.items)
  } catch(error) {
    console.log('Failed to modify list due to ', error)
  }
}