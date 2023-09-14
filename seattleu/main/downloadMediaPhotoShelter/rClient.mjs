export class Client {
  constructor(key, url) {
    this.url = url
    this.headers = {
      'X-PS-API-Key': key,
      'content-type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json',
    }
  }

  async query(method, endpoint, body, cb) {
    const response = await fetch(`${this.url}/${endpoint}`, {
      method,
      headers: this.headers,
      body
    })
    return cb ? await cb(response) : await response.json()
  }

  setHeader(key, value) {
    this.headers[key] = value
  }
}