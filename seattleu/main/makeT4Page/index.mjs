import { Client, Types } from '../../../../t4apiwrapper/t4.ts/esm/index.js'
import { url, token } from './config.js'
import XLSX from 'xlsx-js-style'

const { contentType, content, list, serverSideLink } = new Client(url, token)

const setionIdInput = process.argv.splice(2)[0]
const regex = /\(max size: \d+\)/, listObjs = {}
const workbook = XLSX.readFile('./book.xlsx')
for (let sheet of workbook.SheetNames) {
  const sheetObj = XLSX.utils.sheet_to_json(workbook.Sheets[sheet])[0],
    cleanSheet = {},
    ct = await contentType.get(sheetObj.contentTypeID),
    formattedElements = content.util.getElementNames(ct.contentTypeElements)
  Object.keys(sheetObj).map(sheetName => {
    const trimmedName = sheetName.replace(regex, '').trim()
    cleanSheet[formattedElements[trimmedName] || trimmedName] = sheetObj[sheetName]
  })
  delete cleanSheet.contentTypeID
  const parsedElements = await parseElements(cleanSheet, ct)
  if (!parsedElements) {
    console.log(`Failed to parse worksheet: ${sheet}`)
    continue
  }
  try {
    const {name, id} = await content.create(setionIdInput, {
      elements: parsedElements.sheet,
      contentTypeID: ct.id,
      language: 'en',
      status: 0
    }, true)
    console.log(`Created ${name} with ID of ${id}`)
  } catch (e) {
    console.log(`Failed to parse worksheet: ${sheet}\n${e}`)
  }
}

async function parseElements(sheet, ct) {
  let failed = false, newId = -Math.floor(Math.random() * (Types.max - Types.min) + Types.max)
  await Promise.all(Object.keys(sheet).map(async key => {
    if (failed) return
    const [id, type] = (key.split('#')[1].split(':')).map(Number)
    const context = {ct, type, id}
    try {
      switch (type) {
        case 2:
          // media todo
          sheet[key] = sheet[key] == '' ? {existingFile: false} : sheet[key]
          break
        case 9:
        case 6:
          sheet[key] = await parseListValue(sheet[key], context)
          break
        case 14: 
          sheet[key] = await parseServerSideList(sheet[key], newId)
        default:
          break
      }
    } catch(error) {
      console.log(error)
      failed = true
    }
  }))
  return failed ? null : {sheet, id: newId}
}

async function parseListValue(str, {ct, type, id}) {
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

async function parseServerSideList(str, newId) {
  const [sectionId, contentId] = str.split(',').map(str => str.trim()).map(Number)
  if (!sectionId) return ''
  const sslRequest = await serverSideLink.set({
    fromSection: setionIdInput,
    fromContent: newId,
    toContent: contentId || 0,
    language: 'en',
    toSection: sectionId,
    linkText: 'default',
    useDefaultLinkText: true
  })
  if (!Object.keys(sslRequest).length) throw Error(`Failed to set server side link to ${sectionId}`)
  return `<t4 sslink_id='${sslRequest.id}' type='sslink'/>`
}

async function parseImageUpload(fileName) {

}
