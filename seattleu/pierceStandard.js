/**
 * Standard Library
 * @author Pierce Harriz <pharriz@seattleu.edu>
 * @version 1.5
 */

importClass(com.terminalfour.publish.utils.BrokerUtils)
importClass(com.terminalfour.media.IMediaManager) 
importClass(com.terminalfour.spring.ApplicationContextProvider) 

/**
 * 
 * @param {string} tag - T4 Tag to be processed.
 * @returns {Object}
 */
function getValueFromT4Tag(tag) {
    try {
        tag = BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, tag)
        return {
            isError: false,
            content: tag == '' 
                ? null 
                : tag
        }
    } catch (error) {
        return {
            isError: true,
            message: error.stack
        }
    }
}

/**
 * 
 * @param {string} htmlTag - The specific HTML tag that you want to appened to.
 * @param {string} type - The type of HTML element you are going to be appending. EX: script, style, p
 * @param {string} html - The HTML you will be appending. This is also where you'd put JS if you're appending JS.
 * @param {integer} id - The ID of the newly created HTML element.
 */
function appendToHtmlTag(htmlTag, type, html, id) {
    var newScript = "var element = document.createElement('"+type+"');element.innerHTML = '"+html+"';element.id = '"+id+"';if(!document.getElementById(element.id)){document.getElementsByTagName('"+htmlTag+"')[0].append(element);};"
    var scriptTag = "<script id='tempScript'>"+newScript+"var tempScript = document.getElementById('tempScript'); tempScript.parentNode.removeChild(tempScript)</script>"
    document.write(scriptTag)
}

/**
 * 
 * @param {Object} array - Array of strings (html) to be added. Will ignore all null types.
 */
function writeHtml(array) {
    for (var i = 0; i < array.length; i++) {
        if (array[i]) document.write(array[i])
    }
}

/**
 * 
 * @param {integer} id 
 * @returns {Object}
 * @returns null
 */
function getMedia (id) {
    var mm = ApplicationContextProvider.getBean(IMediaManager)
    if (mm.exists(id, language)) {
        return mm.get(id, language).getMedia()
    } else {
        return null
    }
}

/**
 * 
 * @param {Media} media
 * @returns string
 * @returns null
 */
function readMedia (media) {
    var s = new java.util.Scanner(media).useDelimiter("\\A")
    return (String(s.hasNext() ? s.next() : ""))
}

/**
 * 
 * @param {integer} id 
 * @returns true
 * @returns false
 */
function loadScript (id) {
    var media = getMedia(id)
    if (media) {
        s = new java.util.Scanner(media).useDelimiter("\\A")
        eval(String(s.hasNext() ? s.next() : ""))
        return true
    } else {
        return false
    }
}

/**
 * 
 * @param {Object} obj - JSON object with getValueFromT4Tag objects
 * @example var dict = new Dictionary({textColor: getValueFromT4Tag("<t4 type='content' name='Text Color' output='normal' />")})
 */
function Dictionary (obj) {
    this.obj = obj
    this.keys = Object.keys(this.obj)
    this.errorString = (function (obj, keys) {
        var errorString = ''
        for (var i = 0; i < keys.length; i++) {
            if (obj[keys[i]].isError) {
                errorString += '' + keys[i] + ' - ' + obj[keys[i]].message + '\n'
            }
        }
        return errorString == '' ? false : errorString
    })(this.obj, this.keys)
}

/**
 * 
 * @param {string} key
 * @returns string 
 * @returns Object
 * @returns null
 */
Dictionary.prototype.get = function (key) {
    return this.obj[key].isError ? null : this.obj[key].content
}
/**
 * 
 * @returns string
 * @returns false
 */
Dictionary.prototype.hasErrors = function () {
    return this.errorString
}

// The following is a simple CSV to JSON parser made for the study abroad project. However, this can be used
// any where else it's needed. If this is breaking, please ask Pierce why.
/**
 * 
 * @param {string} str - An UNMODIFIED CSV file is required to be passed through here. 
 */
 function csvToJson(str) {
    this.raw = str.split('\n')
    this.headers = []
    this.data = []
    this.parseLine = function(target, string) {
        var inQuote = false
        var tempStr = ''

        // terminal four does not support spread operators or "of" for-loops... 
        string = string.split('')
        for (let i = 0; i < string.length; i++) {
            var char = string[i]
            if (char == ',' && !inQuote || char == '\r') {
                target.push(tempStr)
                tempStr = ''
            } else if (char == '"' && !inQuote) {
                inQuote = true
            } else if (char == '"' && inQuote) {
                inQuote = false
            } else {
                tempStr += char
            }
        }
    }
    this.parseLine(this.headers, this.raw[0])
    for (var i = 1; i < this.raw.length - 1; i++) {
        var dataArr = []
        var obj = {}
        this.parseLine(dataArr, this.raw[i])
        for (var k = 0; k < this.headers.length; k++) {
            obj[this.headers[k]] = dataArr[k]
        }
        this.data.push(obj)
    }
}