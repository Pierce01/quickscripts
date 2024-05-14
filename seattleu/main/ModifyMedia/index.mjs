import { Client } from 't4.ts'
import { resolve, basename } from 'path'
import { writeFile, readFile, stat } from 'fs/promises'

async function main() {
  const configPath = resolve('./config.json')
  if (!await exists(configPath)) {
    await writeFile(configPath, JSON.stringify({
      t4_token: '', 
      rsUrl: 'https://cms.seattleu.edu/terminalfour/rs',
      lang: 'en'
    }, null, 2))
    throw Error("Missing config.json. Creating new config, please save your t4 token there.")
  }

  const config = JSON.parse(await readFile(configPath))
  if (!config['t4_token'] || config['t4_token'] == '') throw Error('Missing t4 token in config.json')

  const { rsUrl, t4_token, lang } = config
  const { isAuthorized, media } = new Client(rsUrl, t4_token, lang)

  if (!await isAuthorized()) {
    throw Error("Failed to connect: Invalid token")
  }

  const args = process.argv.slice(2)
  if (!args[0]) throw Error("Missing media ID (command line arg 0)")
  if (!args[1]) throw Error("Missing file path (command line arg 1)")
  const filePath = resolve(args[1]), id = args[0]

  if (!await exists(filePath)) {
    throw Error(`${filePath} does not exist`)
  }

  console.log("Uploading...")
  const statusCode = await media.modify(id, {
    file: filePath,
    fileName: basename(filePath)
  })
  console.log(`Returned status code form request ${statusCode}`)
}

main().catch((error) => console.log(error))

async function exists(path) {
  try {
    await stat(resolve(path))
    return true
  } catch(e) {
    return false
  }
}