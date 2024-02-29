import prompt from 'prompt'
import sharp from 'sharp'
import { Client, batcher } from 't4.ts'
import { resolve } from 'path'
import { readFile, writeFile, stat, readdir, mkdir } from 'fs/promises'

prompt.start()

while (true) {
  await main()
  await closeQuestion()
}

async function main() {
  const defaultDir = './images'
  const { token, altToken } = await getConfig()
  const { media } = await getT4Client(token)
  const isAltAuth = await checkAltTextAIAuth(altToken)
  if (!isAltAuth || !media) {
    console.log('Failed to login. Check access tokens in config.json or delete the file to start over.')
    await closeQuestion()
  }

  if (!await exists(defaultDir)) {
    await mkdir(resolve(defaultDir))
    await populateImages()
  }

  const handleImage = async (fileName) => {
    const fullPath = resolve(`${defaultDir}/${fileName}`)
    const originalBuffer = await readFile(fullPath)
    const buffer64 = Buffer.from(await sharp(originalBuffer).resize(200).toBuffer()).toString('base64')
    return { buffer64, fileName, fullPath }
  }

  const uploadToAltText = async ({ buffer64, fileName }) => {
    console.log(`Getting alt text for ${fileName}...`)
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
  
  let fileNames = await readdir(defaultDir)
  if (fileNames.length == 0) {
    while(!fileNames.length) {
      await populateImages()
      fileNames = await readdir(defaultDir)
    }
  }
  console.log(`The following images will be uploaded to AltText.ai:\n${fileNames.join('\n')}\n`)
  const filePaths = await Promise.all((await readdir(defaultDir)).map(async fileName => await handleImage(fileName)))
  const { categoryID } = await prompt.get({ 
    properties: { 
      categoryID: { 
        required: true, 
        description: 'Enter the media category ID (not URL) you\'d like to upload these images to' 
      }
    }
  })
  
  console.log(`Starting...`)
  const batcherResult = await batcher(filePaths, 3, 1000, uploadToAltText)
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
      console.log(mediaID)
      console.log(`${mediaID} - Uploaded ${file.fileName}`)
    } catch(e) {
      console.log(`Failed to upload ${file.fileName}\n`, e)
    }
  }
}

async function getT4Client(token) {
  const client = new Client('https://cms.seattleu.edu/terminalfour/rs', token)
  const user  = await client.profile.get()
  if (user.firstName == undefined) return { media: null }
  console.log(`Hello, ${user.firstName}! You've successfully logged into T4!`)
  return client
}

async function getConfig() {
  if (!await exists('./config.json')) return await newConfig()
  const { token, altToken } = JSON.parse(await readFile('./config.json'))
  if (!token || !altToken) return await newConfig()
  return { token, altToken }
}

async function newConfig() {
  console.log('Config file not found or missing keys. Please follow the prompts below.')
  const { token, altToken } = await prompt.get({
    properties: {
      token: {
        required: true, 
        description: 'Enter TerminalFour API key'
      },
      altToken: {
        required: true,
        description: 'Enter AltText.ai API key'
      }
    }
  })
  try {
    await writeFile('./config.json', JSON.stringify({ token, altToken }, null, 2))
  } catch (e) {
    console.log(`Failed to write keys to config.json due to:\n\n${e.stack}`)
    console.log('Keys will only be kept during this session...')
  }
  return { token, altToken }
}

async function exists(path) {
  try {
    await stat(resolve(path))
    return true
  } catch(e) {
    return false
  }
}

async function populateImages() {
  return await prompt.get({
    properties: {
      placed: {
        required: true,
        description: 'Place images you want to upload into the images folder. Type "done" once you\'re finished'
      }
    }
  })
}

async function checkAltTextAIAuth(altToken) {
  const response = await fetch('https://alttext.ai/api/v1/account', {
    method: 'GET',
    headers: {
      'X-API-Key': altToken,
    }
  })
  try {
    const responseJson = await response.json()
    if (responseJson.name == undefined) throw Error()
    console.log(`Logged in to AltText.ai as ${responseJson.name}`)
    return true
  } catch (e) {
    console.log(response.statusText, '\nFailed to login to AltText.ai...')
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
  if (parseInt(closeID)) return process.close(1)
  return null
}