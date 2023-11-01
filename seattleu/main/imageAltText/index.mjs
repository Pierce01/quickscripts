import { altToken } from './config.js'
import { readFile, readdir } from 'fs/promises'
import { resolve } from 'path'

const file = new Blob([await readFile('./upload.csv')])
const form = new FormData()
form.append('file', file, 'filename.csv')

const bulkResp = await bulkUpload(form)
console.log(bulkResp)
await wait(10000)
console.log(await getImages(bulkResp.timestamp))

async function getImages(timestamp) {
  const response = await fetch('https://alttext.ai/api/v1/images', {
    method: 'GET',
    headers: {
      'X-API-Key': altToken,
      'Content-Type': 'application/json'
    }
  })
  const images = (await response.json()).images
  return images.filter(image => image.created_at > timestamp)
}

async function bulkUpload(form) {
  const timestamp = Math.floor(Date.now() / 1000) - 10
  const response = await fetch('https://alttext.ai/api/v1/images/bulk_create', {
    method: 'POST',
    headers: {
      'X-API-Key': altToken,
    },
    body: form
  })
  try {
    return { ...await response.json(), timestamp }
  } catch (e) {
    console.log(e, await response.statusText)
    return null
  }
}

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
