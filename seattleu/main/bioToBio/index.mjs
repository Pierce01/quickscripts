import { UI } from '../promptUI/UI.mjs'
import { Client } from '../../../../t4apiwrapper/t4.ts/esm/index.js'

const rsUrl = 'https://cms.seattleu.edu/terminalfour/rs'

;(async () => {
  while(true) {
    const instance = new UI({ keys: ['t4_token', 'contentTypeID'] })
    await main(instance)
    await instance.closeQuestion()
  }
})()

async function main(instance) {
  const config = await instance.start()
  const { hierarchy, isAuthorized, content, contentType } = new Client(rsUrl, config['t4_token'])
  if (!await isAuthorized()) {
    console.error('Failed to login to t4...')
    return 0
  }
  console.clear()
  const ct = await contentType.get(config['contentTypeID']),
    ctElements = ct.contentTypeElements,
    ctElementsDisplay = ct.contentTypeElements.map((element, id) => `${id}: ${element.name}`)
  const { targetSectionID, sourceSectionID, targetElementNumbers } = await instance.ask([
    { name: 'sourceSectionID', description: 'Please enter the source section ID (not URL)', required: true },
    { name: 'targetSectionID', description: 'Please enter the target section ID (not URL)', required: true },
    { name: 'targetElementNumbers', description: 'Please enter the element number you\'d like to mirror (seperated by a comma)', required: true, cb: () => {
      console.log(`Avalabile elements:\n${ctElementsDisplay.join(',\n')}`) 
    }},
  ])

  const targetElements = targetElementNumbers.split(',').map(e => parseInt(e)).map(elementNum => ctElements[elementNum].name),
    targetSectionContents = (await hierarchy.getContents(targetSectionID)).contents,
    sourceSectionContents = (await hierarchy.getContents(sourceSectionID)).contents
  
  for (let { name, id } of sourceSectionContents) {
    const target = targetSectionContents.filter(obj => obj.name == name)[0]
    if (!target) {
      console.log(`Failed to find matching bio for ${name}`)
      continue
    }
    const sourceObj = (await content.get(id, sourceSectionID)).elements,
      sourceObjKeys = Object.keys(sourceObj),
      finalObj = {}
    sourceObjKeys.map(key => {
      if(targetElements.includes(key.split('#')[0])) {
        finalObj[key] = sourceObj[key]
      }
    })
    console.log(await content.modify(target.id, targetSectionID, { elements: { ...finalObj }}))
  }
}

//14,16,10,13,11,20