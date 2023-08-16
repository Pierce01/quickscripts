import { readFileSync, writeFileSync } from 'fs'
import { csvToJson } from './parseCsv.js'
import { getMedia, filterMedia, markInactive } from './media.js'
import { wait, batch, batcher } from './batcher.js'

const ids = (() => {
  const parsedCSV = new csvToJson(readFileSync('Media Report 20230523.csv', 'utf8'))
  const objKeys = Object.keys(parsedCSV.data[0])
  const keys = { 
    id: objKeys[0], 
    type: objKeys[3],
    usage: objKeys[4]
  }
  const filteredCSV = parsedCSV.data.filter(entry => parseInt(entry[keys.usage]) == 0 && !entry[keys.type].includes('Javascript'))
  return filteredCSV.map(entry => entry[keys.id])
})()

;(async function main() {
  let mediaObjs = await batcher(ids, 20, 10000, getMedia)
  mediaObjs = filterMedia(mediaObjs)
  writeFileSync('./output.json', JSON.stringify(mediaObjs.map(e => e?.id), null, 2))
  // await markInactive(mediaObjs)
})()