import { Client } from 't4.ts'
import { url, token } from './config.js'
import * as fs from 'node:fs'
import * as _url from 'url'

const { media } = new Client(url, token)

const categoryID = 198818
const fileNames = fs.readdirSync('./profiles')
const root = _url.fileURLToPath(new URL('./profiles', import.meta.url))
const failedMedia = []

await Promise.all(fileNames.map(async fileName => {
  const _split = fileName.split('.')
  let type = _split[_split.length - 1].toLocaleLowerCase()
  type = (type.includes('j') || type.includes('w') || type.includes('n') || type.includes('g')) ? 1 : 3
  const addObj = {
    file: `${root}/${fileName}`,
    categoryID,
    fileName,
    name: fileName,
    type,
    description: 'None provided'
  }
  try {
    const imageID = await media.add(addObj)
    console.log(`${imageID} - ${fileName}`)
  } catch (error) {
    console.log(error)
    failedMedia.push(addObj)
  }
}))

for (let file of failedMedia) {
  try {
    const imageID = await media.add(file)
    console.log(imageID)
  } catch (error) {
    console.log(error)
  }
}
