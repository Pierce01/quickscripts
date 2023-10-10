/**
 * Standard Library
 * @author Pierce Harriz <pharriz@seattleu.edu>
 * @version 1.6
 */

importT4Modules(com.terminalfour.publish.utils.BrokerUtils, com.terminalfour.media.IMediaManager, com.terminalfour.spring.ApplicationContextProvider)

 /**
  * 
  * @param {string} tag - T4 Tag to be processed.
  * @returns {Object}
  */
 function getValueFromT4Tag (tag) {
     try {
         tag = BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, tag)
         return {
             isError: false,
             content: tag == '' ? null : tag
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
 function appendToHtmlTag (htmlTag, type, html, id) {
     var newScript = "var element = document.createElement('"+type+"');element.innerHTML = '"+html+"';element.id = '"+id+"';if(!document.getElementById(element.id)){document.getElementsByTagName('"+htmlTag+"')[0].append(element);};"
     var scriptTag = "<script id='tempScript'>"+newScript+"var tempScript = document.getElementById('tempScript'); tempScript.parentNode.removeChild(tempScript)</script>"
     document.write(scriptTag)
 }
 
 /**
  * 
  * @param {Object} array - Array of strings (html) to be added. Will ignore all null types.
  */
  function writeHtml (array) {
     for (var i = 0; i < array.length; i++) {
         if (array[i]) typeof array[i] == 'object' ? writeHtml(array[i]) : document.write(array[i])
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


function importT4Modules () {
    try {
        Object.keys(arguments).forEach(argument => {
            importClass(arguments[argument])
        })
        return true
    } catch (e) {
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
 