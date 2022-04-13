// PSL
var version="21.0";eval(function(version){var minImports=JavaImporter(com.terminalfour.media.IMediaManager,com.terminalfour.spring.ApplicationContextProvider,com.terminalfour.version.Version);with(minImports){var mm=ApplicationContextProvider.getBean(IMediaManager),media=mm.get(3101315,language,new Version(version)).getMedia(),s=new java.util.Scanner(media).useDelimiter("\\A");return String(s.hasNext()?s.next():"")}}(version))

try {
    var mediaManager = ApplicationContextProvider.getBean(IMediaManager)
    // Until a new template is generated, we have to do this.
    var styles = '.margin2{margin:3px!important}.marginTop4{margin-top:4px!important}.SAWrapper .card{border:0!important;background-color:#f7f7f7!important;margin:0 auto!important;margin-bottom:20px!important}.sideBox li{list-style-type:disc;list-style-position:inside;text-indent:-1em;padding-left:1em}.textBodyWrapper{max-width:64%!important;margin:0 auto!important;margin-left:0!important}.sideBox{float:right!important}.contentWrapper{display:flex!important;max-width:50%!important;margin:0 auto!important}.blueBox{background-color:#088099!important;padding:20px!important;color:#fff!important;margin-bottom:20px!important}.clearBoxBlue{border-color:#088099!important;border-width:2px!important;border-style:solid!important;padding:20px!important}.sideBoxWrapper{display:grid!important;grid-template-rows:auto auto 1fr 1fr 1fr auto auto;grid-gap:10px;max-width:230px!important}#map{width:100%;height:400px}.SAWrapper .btn{border-width:1px!important;border-style:solid!important;border-color:#12859d!important;border-radius:0!important;width:40%!important;font-size:1.6rem}.SAWrapper img{width:100%;object-fit:cover}.textBody>li{font-size:1.6rem!important}.redBold,.textBody h3{font-weight:700!important;color:#ed1c24!important}.dropbtn{color:#000;border:none;background:0 0}.dropbtn::after{content:"▾"}.dropdownWrap{position:relative;display:inline-block}.dropdown-content{display:none;position:absolute;background-color:#f1f1f1;min-width:160px;box-shadow:0 8px 16px 0 rgba(0,0,0,.2);z-index:1}.dropdown-content a{color:#000;padding:12px 16px;text-decoration:none;display:block}.dropdown-content a:hover{background-color:#ddd}.dropdownWrap:hover .dropdown-content{display:block}.dropdownWrap:hover .dropbtn::after{content:"▴"}.dropdownWrap li{list-style:none}.SAWrapper button.dropbtn{font-size:initial}'
    var script = 'function initialize(){new google.maps.Map(document.getElementById("map"),{center:{lat:47.610409,lng:-122.319385},streetViewControl:!1,mapTypeControl:!1,fullscreenControl:!1,zoom:13})}google.maps.event.addDomListener(window,"load",initialize);'
    appendToHtmlTag('head', 'style', styles, 'saStyles')
    document.write('<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAl51bxzHfJlGn9--0VhBtEMpDHknYu6sI"></script>')
    document.write('<script>' + script + '</script>')

    var cityCountryHTML = function () {
        // Using getValue here since technically whats being returned is typed as an object rather then a string.
        // The reason why I'm not using getValue for the other get statements is because they display properly
        // without calling the method, but just can't call string related properties.
        var cities = content.get('City').getValue().split(',').length
        var countries = content.get('Country').getValue().split(',').length

        var templateHTMLMulti = '<p><div class="dropdownWrap"><button class="dropbtn" id="dropdownMenuButton">Locations</button><div class="dropdown-content">TARGET</div></div></p>'
        if (cities > 1 && (countries > 1 || countries == 1)) {
            return templateHTMLMulti.replace('TARGET', formatLocations(content.get('City').getValue(), content.get('Country').getValue()))
        } else {
            return '<p class="card-text margin2">' + content.get('City').getValue() + ', ' + content.get('Country').getValue() + '</p>'
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
    var studentContactString = function () {
        var student = content.get('Student Testimonial contact')
        return student == '' ? '' : '- ' + student
    }()
    var preReq = content.get('Pre-Requisites').getValue() == '' ? makeList('None specified') : makeList(content.get('Pre-Requisites'))
    var programFee = function () {
        var fee = content.get('Program Fee').getValue()
        if (fee == '') {
            return 'Fee not specified'
        } else if (!fee.includes('$')) {
            return '$' + fee
        } else {
            return fee
        }
    }()
    
    var closeDiv = '</div>'
    var textBodyWithMargin = '<div class="textBody" style="margin-bottom: 1rem;">'
    writeHtml([
        '<div class="SAWrapper">',
            '<div calss="titleCard position-relative">',
                '<div class="card mb-3" style="max-width: 50%;">',
                    '<div class="row g-0">',
                        '<div class="col-md-4 text-center">',
                            '<img src="' + imageObj.url + '" class="img-fluid" alt="' + imageObj.description + '">',
                        closeDiv,
                        '<div class="col-md-8">',
                            '<div class="card-body">',
                                '<h2 class="card-title redBold">' + content.get('Program Title') + '</h2>',
                                '<p class="card-text margin2">' + content.get('Program Type') + '</p>',
                                '<p class="card-text margin2">' + content.get('Program Provider') + ' / ' + content.get('Contact Name') + ' (' + content.get('Contact Email') + ')</p>',
                                cityCountryHTML,
                                '<a href="' + content.get('Program Website') + '" class="btn marginTop4 redBold" style="margin-right: 20px;">APPLY NOW</a>',
                                '<a href="#" class="btn marginTop4 redBold">CUSTOM TEXT</a>',
                                '<p class="card-text text-muted" style="margin-top: 10px;">Application Deadline: ' + content.get('Application Deadline') + '</p>',
                            closeDiv,
                        closeDiv,
                    closeDiv,
                closeDiv,
            closeDiv,
            '<div class="contentWrapper">',
                '<div class="textBodyWrapper" style="overflow: hidden;">',
                    textBodyWithMargin,
                        '<h3>Program Summary</h3><p>' + content.get('Program Summary') + '</p>',
                    closeDiv,
                    textBodyWithMargin,
                        '<h3>Housing</h3>' + makeList(content.get('Housing')),
                    closeDiv,
                    textBodyWithMargin,
                        '<h3>Student Testimonial</h3><p>' + content.get('Student Testimonial') + studentContactString + '</p>',
                    closeDiv,
                    textBodyWithMargin,
                        '<h3>Application Steps</h3>' + makeList(content.get('Application Instructions')),
                    closeDiv,
                    '<div class="textBody">',
                        '<h3>Map</h3><div id="map"></div>',
                    closeDiv,
                closeDiv,
                '<div class="sideBoxWrapper">',
                    '<div class="sideBox blueBox">',
                        '<h4>Program Overview</h4><p>Program Fee: ' + programFee + '</p>',
                            '<p>Terms Available:' + makeList(content.get('Terms')) + '</p>',
                            '<p>GPA: ' + content.get('GPA Requirement') + '</p>',
                            '<p>Pre-Requisites: ' + preReq + '</p>',
                    closeDiv,
                    '<div class="sideBox blueBox">',
                        '<h4>Budgets by Term</h4>',
                        // Content needs to go here
                    closeDiv,
                    '<div class="sideBox clearBoxBlue">',
                        '<h4>Credits</h4>',
                        '<li>' + content.get('Credit Range') + ' (' + content.get('Credit System')  + ')</li>',
                        '<h4>Features</h4>'+ makeList(content.get('Additional Features')),
                        '<h4>Fields of study</h4>',
                        '<li>${fos here}</li>',
                    closeDiv,
                closeDiv,
            closeDiv,
        closeDiv
    ])
} catch (e) {
    document.write(e)
}

function makeList (str) {
    var arr
    // Allows us to parse both types of strings in the context of T4
    try {
        arr = str.getValue().split(',')
    } catch (e) {
        arr = str.split(',')
    }
    for (let i = 0; i < arr.length; i++) {
        arr[i] = '<li>' + arr[i] + '</li>'
    }
    return arr.join('')
}

function formatLocations (cities, countries) {
    cities = cities.split(',')
    countries = countries.split(',')

    var tempArr = []
    var countriesCounter = 0
    for (var i = 0; i < cities.length; i++) {
        tempArr.push('<li><a>' + cities[i] + ', ' + countries[countriesCounter] + '</a></li>')
        if (countries[countriesCounter + 1]) {
            countriesCounter++
        }
    }
    return tempArr.join('')
}