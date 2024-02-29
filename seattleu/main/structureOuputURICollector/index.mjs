import { Client, batcher } from '../../../../t4apiwrapper/t4.ts/esm/index.js'
import { url, token } from './config.js'

const { hierarchy } = new Client(url, token)

const sectionStructure = await hierarchy.getSection(23486),
  collection = []

const scan = async ({ id, names, subsections }) => {
  if (subsections) { subsections.map(section => scan(section)) }
  collection.push({ id, name: names.en })
}
scan(sectionStructure)

const addUrl = async (item) => {
  const section = await hierarchy.get(item.id)
  console.log(`Reading ${section.name}...`)
  if (section.outputUrl != '') item.url = section.outputUrl
  return item
}

const batcherResult = await batcher(collection, 20, 1000, addUrl)
console.log(batcherResult)