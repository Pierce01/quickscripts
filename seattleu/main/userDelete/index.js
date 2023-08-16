import { call } from './api.js'
import { csvToJson } from './parseCsv.js'
import { readFileSync } from 'fs'

let userDB = null
let users = []

const getUserList = async () => {
  try {
    if (userDB) return userDB
    const response = await call('GET', `/userSearch?` + new URLSearchParams({allUsers: true}).toString())
    if (!response.ok) return null
    const json = await response.json()
    userDB = json.userList
    return userDB
  } catch (error) {
    console.log(error)
    return null
  }
}

const deleteUser = async id => {
  try {
    const response = await call('DELETE', `user/${id}`)
    console.log(`${id}: ${response ? 'deleted' : 'failed'}`)
    return response.ok
  } catch(error) {
    console.log(`${id}: error below`)
    console.log(error)
    return false
  }
}

const handleUser = async user => {
  const userList = await getUserList()
  if (!userList) {console.log('Failed to get userlist for ' + user); return}
  user = userList.filter(entry => entry.emailAddress.includes(user))[0]
  if (!user || !user.id) {
    console.log(`${user} lookup failed`)
    return null
  }
  return await deleteUser(user.id)
}

;(async function main() {
  const csvFile = new csvToJson(readFileSync('./SeattleU CMS Users to remove.csv', 'utf-8'))
  users = csvFile.data.map(user => user['Email Address'])
  for(let user of users) {
    await handleUser(user)
  }
})()