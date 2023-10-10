import { xml2json, js2xml } from 'xml-js'
import { writeFile, readFile } from 'fs/promises'

const xmlStr = await readFile('./FacultyStaffDirectory.xml', { encoding: 'utf-8' })
const jsonObj = JSON.parse(xml2json(xmlStr, { compact: true, spaces: 2 }))

jsonObj['Employees'].element.map(employee => {
  employee['FullName'] = { _text: getFullname(employee) }
  employee['User_Id'] = { _text: employee['Email']._text.split('@')[0] }
})

await writeFile('./output.xml', js2xml(jsonObj, {compact: true, ignoreComment: true, spaces: 4}))

function getFullname(employee) {
  const first = employee.Fname?._text, last = employee.LName?._text
  return `${first ? first : ''}${first ? ' ' : ''}${last}`
}
