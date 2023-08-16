export async function* batch(tasks, limit, callback = (obj) => obj) {
  for (let i = 0; i < tasks.length; i = i + limit) {
    const batch = tasks.slice(i, i + limit)
    const result = await Promise.all(batch.map(task => callback(task)))
    yield result
  }
}

export async function batcher(tasks, limit, timeout, callback) {
  let results = []
  for await (const item of batch(tasks, limit, callback)) {
    results = results.concat(item)
    console.log(item.map(e => e?.id))
    await wait(timeout)
  }
  return results
}

export function wait(ms) {
  return new Promise(resolve => {
    setTimeout(e => resolve(), ms)
  })
}