importClass(com.terminalfour.publish.utils.BrokerUtils)

function getValueFromTag(tag) {
    try {
        return {
            isError: false,
            content: BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, tag)
        }
    } catch (error) {
        return {
            isError: true,
            message: error.stack
        }
    }
}

function writeHtml(array) {
    for (var i = 0; i < array.length; i++) {
        if (array[i]) document.write(array[i])
    }
}

function appendToTag(htmlTag, type, html, id) {
    var newScript = "var element = document.createElement('"+type+"');element.innerHTML = '"+html+"';element.id = '"+id+"';if(!document.getElementById(element.id)){document.getElementsByTagName('"+htmlTag+"')[0].append(element);};"
    var scriptTag = "<script id='tempScript'>"+newScript+"var tempScript = document.getElementById('tempScript'); tempScript.parentNode.removeChild(tempScript)</script>"
    document.write(scriptTag)
}

try {
    document.write(getValueFromTag("<t4 type='content' name='Overlay Shades' output='normal' modifiers='striptags,htmlentities' />").content)
} catch (e) {
    document.write(e)   
}