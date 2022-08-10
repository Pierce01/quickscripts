// PSL
var version="23.0";eval(function(version){var minImports=JavaImporter(com.terminalfour.media.IMediaManager,com.terminalfour.spring.ApplicationContextProvider,com.terminalfour.version.Version);with(minImports){var mm=ApplicationContextProvider.getBean(IMediaManager),media=mm.get(3101315,language,new Version(version)).getMedia(),s=new java.util.Scanner(media).useDelimiter("\\A");return String(s.hasNext()?s.next():"")}}(version))

String.prototype.wrap = function (tags) {
    if (!Array.isArray(tags)) {
        tags = [tags]
    }
    return tags.map(val => {
        return val.attributes ? ('<' + val.tag + ' ' + val.attributes + '>') : ('<' + val + '>')}).join('') 
            + this.toString() 
            + tags.reverse().map(val => { return '</' + (val.attributes ? val.tag : val) + '>' }).join('')
}

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
        var num = 0;
        var values = []
        var fee = '' + content.get('Program Fee').publish()
        var feeParse = fee.split('|').map(entry => {
            entry = entry.split(': ')
            if (entry.length > 1) {
                num = 1
            }
            if (entry[num] == '') {
                entry[num] = '$N/A'
            } else if (!entry[num].includes('$')) {
                entry[num] = '$' + entry[num]
            }
            values.push(entry[num])
            return entry.join(': ')
        })
        return { html: num ? makeList(feeParse.join('|'), '|') : feeParse.join('|'), values:values.join('/')}
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
        contentArray.push("SU Program Fee%:% " + programFee.values)
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
                programFee.html.indexOf('li') > -1 ? ('Program Fee: '.wrap([{tag: 'p', attributes: 'class="card-text margin0"'}])) + programFee.html : ('Program Fee: ' + programFee.html).wrap([{tag: 'p', attributes: 'class="card-text"'}]),
            closeDiv,
            '<div class="card-footer"><span class="locationRegion">' + (content.get('Region').getValue() == '' 
                ? 'Multiple Regions' 
                : content.get('Region').getValue()) + '</span></div>',
        closeDiv
    ])
} catch (error) {
    document.write(error)
}

function makeList (str, del) {
    var arr
    if (!del) del = ','
    // Allows us to parse both types of strings in the context of T4
    try {
        arr = ('' + str.getValue()).split(del)
    } catch (e) {
        arr = str.split(del)
    }
    for (let i = 0; i < arr.length; i++) {
        arr[i] = ('' + arr[i]).wrap('li')
    }
    return arr.join('')
}