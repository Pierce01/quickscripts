import { readFileSync } from 'fs'
import { csvToJson } from './parseCsv.js'
import { getMedia, filterMedia, markInactive } from './media.js' 

const _ids = (() => {
  const parsedCSV = new csvToJson(readFileSync('Media Report 20230523.csv', 'utf8'))
  const objKeys = Object.keys(parsedCSV.data[0])
  const keys = { 
    id: objKeys[0], 
    type: objKeys[3],
    usage: objKeys[4]
  }
  const filteredCSV = parsedCSV.data.filter(entry => parseInt(entry[keys.usage]) == 0 && !entry[keys.type].includes('Javascript'))
  return filteredCSV.map(entry => entry[keys.id])
})

const ids = ['5927473', '5718398', '5712987', '5712986', '5712985', '4343963', '4343949'];
(async function main() {
  let mediaObjs = await Promise.all(ids.map(async id => await getMedia(id)))
  mediaObjs = await filterMedia(mediaObjs)
  console.log(mediaObjs.map(obj => obj.id))
  // await markInactive(mediaObjs)
})()

// getMedia(6429627).then(async e => {
//   await markInactive([e])
// })




// console.log(ids)