import { Client } from 't4.ts'
import { token, url } from './config.js'
import { csvToJson } from './parseCsv.js'
import * as fs from 'node:fs'

const statusCode = '404', cache = [], URL = 'https://www.seattleu.edu/'
const csv = new csvToJson(fs.readFileSync('./redirects-v3.csv', 'utf8'))
csv.data = csv.data.filter(request => request['Status'] == statusCode).map(redirect => clean(redirect['Name'].replace(URL, '')))

const { hierarchy, content } = new Client(url, token)
const parentID = 26199
const { subsections, name, id, hasChildren } = (await hierarchy.getSection(parentID))[0]

if (!hasChildren) throw Error(`Parent section (${name} / ${id}) has 0 children, closing.`)
const traverseSubsection = async (subsections) => {
  if (!subsections) return
  for (let section of subsections) {
    if (section.status != 0) continue
    const name = section.name
    cache.push({ name: clean(name), id: section.id }) 
    if (section.hasChildren) traverseSubsection(section.subsections)
  }
}
await traverseSubsection(subsections)

const toDelete = cache.filter(c => csv.data.some(section => c.name == section))
for (let redirect of toDelete) {
  const sectionContent = await hierarchy.getContents(redirect.id)
  await Promise.all(sectionContent.contents.map(async _content => {
    const req = await content.delete(sectionContent.id, _content.id)
    console.log(`${sectionContent.id}/${_content.id} ${req ? 'marked' : 'failed'}`)
  }))
  const hReq = await hierarchy.delete(redirect.id)
  console.log(`${redirect.id} ${hReq ? 'marked' : 'failed'}`)
}

function clean(str) {
  if (str.startsWith('/')) str = str.slice(1)
  if (str.endsWith('/')) str = str.slice(0, -1)
  if (str.includes(',')) str = str.replace(',', '%2C')
  if (str.includes('%')) str = str.replace('%', '-')
  return str
}