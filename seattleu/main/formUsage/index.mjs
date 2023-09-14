import { token, url } from  './config.js'
import { Client } from 't4.ts'
import * as fs from 'node:fs'

const { formBuilder, hierarchy } = new Client(url, token)
const forms = (await formBuilder.list()).data

const status = ['Active', 'Pending', 'Inactive']
let csv = ['"Form Name"', '"Form ID"', '"Usage"', '"Section Name"', '"Section ID"'].join(',')
await Promise.all(forms.map(async form => {
  const { name, id, usage } = form
  const sectionIds = usage.map(entry => entry.sectionId)
  const row = [wrap(name), id, usage.length]
  let names
  try {
    names = await Promise.all(sectionIds.map(async section => await getSection(section, true))).join(',')
  } catch (error) {
    names = await slowCollection(sectionIds)
  }
  row.push(wrap(names), wrap(sectionIds))
  csv += `\n${row.join(',')}`
}))
fs.writeFileSync('output.csv', csv)

function wrap(str) {
  return `"${str}"`
}

async function getSection(id, retry) {
  try {
    const section = await hierarchy.get(id, 'en')
    return `${section.name} (${status[section.status]})`
  } catch(error) {
    if (retry) return getSection(id, false)
  }
  return 'Failed'
} 

async function slowCollection(sectionIds) {
  const names = []
  for (let id of sectionIds) {
    try {
      const req = await getSection(id, true)
      names.push(req)
    } catch(e) {
      names.push('Failed to resolve (script issue)')
    }
  }
  return names.join(',')
} 