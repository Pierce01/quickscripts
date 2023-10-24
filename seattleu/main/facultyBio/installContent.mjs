import { Client } from '../../../../t4apiwrapper/t4.ts/esm/index.js'
import XLSX from 'xlsx-js-style'
import { writeFile } from 'fs/promises'
import { url, token } from './config.js'

const sectionId = 205939,
  contentTypeId = 203,
  sheetIndex = 0

const { content, contentType, hierarchy } = new Client(url, token)
const workbook = XLSX.readFile('./Bio Content Fields to Install.xlsx'),
  worksheet = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[sheetIndex]]),
  ct = await contentType.get(contentTypeId),
  contentObjs = await hierarchy.getContents(sectionId)

const newContentObjs = {}, failedLookup = []
contentObjs.contents.forEach(content => { newContentObjs[content.name.toLocaleLowerCase()] = { id: content.id, elements: null } })
worksheet.forEach(item => {
  const name = item['Email Address'].split('@')[0].toLocaleLowerCase()
  if (newContentObjs[name]) {
    newContentObjs[name].elements = parseElements(item)
  } else {
    failedLookup.push(name)
  }
})

const emails = Object.keys(newContentObjs), actuallyFailed = []
for (let email of emails) {
  const { id, elements } = newContentObjs[email]
  if (!elements) continue
  try {
    const modifiedCE = await content.modify(id, sectionId, { elements }, 'en')
    if(modifiedCE.id) {
      console.log(`Updated ${email} - ${modifiedCE.id}`)
    } else {
      actuallyFailed.push(email)
    }
  } catch(error) {
    console.log(error)
    actuallyFailed.push({name: email, error: error.stack})
  }
}

await writeFile('./doesNotExist.json', JSON.stringify(failedLookup, null, 2))
await writeFile('./failed.json', JSON.stringify(actuallyFailed, null, 2))

function parseElements(elements) {
  const formattedElements = content.util.getElementNames(ct.contentTypeElements)
  elements = content.util.lazyMap(elements, formattedElements)
  elements = Object.fromEntries(Object.entries(elements).filter(([_, v]) => v != ''))
  return elements
}
