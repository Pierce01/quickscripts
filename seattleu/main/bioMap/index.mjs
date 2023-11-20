import { Client } from 't4.ts'
import { UI, exists } from '../promptUI/UI.mjs'
import { readFile } from 'fs/promises'
import { resolve } from 'path'

const rsUrl = 'https://cms.seattleu.edu/terminalfour/rs',
  mapFilePath = './elementMap.json' 

;(async () => {
  while(true) {
    const instance = new UI({ keys: ['t4_token', 'contentTypeID'] })
    await main(instance)
    await instance.closeQuestion()
  }
})()

async function main(instance) {
  const config = await instance.start()
  const { isAuthorized, content, contentType, hierarchy } = new Client(rsUrl, config['t4_token'])
  if (!await isAuthorized()) {
    console.error('Failed to login to t4...')
    return 0
  }
  console.clear()
  if (!await exists(mapFilePath)) {
    console.log('elementMap.json not found')
    return 0
  }

  const mapFile = JSON.parse(await readFile(resolve(mapFilePath), { encoding: 'utf-8' })),
    { sourceSectionId } = await instance.ask([{ name: 'sourceSectionId', required: true, description: 'Enter section ID'} ])
  
  const contents = (await hierarchy.getContents(sourceSectionId)).contents,
    contentTypeObj = await contentType.get(config['contentTypeID'])
  if (!contents.length) throw Error('No content found')
  console.log('Syncing content item with MapFile:', mapFile)

  for (let { id } of contents) {
    const { elements, contentTypeID } = await content.get(id, sourceSectionId),
      sourceObjKeys = Object.keys(mapFile),
      finalObj = {},
      elementNames = content.util.getElementNames(contentTypeObj.contentTypeElements)
    if (contentTypeObj.id !== contentTypeID) continue
    let modified = false
    sourceObjKeys.map(key => {
      const mapKeyFormatted = elementNames[key], keyFormatted = elementNames[mapFile[key]]
      if (!elements[mapKeyFormatted] || elements[mapKeyFormatted] == '' || elements[keyFormatted] !== '') return 
      finalObj[keyFormatted] = elements[mapKeyFormatted]
      modified = true
    })
    if (modified) console.log(await content.modify(id, sourceSectionId, { elements: { ...finalObj }}))
  }
}