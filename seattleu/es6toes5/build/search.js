'use strict';

document.addEventListener('DOMContentLoaded', function () {
  var elements = document.getElementsByClassName("locationFeedItem");
  window.studyAbroadSearchObject = {};

  for (var i = 0; i < elements.length; i++) {
    var metaDataParsed = elements[i].firstChild.innerText.split('%&&&&&%');
    var holderText = "";
    for (var k = 0; k < metaDataParsed.length; k++) {
      var parsedSubGroup = metaDataParsed[k].split('%:% ');
      if (!window.studyAbroadSearchObject[elements[i].id]) {
        window.studyAbroadSearchObject[elements[i].id] = {};
      }
      window.studyAbroadSearchObject[elements[i].id][parsedSubGroup[0].toLowerCase()] = parsedSubGroup[1];
      holderText += parsedSubGroup[1] + ";";
    }
    window.studyAbroadSearchObject[elements[i].id]["all"] = holderText;
  }

  var array = Object.keys(window.studyAbroadSearchObject);
  var dynamicDropDownLists = {};
  var maxPrice = 0;
  for (var _i = 0; _i < array.length; _i++) {
    var id = array[_i];
    var fields = Object.keys(window.studyAbroadSearchObject[id]);
    for (var _k = 0; _k < fields.length; _k++) {
      var field = fields[_k];
      if (field !== 'all' && field !== 'su program fee') {
        var entries = window.studyAbroadSearchObject[id][field].split(',');
        if (!dynamicDropDownLists[field]) {
          dynamicDropDownLists[field] = [];
        }
        for (var j = 0; j < entries.length; j++) {
          var entry = entries[j];
          if (!dynamicDropDownLists[field].includes(entry.trim())) {
            dynamicDropDownLists[field].push(entry.trim());
          }
        }
      } else {
        if (field == 'su program fee') {
          var prices = window.studyAbroadSearchObject[id][field].split('$').join('').split(',').join('').split('/');
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = prices[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var amount = _step.value;

              var parsedAmount = parseInt(amount);
              if (parsedAmount !== NaN) {
                maxPrice = parsedAmount > maxPrice ? parsedAmount : maxPrice;
              }
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }
        }
      }
    }
  }

  array = Object.keys(dynamicDropDownLists);
  for (var _j = 0; _j < array.length; _j++) {
    dynamicDropDownLists[array[_j]].sort();
    for (var w = 0; w < dynamicDropDownLists[array[_j]].length; w++) {
      var targetElement = document.getElementById(array[_j].split(' ').join(''));
      if (targetElement) {
        if (!dynamicDropDownLists[array[_j]][w] || dynamicDropDownLists[array[_j]][w].length === 0) continue;
        targetElement.innerHTML += '<option value=' + dynamicDropDownLists[array[_j]][w] + '>' + dynamicDropDownLists[array[_j]][w] + '</option>';
      }
    }
  }

  var slider = document.getElementById('priceSlider');
  var priceDisplay = document.getElementById('priceDisplay');

  maxPrice += 100;
  slider.max = maxPrice;
  slider.value = maxPrice;
  priceDisplay.innerText = 'Any Price';
  slider.oninput = function () {
    priceDisplay.innerText = slider.value == maxPrice ? "Any Price" : slider.value == 0 ? 'Not Priced or listed as $0' : 'Under $' + slider.value;
    handleSearch();
  };
});

function handleSearch() {
  var array = Object.keys(window.studyAbroadSearchObject);
  var searchBox = document.querySelector('#SASTool input');
  for (var i = 0; i < array.length; i++) {
    var id = array[i];
    var element = document.getElementById(id);

    if (window.studyAbroadSearchObject[id]["all"].toLowerCase().indexOf(searchBox.value.toLowerCase()) > -1 && hasSearchSelection(id, "destination") && hasSearchSelection(id, "region") && hasSearchSelection(id, "program type") && handlePriceSelection(id) && hasSearchSelection(id, "term") && hasSearchSelection(id, "features") && hasSearchSelection(id, "field of study")) {
      element.style.display = "flex";
    } else {
      element.style.display = "none";
    }
  }

  var elements = document.getElementsByClassName('locationFeedItem');
  var counter = 0;
  for (var _i2 = 0; _i2 < elements.length; _i2++) {
    if (elements[_i2].style.display != 'none') {
      counter++;
      break;
    }
  }

  var noResultsElement = document.querySelector('#filterFieldWrapper > div.noResultsToShow.standardContent.hideResultsMessage');
  if (counter && noResultsElement.style.display != 'none') {
    noResultsElement.style.display = 'none';
  } else if (!counter && noResultsElement.style.display == 'none') {
    noResultsElement.style.display = 'block';
  }
}

function hasSearchSelection(id, field) {
  var value = document.getElementById(field.split(' ').join('')).value;
  return value == "any" ? true : window.studyAbroadSearchObject[id][field].indexOf(value) > -1;
}

function handlePriceSelection(id) {
  if (window.studyAbroadSearchObject[id]["su program fee"].indexOf('N/A') > -1) return true;

  var prices = window.studyAbroadSearchObject[id]["su program fee"].split('$').join('').split(',').join('').split('/');
  var value = parseInt(document.getElementById('priceSlider').value);
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = prices[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var amount = _step2.value;

      var parsedAmount = parseInt(amount);
      if (parsedAmount !== NaN) {
        return parsedAmount <= value;
      } else {
        return true;
      }
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  return false;
}