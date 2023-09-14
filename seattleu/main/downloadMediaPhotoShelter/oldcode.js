// async function downloadImage(link, name) {
//   const request = await fetch(link)
//   const data = await request.arrayBuffer()
//   fs.writeFileSync(`./images/${name}`, Buffer.from(data))
// }
// const size = `${media.height}x${media.width}`
  // let link = image['Link'].link.replace(config.extendQuery.ImageLink.params.image_size, size)
  // await downloadImage(link, media.file_name)

  // const client = new Client(config.keys.v3, `${config.urls.base + config.urls.v3}`)
  // let token = (await client.query('POST', 'mem/authenticate', loginDetails))?.data.token
  // if (!token) throw Error('Invalid Login - v3')
  // client.setHeader('X-PS-Auth-Token', token)
  // return client

// const WorkspaceImages = (await v3Client.query('GET', `workspace/W00005w9KWZnqRto/media?extend=${JSON.stringify(config.extendQuery)}`)).data['WorkspaceMedia']
// const ids = WorkspaceImages.map(image => image.WorkspaceImage['Media'].image_id)
// await v4Client.query('GET', `media/batch/download?workspace_id=W00005w9KWZnqRto`, null, zipHandler)

// const v4Client = new Client(config.keys.v4, `${config.urls.base + config.urls.v4}`)
// let token = (await v4Client.query('POST', 'authenticate', loginDetails))?.token
// if (!token) throw Error('Invalid Login - v4')
// v4Client.setHeader('X-PS-Auth-Token', token)
// const isOrg = (await v4Client.query('POST', 'organization/authenticate', `org_id=${org_id}`))?.status == 'ok'
// if (!isOrg) throw Error('Invalid Login for Org authentication - v4')

// const v4AuthResp = await v4Client.query('POST', 'authenticate', loginDetails)
// v4Client.setHeader('X-PS-Auth-Token', v4AuthResp.token)

// await login()
// console.log('User Session')
// console.log(await getSession())
// console.log('Galleries')
// console.log(await getGalleries())
// console.log('Collection')
// console.log(await getCollection('C0000_B6SF_lCgMk'))
// console.log('Workspaces')
// console.log(await getWorkspace('W0000n0CJ4mrSfmQ'))
// console.log(await clearBearer())

// async function login(type) {
//   const bearer = await getBearer()
//   if(!bearer.token) throw Error('Login failed')
//   headers['X-PS-Auth-Token'] = bearer.token
//   await authOrg()
// }

// async function getCollection(id) {
//   const response = await fetch(`${config.apiURL}/collections/${id}`, {
//     method: 'GET',
//     headers
//   })
//   return await response.json()
// }

// async function getGalleries() {
//   const response = await fetch(`${config.apiURL}/galleries`, {
//     method: 'GET',
//     headers
//   })
//   return await response.json()
// }

// // async function getBearer(client) {
// //   await client.query('POST', '/mem/authenticate', `email=${email}&password=${password}&mode=${mode}`)
// //   return await response.json()
// // }

// async function getWorkspace(id) {
//   console.log(`${config.apiURL}/workspaces/${id}`)
//   const response = await fetch(`${config.apiURL}/workspaces/${id}`, {
//     method: 'GET',
//     headers,
//   })
//   return await response.json()
// }

// async function getSession() {
//   const response = await fetch(`${config.apiURL}/user/session`, {
//     method: 'GET',
//     headers,
//   })
//   return await response.json()
// }

// async function authOrg() {
//   const response = await fetch(`${config.apiURL}/organization/authenticate`, {
//     method: 'POST',
//     headers,
//     body: `org_id=${org_id}`
//   })
//   const resp = await response.json()
//   if(resp.errors?.length > 0) throw Error('user account has no permission.')
//   return resp
// }

// async function clearBearer() {
//   if(!headers['X-PS-Auth-Token']) return -1
//   const response = await fetch(`${config.apiURL}/authenticate/logout`, {
//     method: 'POST',
//     headers
//   })
//   return response.status
// }