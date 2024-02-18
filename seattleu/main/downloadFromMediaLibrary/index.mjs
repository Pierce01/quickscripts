import { UI, exists } from '../promptUI/UI.mjs'
import { Client, batcher } from '../../../../t4apiwrapper/t4.ts/esm/index.js'
import { writeFile, mkdir, rm } from 'fs/promises'
import { resolve } from 'path'
import { zip } from 'zip-a-folder'
import fetch from 'node-fetch'

const rsUrl = 'https://cms.seattleu.edu/terminalfour/rs'

;(async () => {
  while(true) {
    const instance = new UI()
    await main(instance)
    await instance.closeQuestion()
  }
})()

async function main(instance) {
  const config = await instance.start()
  const { isAuthorized, profile, mediaCategory, media } = new Client(rsUrl, config['t4_token'], 'en', fetch)
  if (!await isAuthorized()) {
    console.log('Failed to login to t4...')
    return null
  }
  console.clear()

  const { firstName } = await profile.get()
  console.log(`Hello ${firstName},\n\nPlease enter the ID of the media category you'd like to download:`)
  const { mediaCategoryId } = await instance.ask([{
    name: 'mediaCategoryId', description: 'Enter media category ID, not name', required: true
  }])

  const collectionObjs = []
  const parseChildren = (path, children) => {
    children.forEach(child => {
      const { id, name, children } = child
      if (child.children.length > 0) parseChildren(`${path}/${name}/`, children)
      collectionObjs.push({ id, name, path })
    })
  }

  try {
    const children = (await mediaCategory.list(mediaCategoryId, 'en'))[0].children
    parseChildren('./output/', children)
    await Promise.all(collectionObjs.map(async obj => {
      try {
        await mkdir(resolve(`${obj.path}/${obj.name}`))
      } catch (e) {}
    }))
  } catch(error) {
    console.log('Failed to get category children due to ', error)
  }

  for (let collectionObj of collectionObjs) {
    const mediaRows = (await media.list(collectionObj.id)).mediaRows
    await batcher(mediaRows, 10, 1000, async(row) => {
      try {
        await downloadMedia(media, row, resolve(`${collectionObj.path}/${collectionObj.name}`))
        console.log(`Downloaded ${row.name} to ${collectionObj.name}`)
      } catch(e) {
        console.log(`Failed to download ${row.name} to ${collectionObj.name} due to `, e)
      }
    })
  }

  console.log('Creating Zip file...')
  await zip(resolve('./output'), resolve(`./${mediaCategoryId}.zip`))
  console.log('Deleting output folder...')
  await rm(resolve('./output'), { recursive: true, force: true })
  console.log('Finished!')
}

async function downloadMedia(media, mediaObj, folder) {
  const buffer = await media.downloadSingle(mediaObj.id, 'media')
  if (!await exists(folder)) await mkdir(folder, { recursive: true })
  await writeFile(`${folder}/${mediaObj.fileName}`, Buffer.from(buffer))
}