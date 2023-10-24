import { Client } from '../../../../t4apiwrapper/t4.ts/esm/index.js'
import { url, token } from './config.js'

const sectionId = 205939,
 newChannels = [34]

const { content, hierarchy } = new Client(url, token)
const contentObjs = (await hierarchy.getContents(sectionId)).contents
for (let { id, name } of contentObjs) {
  try {
    const contentObj = await content.get(id, sectionId, 'en')
    const tempChannels = [...new Set([...contentObj.channels, ...newChannels])].sort()
    if (!(JSON.stringify(tempChannels) == JSON.stringify(contentObj.channels.sort()))) {
      await content.modify(contentObj.id, sectionId, { channels: tempChannels })
      console.log(`Updated ${name}'s channel`)
    }
  } catch (e) {
    console.log(`Failed to update ${name}'s channels`)
  }
}