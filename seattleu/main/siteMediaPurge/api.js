import fetch from 'node-fetch'
import { token, api } from './config.js'

export async function call(method, endpoint, options) {
  if (!token) throw Error('Token not specified')
  try {
    const request = await fetch(`${api}/${endpoint}`, {
      headers: {
        'authorization': `Bearer ${token}`
      },
      method,
      ...options
    })
    return parseInt(request.status) < 350 ? request : null
  } catch (error) {
    console.log(error)
    return null
  }
}

export async function get(endpoint) {
  const request = await call('GET', endpoint)
  return request ? await request.json() : null
}