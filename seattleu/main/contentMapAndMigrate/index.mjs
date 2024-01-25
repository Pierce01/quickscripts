import { UI, exists } from '../promptUI/UI.mjs'
import { Client, batcher } from '../../../../t4apiwrapper/t4.ts/esm/index.js'
import { writeFile, readFile } from 'fs/promises'
import { resolve } from 'path'

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
  const { isAuthorized, profile, contentType, hierarchy, content } = new Client(rsUrl, config['t4_token'])
  if (!await isAuthorized()) {
    console.log('Failed to login to t4...')
    return null
  }
  console.clear()

  const { firstName } = await profile.get()
  console.log(`Hello ${firstName},\n\n` + 'Menu:\n' +
  'Generate JSON file migration format for two content types: 0\n' +
  'Migrate content using migration JSON: 1')

  const { option } = await instance.ask([{
    name: 'option',
    description: 'select a menu option',
    required: true
  }]) 

  switch(parseInt(option)) {
    case 0: 
      await generateMigrationJson(instance, contentType)
      break
    case 1:
      await migrateWithJson(instance, hierarchy, content, contentType)
      break
    default:
      console.log('Invalid option')
  }
}

async function migrateWithJson(instance, hierarchy, content, contentType) {
  let { inputFilePath } = await instance.ask([{
    name: 'inputFilePath', description: 'Path to migration JSON file', required: true
  }])
  inputFilePath = resolve(inputFilePath)
  if (!exists(inputFilePath)) {
    console.log('Failed to open ' + inputFilePath)
    return null
  }
  const inputJson = JSON.parse(await readFile(inputFilePath))
  delete inputJson.Avalabile_Elements_For_Target_Content_Type
  console.log(inputJson)
  let { isCorrect } = await instance.ask([{
    name: 'isCorrect', description: 'Does this look correct? No = 0, Yes = 1', required: true
  }])
  if (parseInt(isCorrect) !== 1) {
    console.log('Recieved input ' + isCorrect + '. Not 1, ending...')
    return null
  }

  const sourceContentTypeObj = await contentType.get(inputJson.sourceContentTypeId)
  const targetContentTypeObj = await contentType.get(inputJson.targetContentTypeId)
  if (!targetContentTypeObj) {
    console.log(`ContentType with ID ${inputJson.targetContentTypeId} does not exist. Ending...`)
    return null
  }

  const isValidMap = checkKeys(inputJson.sourceElements, targetContentTypeObj.contentTypeElements, content)
  if (!isValidMap) {
    console.log(`This map file contains invalid element names for ${inputJson.targetContentTypeId}. Ending...`)
    return null
  }

  const completed = [], failed = []
  const sourceElementPairs = content.util.getElementNames(sourceContentTypeObj.contentTypeElements, false)
  const targetElementPairs = content.util.getElementNames(targetContentTypeObj.contentTypeElements, false)
  const sourceSectionContents = (await getContentEntries(inputJson.sourceSectionId, hierarchy, content))
    .filter(entry => entry.contentType.id == parseInt(inputJson.sourceContentTypeId))
  await batcher(sourceSectionContents, 10, 1000, async (contentEntry) => {
    const sourceArray = Object.keys(inputJson.sourceElements).map(element => [element, inputJson.sourceElements[element]]),
      sourceElementValues = contentEntry.elements,
      finalObj = {}
    sourceArray.forEach(entry => {
      const key = entry[0],
        value = entry[1],
        targetField = targetElementPairs[value],
        sourceField = sourceElementPairs[key]
      finalObj[targetField] = sourceElementValues[sourceField]
    })
    try {
      console.log(`Migrating content from content item ${contentEntry.id}`)
      const newContent = await content.create(inputJson.targetSectionId, {
        elements: finalObj,
        contentTypeID: targetContentTypeObj.id,
        language: 'en',
        status: 0
      }, true)
      console.log(`Created content item with ID ${newContent.id}. (${contentEntry.id} -> ${newContent.id})`)
      completed.push(newContent)
    } catch(error) {
      console.log(`Failed to migrate ${contentEntry.id}`)
      failed.push(contentEntry.id)
    }
  })
  await writeFile(`completed ${sourceContentTypeObj.id} to ${targetContentTypeObj.id}.json`, JSON.stringify(completed, null, 2))
  await writeFile(`failed ${sourceContentTypeObj.id} to ${targetContentTypeObj.id}.json`, JSON.stringify(failed, null, 2))
}

function checkKeys(sourceElements, targetElements, content) {
  const sourceValues = Object.values(sourceElements)
  const targetKeys = Object.keys(content.util.getElementNames(targetElements, false))
  return !sourceValues.some(val => targetKeys.indexOf(val) == -1)
}

async function getContentEntries(id, hierarchy, content) {
  const contentList = (await hierarchy.getContents(id)).contents
  const conentIdList = contentList.map(contentObj => contentObj.id)
  return await batcher(conentIdList, 100, 1000, async (contentId) => {
    try {
      return await content.get(contentId, id)
    } catch (error) {
      console.log(`Failed to resolve content ${contentId} due to, `, error)
      return null
    }
  })
}

async function generateMigrationJson(instance, contentType) {
  const { targetSectionId, targetContentTypeId, sourceSectionId, sourceContentTypeId } = await instance.ask([
    {name: 'targetSectionId', description: 'Section ID of the target section you\'d like to migrate to (target)', required: true},
    {name: 'targetContentTypeId', description: 'Content Type ID of the content type you\'d like to migrate into (target)', required: true},
    {name: 'sourceSectionId', description: 'Section ID of the source section you\'d like to migrate from (source)', required: true},
    {name: 'sourceContentTypeId', description: 'Content Type ID of the content type you\'d like to migrate from (source)', required: true},
  ])
  const sourceElements = await getSelectedElements(contentType, sourceContentTypeId, instance)
  const Avalabile_Elements_For_Target_Content_Type = (await contentType.get(targetContentTypeId)).contentTypeElements.map(element => element.name)
  try {
    const fileName = `./${sourceContentTypeId} to ${targetContentTypeId} migration.json`
    await writeFile(fileName, JSON.stringify({
      targetSectionId, 
      targetContentTypeId, 
      sourceSectionId, 
      sourceContentTypeId,
      sourceElements,
      Avalabile_Elements_For_Target_Content_Type
    }, null, 4))
    console.log(`Successfully wrote input to ${fileName}`)
  } catch (error) {
    console.log('Failed to create config file due to ', error)
  }
}

async function getSelectedElements(contentType, sourceContentTypeId, instance) {
  const ct = await contentType.get(sourceContentTypeId), 
    ctElements = ct.contentTypeElements, 
    ctElementsDisplay = ct.contentTypeElements.map((element, id) => `${id}: ${element.name}`)
  const { sourceElementNumbers } = await instance.ask([{
    name: 'sourceElementNumbers',
    description: 'Please enter the element number you\'d like to migrate (seperated by a comma)',
    required: true,
    cb: () => {
      console.log(`Avalabile elements:\n${ctElementsDisplay.join(',\n')}`)
    }
  }])
  const sourceElements = {}
  sourceElementNumbers.split(',').map(e => parseInt(e)).map(elementNum => ctElements[elementNum].name).forEach(name => {
    sourceElements[name] = ''
  })
  return sourceElements
}


