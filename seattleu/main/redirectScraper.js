// Usage: paste in console when seattleu.edu/redirects is loaded
let db = { 'Other': [] }
document.querySelector("#menu").childNodes.forEach(element => {
  const a = element.children[0], ul = element.children[1]
  db[ul ? a.innerText : 'Other'] = ul
  ? [...ul.children].map(child => ({ incoming: child.children[0].href, name: child.children[0].innerText }))
  : [...db['Other'], { incoming: a.href, name: a.innerText }];
})

let csv = ['"Category"', '"Name"', '"Incoming"', '"Outgoing"', '"Status"'].join(',')
const keys = Object.keys(db)
for (let key of keys) {
  await Promise.all(db[key].map(async entry => {
    entry.outgoing = await get(entry.incoming);
    csv+= '\n' + [`"${key}"`, `"${entry.name}"`, `"${entry.incoming.replace(',', '%2C')}"`, 
      `"${entry.outgoing.url.replace(',', '%2C')}"`, `"${entry.outgoing.code}"`].join(',')
  }))
}

let csvFile = new Blob([csv], {type: 'text/csv'})
let download = document.createElement('a')
download.href = (window.webkitURL || window.url).createObjectURL(csvFile)
download.download = 'redirects.csv'
download.click()
download.remove()

async function get(url) {
  let code
  try {
    const request = await fetch(url)
    url = request.url
    code = request.status
  } catch(e) {
    url = 'Failed to resolve'
    code = 500
  }
  return { url, code }
}


