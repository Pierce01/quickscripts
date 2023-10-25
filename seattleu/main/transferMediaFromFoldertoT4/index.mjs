import { Client } from 't4.ts'
import { url, token } from './config.js'
import * as fs from 'node:fs'
import * as _url from 'url'

const { media } = new Client(url, token)

const categoryID = 206485,
  folder = './files',
  description = 'Housing and Dining'

const fileNames = fs.readdirSync(folder), 
  root = _url.fileURLToPath(new URL(folder, import.meta.url)),
  failedMedia = []

await Promise.all(fileNames.map(async fileName => {
  const _split = fileName.split('.')
  const type = getType(_split[_split.length - 1].toLocaleLowerCase())
  const addObj = {
    file: `${root}/${fileName}`,
    categoryID,
    fileName,
    name: fileName,
    type,
    description
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
    console.log(`${imageID} - ${file.name}`)
  } catch (error) {
    console.log(error)
  }
}

function getType(extention) {
  const imageTypes = ['gif', 'jpg', 'jpeg', 'jfif', 'webp', 'png']
  if (imageTypes.includes(extention.toLocaleLowerCase())) return 1
  return 3
}
