// PSL
var version="21.0";eval(function(version){var minImports=JavaImporter(com.terminalfour.media.IMediaManager,com.terminalfour.spring.ApplicationContextProvider,com.terminalfour.version.Version);with(minImports){var mm=ApplicationContextProvider.getBean(IMediaManager),media=mm.get(3101315,language,new Version(version)).getMedia(),s=new java.util.Scanner(media).useDelimiter("\\A");return String(s.hasNext()?s.next():"")}}(version))

try {
    var dict = new Dictionary({
        name: getValueFromT4Tag("<t4 type='content' name='Name' output='normal' modifiers='striptags,htmlentities' />"),
        csv: {
            isError: false,
            content: readMedia(content.get('CSV Upload').getStream())
        }
    })

    var csvObj = new csvToJson(dict.get('csv'))
    for (var i = 0; i < csvObj.data.length; i++) {
        document.write('<pre>' + csvObj.data[i]["Name"] + '</pre>')
    }
} catch (error) {
    document.write(error)
}