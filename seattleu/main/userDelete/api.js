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
    return request.ok ? request : null
  } catch (error) {
    console.log(error)
    return null
  }
}