import prompt from 'prompt'
import { stat, writeFile, readFile } from 'fs/promises'
import { resolve } from 'path'

export class UI {
  constructor(options = {}) {
    this.configObj = {
      path: resolve(options.configPath || './config.json'),
      keys: options.keys || ['t4_token']
    }
    this.started = false
  }

  async start() {
    prompt.start()
    this.started = true
    return this.getConfig()
  }

  async ask(questions) {
    if (!this.started) await this.start()
    const results = {}
    for (let { name, description, required, cb } of questions) {
      if (cb) await cb()
      const properties = {}
      properties[name] = { description, required }
      results[name] = (await prompt.get({ properties }))[name]
    }
    return results
  }

  async getConfig() {
    if (!await exists(this.configObj.path)) return await newConfig(this)
    const configJson = JSON.parse(await readFile(this.configObj.path))
    if (Object.keys(configJson).some(key => !key)) return await newConfig(this)
    return configJson
  }

  async closeQuestion() {
    const { closeID } = await prompt.get({ properties: {
      closeID: {
        required: true,
        description: 'If you\'re finished, type 1. If not, type 0'
      }
    }})
    if (parseInt(closeID)) return process.exit(1)
    return null
  }
}

async function newConfig(instance) {
  console.log('Config file not found or missing keys. Please follow the prompts below.')
  const keys = await instance.ask(instance.configObj.keys.map(name => {
    return { name, required: true, description: `Enter key value for ${name}` }
  }))
  try {
    await writeFile(instance.configObj.path, JSON.stringify(keys, null, 2))
  } catch (e) {
    console.log(`Failed to write keys to config.json due to:\n\n${e.stack}`)
    console.log('Keys will only be kept during this session...')
  }
  return keys
}

async function exists(path) {
  try {
    await stat(resolve(path))
    return true
  } catch(e) {
    return false
  }
}
export { exists }