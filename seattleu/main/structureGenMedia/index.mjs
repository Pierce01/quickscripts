import { Client } from 't4.ts'
import { readFile } from 'fs/promises'
import { resolve } from 'path'
import { url, token } from './config.js'

const { mediaCategory } = new Client(url, token),
  args = process.argv.splice(2)

const recursiveCreation = async (parent, children) => {
  const parentSection = await mediaCategory.get(parent)
  if (parentSection && parentSection.id) {
    await Promise.all(children.map(async child => {
      const newSection = await mediaCategory.add(parentSection.id, { name: child.text.name })
      if (newSection) {
        console.log(`Created section ${child.text.name} and added to parent ${parentSection.id}`)
        await recursiveCreation(newSection.id, child.children)
      }
    }))
  }
}

const fileJson = JSON.parse(await readFile(resolve(args[1]), 'utf-8'))
const { children } = fileJson.nodeStructure
await recursiveCreation(args[0], children)