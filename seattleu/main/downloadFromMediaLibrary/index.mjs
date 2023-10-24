import { Client } from '../../../../t4apiwrapper/t4.ts/esm/index.js'
import { url, token } from './config.js'
import { writeFile, mkdir, stat } from 'fs/promises'
import { resolve } from 'path'

const { mediaCategory, media } = new Client(url, token)

const categoryId = 26432,
  collectionObjs = [],
  catChildren = (await mediaCategory.list(categoryId, 'en'))[0].children

parseMediaCat(catChildren)
await Promise.all(collectionObjs.map(async obj => {
  try {
    await mkdir(resolve(`./output/${obj.name}`))
  } catch (e) {}
}))

for (let collectionObj of collectionObjs) {
  const mediaRows = (await media.list(collectionObj.id)).mediaRows
  for (let row of mediaRows) {
    try {
      await downloadMedia(row, resolve(`./output/${collectionObj.name}`))
      console.log(`Downloaded ${row.name} to ${collectionObj.name}`)
    } catch(e) {
      console.log(`Failed to download ${row.name} to ${collectionObj.name}`, e)
    }
  }
}

async function downloadMedia(mediaObj, folder) {
  const buffer = await media.downloadSingle(mediaObj.id, 'media')
  if (!exists(folder)) await mkdir(folder)
  await writeFile(`${folder}/${mediaObj.fileName}`, Buffer.from(buffer))
}

function parseMediaCat(children) {
  children.forEach(child => {
    const { id, name, children } = child
    if (child.children.length > 0) parseMediaCat(children)
    collectionObjs.push({ id, name })
  })
}

async function exists(path) {
  try {
    await stat(path)
    return true
  } catch (e) {
    return false
  }
}