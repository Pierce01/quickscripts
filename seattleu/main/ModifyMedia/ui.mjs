import { Client } from 't4.ts'
import { UI, exists } from '../promptUI/UI.mjs'
import { resolve, basename } from 'path'

const rs = "https://cms.seattleu.edu/terminalfour/rs"

;(async () => {
  while(true) {
    const instance = await new UI()
    await main(instance)
    await instance.closeQuestion()
  }
})()

async function main(instance) {
  const config = await instance.start()
  const { isAuthorized, media, profile } = new Client(rs, config['t4_token'], 'en')
  if (!await isAuthorized()) {
    throw Error("Failed to connect: Invalid token")
  }
  console.clear()
  const { firstName } = await profile.get()
  console.log(`Hello ${firstName},\n`)
  let { filePath, id } = await instance.ask([{
    name: "id",
    description: "Please enter the media ID you would like to modify",
    required: true
  }, {
    name: "filePath", 
    description: "Please enter path to the file you want to upload", 
    required: true,
  }])
  filePath = resolve(filePath)
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