// The following is the import to the standard library.
// Functions being added: getValueFromT4Tag, appendToHtmlTag, writeHtml
// Classes beibng added: Dictionary
var version="2.0";eval(function(version){var minImports=JavaImporter(com.terminalfour.media.IMediaManager,com.terminalfour.spring.ApplicationContextProvider,com.terminalfour.version.Version);with(minImports){var mm=ApplicationContextProvider.getBean(IMediaManager),media=mm.get(3101315,language,new Version(version)).getMedia(),s=new java.util.Scanner(media).useDelimiter("\\A");return String(s.hasNext()?s.next():"")}}(version))

// Example
var dict = new Dictionary({
    name: getValueFromT4Tag('<t4 type="content" name="Name" output="normal" modifiers="striptags,htmlentities" />'),
    image: getValueFromT4Tag('<t4 type="content" name="Media" output="normal" formatter="path/*" />')
})

if (!dict.hasErrors()) {
    document.write(dict.get('name'))
} else {
    document.write('dict contains errors')
}






