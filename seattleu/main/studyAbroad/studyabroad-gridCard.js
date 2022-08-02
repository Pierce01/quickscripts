// PSL
var version="23.0";eval(function(version){var minImports=JavaImporter(com.terminalfour.media.IMediaManager,com.terminalfour.spring.ApplicationContextProvider,com.terminalfour.version.Version);with(minImports){var mm=ApplicationContextProvider.getBean(IMediaManager),media=mm.get(3101315,language,new Version(version)).getMedia(),s=new java.util.Scanner(media).useDelimiter("\\A");return String(s.hasNext()?s.next():"")}}(version))

try {
    var mediaManager = ApplicationContextProvider.getBean(IMediaManager)
    var cssClass = 'locationFeedItem profileItem card shadow col-xs-12 col-sm-10 col-md-8 col-lg-6 col-xl-4'
    var cityCountryString = function () {
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
            var city = content.get('City').getValue()
            var country =  content.get('Country').getValue()
            return city == "Various" && country == "Various" 
                ? 'Multiple locations'
                : city + ', ' + country
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
    var programFee = function () {
        var fee = content.get('Program Fee').getValue()
        if (fee == '') {
            return 'Click for more information'
        } else if (!fee.includes('$')) {
            return '$' + fee
        } else {
            return fee
        }
    }()
    var region = function () {
        return content.get('Region').getValue() == '' ? 'Multiple Regions' : content.get('Region').getValue()
    }()
    var metadata = function () {
        var contentArray = []
        // Title
        contentArray.push("Title%:% " + content.get('Name').getValue())
        // Destinations
        contentArray.push("Destination%:% " + content.get('Country').getValue())
        // Region
        contentArray.push("Region%:% " + region)
        // Program Type
        contentArray.push("Program Type%:% " + content.get('Program Type').getValue())
        // Program Fee
        contentArray.push("SU Program Fee%:% " + programFee)
        // Terms
        contentArray.push("Term%:% " + content.get('Terms').getValue())
        // Additional Features
        contentArray.push("Features%:% " + content.get('Additional Features').getValue())
        // Field of Study
        contentArray.push("Field of Study%:% " + content.get('Disciplines').getValue())
        return contentArray.join('%&&&&&%')
    }()
    
    var closeDiv = '</div>'
    writeHtml([
        '<div class="' + cssClass + '" title="' + content.get('Name') + '" id="id' + content.getID() + '" data-position-default="ZoneA" data-position-selected="ZoneA">',
            '<span hidden class="cardMetaData">' + metadata + '</span>',
            '<span class="cardImageWrapper"><img src="' + imageObj.url + '" class="card-img-top" alt="' + imageObj.description + '"></span>',
            '<div class="card-body">',
                '<h3 class="card-title">',
                    '<a href="' + (getValueFromT4Tag("<t4 type='content' name='Name' output='fulltext' use-element='true' filename-element='Name' modifiers='striptags,htmlentities' />")).content + '">' + content.get('Program Title') + '</a>',
                '</h3>',
                '<p class="card-text margin0 subtext">' + cityCountryString + '</p>',
                '<p class="card-text margin0">' + content.get('Program Type') + '</p>',
                '<p class="card-text">Program Fee: ' + programFee + '</p>',
            closeDiv,
            '<div class="card-footer"><span class="locationRegion">' + (content.get('Region').getValue() == '' 
                ? 'Multiple Regions' 
                : content.get('Region').getValue()) + '</span></div>',
        closeDiv
    ])
} catch (error) {
    document.write(error)
}