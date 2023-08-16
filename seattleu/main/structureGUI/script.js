const ssvDefault = {
  chart: {
    container: "#OrganiseChart",
    node: {
      collapsable: true,
    },
    callback: {
      onTreeLoaded: function(tree) {
        const chartContainer = tree.nodeDOM.parentElement;
        chartContainer.scrollLeft = chartContainer.scrollWidth/2 - chartContainer.clientWidth/2;
      }
    }
  },
  nodeStructure: {
    text: {
      name: "Head"
    },
  }
}

const initialize = (tree) => {
  const db = tree.nodeDB.db
  const setSelected = (id) => {
    if (window.ssv) {
      window.ssv.nodeDOM.classList.toggle('selected')
    }
    window.ssv = db[id]
    window.ssv.nodeDOM.classList.toggle('selected')
  }

  const updateNode = (id) => {
    const input = prompt("Enter new node name", "Albers")
    if (!input) return
    db[id].text.name = input
    db[id].nodeDOM.firstChild.textContent = input
  }

  const deleteNode = (id) => {
    db.forEach(item => { item.children = item.children.filter(node => node != id) })
    db[id].children = null
    redraw(db)
  }

  const bindNodeID = (id) => {
    db[id].nodeDOM.id = db[id].id
    db[id].nodeDOM.onclick = () => setSelected(db[id].id)

    const containerDiv = document.createElement('span')
    const editButton = document.createElement('button')
    editButton.textContent = '✏️'
    editButton.id = 'edit'
    editButton.onclick = () => updateNode(id)
    containerDiv.append(editButton)

    const deleteButton = document.createElement('button')
    deleteButton.textContent = '🗑️'
    deleteButton.id = 'delete'
    deleteButton.onclick = () => deleteNode(db[id].id)
    containerDiv.append(deleteButton)
    db[id].nodeDOM.append(containerDiv)
  }

  document.getElementById('add').onclick = () => {
    const selected = document.querySelector('.selected').id
    const input = document.getElementsByTagName('input')[0]
    const newNode = tree.addNode(db[selected], {
      text: {
        name: input.value
      }
    })
    input.value = ''
    bindNodeID(newNode.id)
  }

  document.getElementById('export').onclick = () => exportTree(db)
  document.getElementById('import').onchange = handleUpload
  document.getElementById('treantonly').onclick = () => redraw(db)

  for (let node of db) {
    if (node.nodeDOM) {
      bindNodeID(node.id)
    }
  }
  setSelected(0)
}

let treant = new Treant(ssvDefault, initialize)

function handleUpload(event) {
  let file = event.target.files[0]
  let reader = new FileReader();

  reader.onload = async (response) => {
    importFromJson(JSON.parse(response.target.result))
  }
  reader.readAsText(file)
}

function importFromJson(obj) {
  const selection = document.getElementById('library').value
  if (!obj) {
    obj = ssvDefault
  }

  if (selection == '1') {
    document.getElementById('OrganiseChart').append(window.tree(obj, { 
      label: d => d.name,
      tree: window.d3.tree,
      width: window.innerWidth + (document.getElementById('extend').checked ? 4000 : 0)
    }))
  } else {
    treant = new Treant({
      ...ssvDefault,
      nodeStructure: obj.nodeStructure
    }, initialize)
  }
}

function exportTree(db) {
  const name = document.getElementsByTagName('input')[0].value || db[0].text.name
  const obj = {
    nodeStructure: {
      text: { name },
      children: buildTreeObj(db, db[0].children)
    }
  }
  saveData(obj, (name == '' ? 'structure' : name) + '.json')
}

function redraw(db) {
  importFromJson({
    nodeStructure: {
      text: { name: db[0].text.name },
      children: buildTreeObj(db, db[0].children)
    }
  })
}

function buildTreeObj(db, childNodes) {
  if (childNodes) {
    childNodes = childNodes.map(id => {
      return {
        text: { name: db[id].text.name },
        children: buildTreeObj(db, db[id].children),
      }
    })
    return childNodes
  }
}

function saveData(data, fileName) {
  const a = document.createElement("a")
  document.body.appendChild(a)
  a.style = "display: none"
  const json = JSON.stringify(data, null, 4),
    blob = new Blob([json], {type: "octet/stream"}),
    url = window.URL.createObjectURL(blob)
  a.href = url
  a.download = fileName
  a.click()
  window.URL.revokeObjectURL(url)
  a.remove()
}

document.body.ondragover = (event) => {
  event.preventDefault()
  if (document.getElementById('overlay').style.display == 'none' || document.getElementById('overlay').style.display == '') {
    document.getElementById('overlay').style.display = 'block'
  }
}

document.getElementById('overlay').ondrop = (event) => {
  event.preventDefault()
  document.getElementById('OrganiseChart').innerHTML = ''
  document.getElementById('overlay').style.display = 'none'
  handleUpload({
    target: {
      files: event.dataTransfer.files
    },
  })
}

document.getElementById('library').onchange = () => {
  if (document.getElementById('library').value == '1') {
    document.getElementById('inputBox').disabled = true
    document.getElementById('export').disabled = true
    document.getElementById('add').disabled = true
    document.getElementById('OrganiseChart').innerHTML = ''
    document.getElementById('d3only').hidden = false
    document.getElementById('treantonly').hidden = true
  } else {
    document.getElementById('inputBox').disabled = false
    document.getElementById('export').disabled = false
    document.getElementById('add').disabled = false
    document.getElementById('d3only').hidden = true
    document.getElementById('treantonly').hidden = false
    treant = new Treant(ssvDefault, initialize)
  }
}