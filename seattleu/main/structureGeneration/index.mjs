import { Client } from 't4.ts'
import { readFile, writeFile, stat } from 'fs/promises'
import { resolve } from 'path'
import { args, setAll } from './essentials.mjs'
import prompt from 'prompt'

prompt.start()

// section = 0, mediaCat = 1
let cat = 0

;(async () => {
  while (true) {
    await main()
    await closeQuestion()
  }
})()

async function main() {
  const { token } = await getConfig()
  const { hierarchy, mediaCategory } = await getT4Client(token)
  if (!hierarchy) throw Error('Failed to log into T4...')
  const fileJson = await getStructureFile()
  if (!fileJson.nodeStructure) throw Error('Improper structure json was given...')
  const { children } = fileJson.nodeStructure
  const parentId = await getParentID()

  const recursiveCreation = async (parent, children) => {
    const parentSection = cat ? await mediaCategory.get(parent) : await hierarchy.get(parent)
    if (parentSection && parentSection.id) {
      await Promise.all(children.map(async child => {
        const options = child.text['data-options'] ? JSON.parse(child.text['data-options']) : undefined
        const newSection = cat ? await mediaCategory.add(parentSection.id, { name: child.text.name, ...options }) : 
          await hierarchy.add(parentSection.id, { name: child.text.name, ...options })
        if (newSection) {
          console.log(`Created section ${child.text.name} and added to parent ${parentSection.id}`)
          await recursiveCreation(newSection.id, child.children)
        }
      }))
    }
  }
  await recursiveCreation(parentId, children)
}

async function getParentID() {
  const { parentId, isMediaCategory } = await prompt.get({ 
    properties: { 
      parentId: { 
        required: true, description: 'Enter the section ID (not URL) you\'d like to generate the structure under' 
      },
      isMediaCategory: { 
        required: true, description: 'Is this for a media category hierarchy, or section hierarchy? type 1 or media, 0 for section' 
      }
  }})
  if (parseInt(isMediaCategory)) cat = 1
  return parentId
}

async function getStructureFile() {
  let { path } = await prompt.get({
    properties: {
      path: {
        required: true, 
        description: 'Enter path to structure json file path. Path can be relative'
      }
    }
  })
  path = resolve(path)
  console.log(`Structure JSON path set to ${path}\n`)
  return JSON.parse(await readFile(path, 'utf-8'))
}

async function getConfig() {
  if (!await exists('./config.json')) return await newConfig()
  const { token } = JSON.parse(await readFile('./config.json'))
  if (!token) return await newConfig()
  return { token }
}

async function newConfig() {
  console.log('Config file not found or missing keys. Please follow the prompts below')
  const { token } = await prompt.get({
    properties: {
      token: {
        required: true, 
        description: 'Enter TerminalFour API key'
      }
    }
  })
  try {
    await writeFile('./config.json', JSON.stringify({ token }, null, 2))
  } catch (e) {
    console.log(`Failed to write key to config.json due to:\n\n${e.cause}`)
    console.log('Key will only be kept during this session...')
  }
  return { token }
}

async function getT4Client(token) {
  const client = new Client('https://cms.seattleu.edu/terminalfour/rs', token)
  const user  = await client.profile.get()
  console.clear()
  if (user.firstName == undefined) {
    setAll(client, null)
  } else {
    console.log(`Hello, ${user.firstName}! You've successfully logged into T4!`) 
  }
  return client
}

async function exists(path) {
  try {
    await stat(resolve(path))
    return true
  } catch(e) {
    return false
  }
}

async function closeQuestion() {
  const {closeID} = await prompt.get({properties: {
    closeID: {
      required: true,
      description: 'If you\'re finished, type 1. If not, type 0'
    }
  }})
  if (parseInt(closeID)) return process.exit(1)
  return null
}