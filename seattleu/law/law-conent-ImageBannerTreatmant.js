/***
*      @author Pierce Harriz
*      @file law-conent-ImageBannerTreatmant.js
*      @see Seattle University School of Law Image Banner Treatmant CT.
*      law/text/html
*
*      Document will write once when the page loads
*
*      @version 1.0
*/
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
    // string that we will be adding all of our added 
    var css = ''
    var dict = {
        textColor: getValueFromTag("<t4 type='content' name='Text Color' output='normal' modifiers='striptags,htmlentities' />"),
        textShadow: getValueFromTag("<t4 type='content' name='Text Shadow' output='normal' modifiers='striptags,htmlentities' />"),
        overlayShades: getValueFromTag("<t4 type='content' name='Overlay Shades' output='normal' modifiers='striptags,htmlentities' />"),
        overlayTints: getValueFromTag("<t4 type='content' name='Overlay Tints' output='normal' modifiers='striptags,htmlentities' />"),
    }

    // Get all the errors returned from getValueFromTag and put them in errorString.
    var errorString = ''
    var keys = Object.keys(dict)
    for (var i = 0; i < keys.length; i++) {
        if (dict[keys[i]].isError) {
            errorString += '' + keys[i] + ' - ' + dict[keys[i]].message + '\n'
        }
    }

    if (errorString) {
        // Should be a silent error but we don't have access to console in this env, so we'll just put it on the page.
        document.write('<pre>' + errorString + '</pre>')
    } else {
        // Text color
        if (dict.textColor.content) {
            css += '.imageBanner h1.pageTitle{color:' + dict.textColor.content + '}'
        }
        // Text Shadow
        if (dict.textShadow.content) {
            css+= dict.textShadow.content.split('COLOR').join(dict.textColor.content == '#333333' ? '#FFFFFF' : '#333333')
        }
        // Overlay Shades/Tints
        if (dict.overlayShades.content && (dict.overlayShades.content.split(',')[0] != '-1')) {
            var value = dict.overlayShades.content.split(',')[0]
            css += '.imageBanner{background-color:rgba(0,0,0,'+ value/100 +');background-blend-mode:multiply;}'
        } else if (dict.overlayTints.content && (dict.overlayTints.content.split(',')[0] != '-1')) {
            var value = dict.overlayTints.content.split(',')[0]
            css += '.imageBanner{background-color:rgba(255,255,255,'+ value/100 +');background-blend-mode:color;}'
        }
        if (css !== '') appendToTag('head', 'style', css, content.getID())
    }
} catch (e) {
    document.write(e)
}