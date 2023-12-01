import { UI } from '../promptUI/UI.mjs'
import { url, token } from './config.js'
import { Client } from '../../../../t4apiwrapper/t4.ts/esm/index.js'
// import { makePage } from './makePage.mjs';


const { contentType, content, list, serverSideLink, upload, hierarchy, isAuthorized } = new Client(url, token)

console.log(await serverSideLink.get(4, 207598, 7295729))

// const rsUrl = 'https://cms.seattleu.edu/terminalfour/rs'

// ;(async () => {
//   while(true) {
//     const instance = new UI({ keys: ['t4_token'] })
//     await main(instance)
//     await instance.closeQuestion()
//   }
// })()

// async function main(instance) {
//   const client = new Client(url, instance['t4_token'])

// }

// async function runMakePage(instance, client) {
//   const { sectionId } = await instance.ask([{
//     name: 'sectionId', required: true, description: 'Enter section ID'
//   }])
//   return await makePage(client, sectionId)
// }