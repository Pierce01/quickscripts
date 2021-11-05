importClass(com.terminalfour.spring.ApplicationContextProvider)

// Getting CT key & value example
importClass(com.terminalfour.contenttype.IContentTypeController)
try {
    // Just putting everything here so it looks nice for the example
    var string = ''
    // Gets the content type controller object so we can get the CT's elements
    var contentTypeController = ApplicationContextProvider.getBean(IContentTypeController)
    // Get the elements from the current content type and convert it to an array
    var valueElements = content.getElements().toArray()
    // Get the content type's elements with the current content entrie's CT ID and convert it to an array
    var keyValues = contentTypeController.get(content.getContentTypeID()).getElements().toArray()
    // Putting them together. You can put them in a dictionary and organize them that way which should be done.
    for (let key in keyValues) {
        string += keyValues[key].getName() + ': ' + valueElements[key] + '\n'
    }
    document.write("<pre>" + string + "</pre>")
} catch(e) {
    document.write(e)
}
