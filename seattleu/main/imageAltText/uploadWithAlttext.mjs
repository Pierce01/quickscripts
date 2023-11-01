import { altToken, token, url } from './config.js'
import { readFile, readdir } from 'fs/promises'
import { batcher, Client } from 't4.ts'
import { resolve } from 'path'
import sharp from 'sharp'

const { media } = new Client(url, token)
const categoryID = process.argv.splice(2)[0],
  dir = './images',
  filePaths = await Promise.all((await readdir(dir)).map(async fileName => await handleImage(fileName))),
  batcherResult = await batcher(filePaths, 3, 1000, upload)

for (let filePos in filePaths) {
  const file = filePaths[filePos], 
    altTextAiObj = batcherResult[filePos]
  try {
    const mediaID = await media.add({
      file: file.fullPath,
      description: altTextAiObj['alt_text'],
      categoryID,
      type: 1,
      name: file.fileName,
      language: 'en'
    })
    console.log(`${mediaID} - Uploaded ${file.fileName}`)
  } catch(e) {
    console.log(`Failed to upload ${file.fileName}\n`, e)
  }
}

async function handleImage(fileName) {
  const fullPath = resolve(`${dir}/${fileName}`)
  const originalBuffer = await readFile(fullPath)
  const buffer64 = Buffer.from(await sharp(originalBuffer).resize(200).toBuffer()).toString('base64')
  return { buffer64, fileName, originalBuffer, fullPath }
}

async function upload({ buffer64, fileName }) {
  const response = await fetch('https://alttext.ai/api/v1/images', {
    method: 'POST',
    headers: {
      'X-API-Key': altToken,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      image: {
        raw: buffer64
      }
    })
  })
  try {
    return await response.json()
  } catch (e) {
    console.log(response.statusText, `\nFailed to upload ${fileName}`)
  }
}