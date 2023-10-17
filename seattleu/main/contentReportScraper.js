const allRows = document.querySelectorAll("#results > div > div > table > tbody > tr")
let newTable = [['ID', 'Name', 'Path', 'Status', 'Last Modified'].map(entry => `"${entry}"`).join(',')]  + '\n'
for (let row of allRows) {
  const name = row.children[1].innerText,
    path = row.children[0].innerText,
    status = row.children[3].childNodes[0].outerText,
    id = row.children[1].childNodes[1].dataset.id,
    lastModified = row.children[2].innerText.split('\n')[0]
  if (status == 'Approved') {
    newTable += [id, name, path, status, lastModified].map(entry => `"${entry}"`).join(',') + '\n'
  }
}

console.log(newTable)