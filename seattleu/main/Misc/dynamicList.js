importClass(com.terminalfour.spring.ApplicationContextProvider)
importClass(com.terminalfour.content.IContentManager)
importClass(com.terminalfour.list.IPredefinedListManager)
try {
    // Managers
    var contentManager = ApplicationContextProvider.getBean(IContentManager)
    var listManager = ApplicationContextProvider.getBean(IPredefinedListManager)

    // Get the current options in the Category multiselectlist obj.
    var entries = contentManager.get(2525159, language).get('Category').getValue().toString().split(';')
    // Iterate through the entry array
    for (var entry in entries) {
        var temp = entries[entry].split(':')
        // temp[0] is the list id that the entry resides in while temp[1] is the entry id within that list.
        // getEntry returns a PredefinedListEntry object, so we can cleanly get the name value. We can use getValue to get the value if needed.
        document.write(listManager.getEntry(temp[0], temp[1], language).getName() + ", ")
    }
} catch(e) {
    document.write(e)
}