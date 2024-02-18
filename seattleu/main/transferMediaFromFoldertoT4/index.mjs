import { Client, batcher } from '../../../../t4apiwrapper/t4.ts/esm/index.js'
import { UI, exists } from '../promptUI/UI.mjs'
import { readdir, mkdir } from 'node:fs/promises'
import { resolve } from 'node:path'
import fetch from 'node-fetch'

const rsUrl = 'https://cms.seattleu.edu/terminalfour/rs'

;(async () => {
  while(true) {
    const instance = new UI({ keys: ['t4_token'] })
    await main(instance)
    await instance.closeQuestion()
  }
})()

async function main(instance) {
  const config = await instance.start()
  const { media, profile, isAuthorized } = new Client(rsUrl, config['t4_token'])
  if (!await isAuthorized()) throw Error('Invalid T4 token')
  const { firstName } = await profile.get()
  console.clear()
  console.log(`Hello ${firstName},\n\n`)

  const { categoryID, description } = await instance.ask([{
    name: 'categoryID',
    description: 'Enter media category ID',
    required: true,
  }, {
    name: 'description',
    description: 'Enter the default description for the images',
    required: true,
  }])
  const folderPath = await setupDir(instance)
  await uploadMedia(folderPath, media, categoryID, description)
}

async function setupDir(instance) {
  const folderPath = resolve('./media')
  if (!await exists(folderPath)) {
    console.log('No directory named "media" found in current directory... Creating')
    await mkdir(folderPath)
    await instance.ask([{
      name: 'confirmDir',
      description: 'Place media in the "media" folder. Press enter when you\'re ready',
      required: false,
    }])
  }
  return folderPath
}

async function uploadMedia(folderPath, media, categoryID, description) {
  const fileNames = await readdir(folderPath)
  await batcher(fileNames, 10, 1000, async (fileName) => {
    try {
      const _split = fileName.split('.')
      const type = getType(_split[_split.length - 1].toLocaleLowerCase())
      const imageID = await media.add({
        file: `${folderPath}/${fileName}`,
        categoryID,
        fileName,
        name: fileName,
        type,
        description
      })
      console.log(`${imageID} - ${fileName}`)
    } catch (error) {
      console.log(`Failed to upload ${fileName} due to`, error)
    }
  })
}

function getType(extention) {
  const imageTypes = ['gif', 'jpg', 'jpeg', 'jfif', 'webp', 'png']
  if (imageTypes.includes(extention.toLocaleLowerCase())) return 1
  return 3
}
