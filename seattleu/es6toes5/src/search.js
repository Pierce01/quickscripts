document.addEventListener('DOMContentLoaded', function() {
  const elements = document.getElementsByClassName("locationFeedItem");
  window.studyAbroadSearchObject = {}

  for(let i = 0; i < elements.length; i++) {
    const metaDataParsed = (elements[i].firstChild.innerText).split('%&&&&&%');
    let holderText = ""
    for(let k = 0; k < metaDataParsed.length; k++) {
      const parsedSubGroup = metaDataParsed[k].split('%:% ');
      if(!window.studyAbroadSearchObject[elements[i].id]) {
        window.studyAbroadSearchObject[elements[i].id] = {}
      }
      window.studyAbroadSearchObject[elements[i].id][parsedSubGroup[0].toLowerCase()] = parsedSubGroup[1];
      holderText += parsedSubGroup[1] + ";";
    }
    window.studyAbroadSearchObject[elements[i].id]["all"] = holderText;
  }

  let array = Object.keys(window.studyAbroadSearchObject)
  let dynamicDropDownLists = {}
  let maxPrice = 0
  for (let i = 0; i < array.length; i++) {
    const id = array[i]
    const fields = Object.keys(window.studyAbroadSearchObject[id])
    for (let k = 0; k < fields.length; k++) {
      const field = fields[k]
      if (field !== 'all' && field !== 'su program fee') {
        let entries = window.studyAbroadSearchObject[id][field].split(',')
        if (!dynamicDropDownLists[field]) {
          dynamicDropDownLists[field] = []
        }
        for (let j = 0; j < entries.length; j++) {
          const entry = entries[j]
          if (!dynamicDropDownLists[field].includes(entry.trim())) {
            dynamicDropDownLists[field].push(entry.trim())
          }
        }
      } else {
        if (field == 'su program fee') {
          let prices = window.studyAbroadSearchObject[id][field].split('$').join('').split(',').join('').split('/')
          for (let amount of prices) {
            let parsedAmount = parseInt(amount)
            if (parsedAmount !== NaN) {
              maxPrice = parsedAmount > maxPrice ? parsedAmount : maxPrice
            }
          }
        }
      }
    }
  }

  array = Object.keys(dynamicDropDownLists)
  for(let j = 0; j < array.length; j++) {
    dynamicDropDownLists[array[j]].sort()
    for (let w = 0; w < dynamicDropDownLists[array[j]].length; w++) {
      const targetElement = document.getElementById((array[j].split(' ')).join(''))
      if (targetElement) {
        if (!dynamicDropDownLists[array[j]][w] || dynamicDropDownLists[array[j]][w].length === 0) continue
        targetElement.innerHTML += '<option value="' + dynamicDropDownLists[array[j]][w] + '">' + dynamicDropDownLists[array[j]][w] + '</option>'
      }
    }
  }

  const slider = document.getElementById('priceSlider')
  const priceDisplay = document.getElementById('priceDisplay')

  maxPrice += 100
  slider.max = maxPrice
  slider.value = maxPrice
  priceDisplay.innerText = 'Any Price'
  slider.oninput = () => {
    priceDisplay.innerText = slider.value == maxPrice ? "Any Price" : (slider.value == 0 ? `Not Priced or listed as $0` : `Under $${slider.value}`)
    handleSearch()
  }
})

function handleSearch() {
const array = Object.keys(window.studyAbroadSearchObject)
const searchBox = document.querySelector('#SASTool input')
for (let i = 0; i < array.length; i++) {
  const id = array[i]
  const element = document.getElementById(id)

  if (window.studyAbroadSearchObject[id]["all"].toLowerCase().indexOf(searchBox.value.toLowerCase()) > -1 &&
     hasSearchSelection(id, "destination") && hasSearchSelection(id, "region") && hasSearchSelection(id, "program type") && 
     handlePriceSelection(id) && hasSearchSelection(id, "term") && hasSearchSelection(id, "features") &&
     hasSearchSelection(id, "field of study")) {
    element.style.display = "flex"
  } else {
    element.style.display = "none"
  }
}

const elements = document.getElementsByClassName('locationFeedItem')
let counter = 0
for (let i = 0; i < elements.length; i++) {
  if (elements[i].style.display != 'none') {
    counter++
    break
  }
}

const noResultsElement = document.querySelector('#filterFieldWrapper > div.noResultsToShow.standardContent.hideResultsMessage')
if (counter && noResultsElement.style.display != 'none') {
  noResultsElement.style.display = 'none'
} else if (!counter && noResultsElement.style.display == 'none') {
  noResultsElement.style.display = 'block'
}
}

function hasSearchSelection (id, field) {
const value = document.getElementById(field.split(' ').join('')).value
return value == "any" ? true : window.studyAbroadSearchObject[id][field].indexOf(value) > -1
}

function handlePriceSelection(id) {
if (window.studyAbroadSearchObject[id]["su program fee"].indexOf('N/A') > -1) return true

let prices = window.studyAbroadSearchObject[id]["su program fee"].split('$').join('').split(',').join('').split('/')
const value = parseInt(document.getElementById('priceSlider').value)
for (let amount of prices) {
  let parsedAmount = parseInt(amount)
  if (parsedAmount !== NaN) {
    return parsedAmount <= value
  } else {
    return true
  }
}
 return false
}
