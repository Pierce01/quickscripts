importT4Modules(com.terminalfour.publish.utils.BrokerUtils, com.terminalfour.media.IMediaManager, com.terminalfour.content.IContentManager, com.terminalfour.search.access.tree.TreeHelper, com.terminalfour.spring.ApplicationContextProvider)



try {
    // var mediaManager = ApplicationContextProvider.getBean(IMediaManager), hierarchyManager = ApplicationContextProvider.getBean(IHierarchyManager),
    var treeHelper = ApplicationContextProvider.getBean(TreeHelper)
    var obj = treeHelper.getContentPaths(content.getID())
    for(var i = 0; i < obj.size(); i++) {
        var _obj = obj.get(i)
        for (var j = 0; j < _obj.length; j++) {
            document.write(" " + _obj[j] + " ");
        }
    }
    document.write("Ran")

} catch(e) {
    document.write(e)
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

function get (name, cbSuccess, cbFail) {
    var rawObject = content.get(name)
    return rawObject.getValue() == '' 
        ? (cbFail ? cbFail() 
                  : null)
        : (cbSuccess ? cbSuccess(rawObject) 
              : rawObject)
}