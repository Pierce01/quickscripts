// PSL
var version="21.0";eval(function(version){var minImports=JavaImporter(com.terminalfour.media.IMediaManager,com.terminalfour.spring.ApplicationContextProvider,com.terminalfour.version.Version);with(minImports){var mm=ApplicationContextProvider.getBean(IMediaManager),media=mm.get(3101315,language,new Version(version)).getMedia(),s=new java.util.Scanner(media).useDelimiter("\\A");return String(s.hasNext()?s.next():"")}}(version))

try {
    var mediaManager = ApplicationContextProvider.getBean(IMediaManager)
    var cssClass = 'locationFeedItem profileItem card shadow col-xs-12 col-sm-10 col-md-8 col-lg-6 col-xl-4'
    var cityCountryString = function () {
        // Using getValue here since technically whats being returned is typed as an object rather then a string.
        // The reason why I'm not using getValue for the other get statements is because they display properly
        // without calling the method, but just can't call string related properties.
        var cities = content.get('City').getValue().split(',').length
        var countries = content.get('Country').getValue().split(',').length
        if (cities > 1 && countries > 1) {
            return 'Multiple locations'
        } else if (cities > 1 && countries == 1) {
            return 'Multiple cities in ' + content.get('Country')
        } else if (cities == 1 && countries > 1) {
            // This would be caused by user error
            return 'Multiple locations'
        } else {
            return content.get('City').getValue() + ', ' + content.get('Country').getValue()
        }
    }()
    var imageObj = function () {
        var webImage = content.get('Web Image URL') == '' ? null : content.get('Web Image URL')
        var libraryImage = content.get('Web Image ID number') == '' ? null : content.get('Web Image ID number')
        if (libraryImage) {
            var resolved = getValueFromT4Tag("<t4 type='media' formatter='path/*' id='" + libraryImage +"' />")
            return {
                url: resolved.content,
                description: mediaManager.get(libraryImage, language).getDescription()
            }
        } else if (webImage) {
            return { 
                url: webImage, 
                description: content.get('Alt Text')
            }
        } else {
            return {
                url: 'https://i.imgur.com/UNoVLwX.png',
                description: 'No image provided'
            }
        }
    }()
    
    document.write('<div class="' + cssClass + '" title="' + content.get('Name') + '" id="id' + content.getID() + 
    '" data-position-default="ZoneA" data-position-selected="ZoneA">' + 
    '<span class="cardImageWrapper"><img src="' + imageObj.url + '" class="card-img-top"' +
    ' alt="' + imageObj.description + '"></span> <div class="card-body"><h3 class="card-title">' + 
    '<a href="' + (getValueFromT4Tag("<t4 type='content' name='Name' output='fulltext' use-element='true' filename-element='Name' modifiers='striptags,htmlentities' />")).content + 
    '">' + content.get('Program Title') + '</a></h3><p class="card-text margin0 subtext">' + cityCountryString + 
    '</p><p class="card-text margin0">' + content.get('Program Type') + '</p> <p class="card-text">' + content.get('Program Fee') + 
    '</p></div><div class="card-footer"><span class="locationRegion">' + content.get('Region') + '</span></div></div>')
} catch (error) {
    document.write(error)
}