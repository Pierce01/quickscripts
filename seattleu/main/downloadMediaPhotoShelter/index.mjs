import config from './config.json' assert { type: "json" }
import { Client } from './rClient.mjs'
import { promises as fs } from 'fs'
import AdmZip from 'adm-zip'

console.log('\n\nSetting up V3 and V4 API clients...')
const { mode, email, password, org_id } = config.login
const loginDetails = `email=${email}&password=${password}&mode=${mode}`
const v3Client = await getClient(config.keys.v3, config.urls.v3)
const v4Client = await getClient(config.keys.v4, config.urls.v4, async (client) => {
  const isOrg = (await client.query('POST', 'organization/authenticate', `org_id=${org_id}`))
  if (!isOrg?.status == 'ok') throw Error('Invalid Login for Org authentication - v4')
})

console.log('Login success, getting workspaces...')
const failed = []
// const workspaces = ((await v3Client.query('GET', `workspace/query?extend=${JSON.stringify({MediaCount:{fields: 'total'}})}`)).data['Workspace']).map(space => {
//   return {
//     name: space.name,
//     workspace_id: space.workspace_id,
//     mediaCount: space['MediaCount']
//   }
// }).filter(space => space.mediaCount.total > 0)
const workspaces = [
  {
    name: 'Homepage',
    workspace_id: 'W0000jPFUZ3dKbyk',
    mediaCount: {total: 1}
  },
  {
    name: 'Pierce',
    workspace_id: 'W00005w9KWZnqRto',
    mediaCount: {total: 1}
  }
]
let total = workspaces.length, current = 0
for (let space of workspaces) { await downloadHandler(space, true) }
for (let space of failed) { await downloadHandler(space, false) }



await v3Client.query('GET', 'mem/authenticate/logout')
await v4Client.query('GET', 'authenticate/logout', null, async () => {})

console.log('\nFinished downloading workspaces. Closing...')

async function getClient(key, version, cb) {
  const client = new Client(key, `${config.urls.base + version}`)
  const query = await client.query('POST', `${version.includes('3') ? 'mem/' : ''}authenticate`, loginDetails)
  const token = version.includes('3') ? query?.data.token : query.token
  if (!token) throw Error('Invalid Login')
  client.setHeader('X-PS-Auth-Token', token)
  if (cb) await cb(client)
  return client
}

async function zipDownloadHandler(response, name) {
  try {
    console.log('Downloading ' + `${name}.zip`)
    const buffer = await response.arrayBuffer()
    await fs.writeFile(`./images/${name}/${name}.zip`, Buffer.from(buffer))
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}

async function downloadHandler(space, retry) {
  const name = space.name.replace(/[^a-zA-Z0-9]/g,'_')
  const folder = `./images/${name}`
  if (!await exists(folder)) {
    await fs.mkdir(folder)
    const manifest = await getManifest(space.workspace_id)
    await fs.writeFile(`${folder}/manifest.json`, JSON.stringify(manifest, null, 2))
  }
  if (!await exists(`./images/${name}/${name}.zip`)) {
    await v4Client.query('GET', `media/batch/download?workspace_id=${space.workspace_id}`, null, async (response) => {
      const isDownloaded = await zipDownloadHandler(response, name)
      if (!isDownloaded) {
        if (retry) failed.push({
          url: `media/batch/download?workspace_id=${space.workspace_id}`,
          name
        })
        console.log(`${name}.zip failed to download. willRetry=${retry}`)
      } else {
        console.log(`${name}.zip downloaded.`)
      }
    })
  }
  console.log(`${++current}/${total}`)
}

async function getManifest(workspace_id) {
  const WorkspaceImages = (await v3Client.query('GET', `workspace/${workspace_id}/media?extend=${JSON.stringify(config.extendQuery)}`)).data['WorkspaceMedia']
  return WorkspaceImages.map(image => {
    const iptcObj = image.WorkspaceImage['Iptc']
    const links = image.WorkspaceImage['Link']
    const mediaObj = image.WorkspaceImage['Media']
    mediaObj['details'] = {
      keywords: iptcObj['keyword'],
      caption: iptcObj['display_caption'],
      links,
      group: image.WorkspaceImage['Group'],
      commentCount: image.WorkspaceImage['CommentCount']
    }
    return mediaObj
  })
}

async function exists(path) {
  try {
    return await fs.stat(path)
  } catch (error) {
    return false
  }
}