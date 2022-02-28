// PSL
var version="21.0";eval(function(version){var minImports=JavaImporter(com.terminalfour.media.IMediaManager,com.terminalfour.spring.ApplicationContextProvider,com.terminalfour.version.Version);with(minImports){var mm=ApplicationContextProvider.getBean(IMediaManager),media=mm.get(3101315,language,new Version(version)).getMedia(),s=new java.util.Scanner(media).useDelimiter("\\A");return String(s.hasNext()?s.next():"")}}(version))

try {
    var mediaManager = ApplicationContextProvider.getBean(IMediaManager)
    // Until a new template is generated, we have to do this.
    var styles = '.margin2{margin:3px!important}.marginTop4{margin-top:4px!important}.SAWrapper .card{border:0!important;background-color:#f7f7f7!important;margin:0 auto!important;margin-bottom:20px!important}.sideBox li{list-style-type:disc;list-style-position:inside;text-indent:-1em;padding-left:1em}.textBodyWrapper{max-width:64%!important;margin:0 auto!important;margin-left:0!important}.sideBox{float:right!important}.contentWrapper{display:flex!important;max-width:50%!important;margin:0 auto!important}.blueBox{background-color:#088099!important;padding:20px!important;color:#fff!important;margin-bottom:20px!important}.clearBoxBlue{border-color:#088099!important;border-width:2px!important;border-style:solid!important;padding:20px!important}.sideBoxWrapper{display:grid!important;grid-template-rows:auto auto 1fr 1fr 1fr auto auto;grid-gap:10px;max-width:230px!important}#map{width:100%;height:400px}.SAWrapper .btn{border-width:1px!important;border-style:solid!important;border-color:#12859d!important;border-radius:0!important;width:40%!important;font-size:1.6rem}.SAWrapper img{width:100%;object-fit:cover}.textBody>li{font-size:1.6rem}.redBold,.textBody h3{font-weight:700;color:#ed1c24}'
    var script = 'function initialize(){new google.maps.Map(document.getElementById("map"),{center:{lat:47.610409,lng:-122.319385},streetViewControl:!1,mapTypeControl:!1,fullscreenControl:!1,zoom:13})}google.maps.event.addDomListener(window,"load",initialize);'
    appendToHtmlTag('head', 'style', styles, 'saStyles')
    document.write('<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAl51bxzHfJlGn9--0VhBtEMpDHknYu6sI"></script>')
    document.write('<script>' + script + '</script>')

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
    var studentContactString = function () {
        var student = content.get('Student Testimonial contact')
        return student == '' ? '' : '- ' + student
    }()

    document.write(
    '<div class="SAWrapper"><div calss="titleCard position-relative"><div class="card mb-3" style="max-width: 50%;">' +
    '<div class="row g-0"><div class="col-md-4 text-center"><img src="' + imageObj.url + '" class="img-fluid" alt="' + imageObj.description + '"> </div> <div class="col-md-8"> <div class="card-body">' +
    '<h2 class="card-title redBold">' + content.get('Program Title') + '</h2> <p class="card-text margin2">' + content.get('Program Type') + 
    '</p><p class="card-text margin2">' + content.get('Program Provider') + ' / ' + content.get('Contact Name') + ' (' + content.get('Contact Email') + ')</p>' +
    '<p class="card-text margin2">' + cityCountryString + '</p><a href="' + content.get('Program Website') + '" class="btn marginTop4 redBold" style="margin-right: 20px;">APPLY NOW</a><a href="#" class="btn marginTop4 redBold">CUSTOM TEXT</a>' +
    '<p class="card-text text-muted" style="margin-top: 10px;">Application Deadline: ' + content.get('Application Deadline') +'</p></div></div></div></div></div><div class="contentWrapper"><div class="textBodyWrapper" style="overflow: hidden;">' +
    '<div class="textBody" style="margin-bottom: 1rem;"><h3>Program Summary</h3><p>' + content.get('Program Summary') + '</p></div><div class="textBody" style="margin-bottom: 1rem;">' +
    '<h3>Housing</h3>' + makeList(content.get('Housing')) + '</div><div class="textBody" style="margin-bottom: 1rem;"><h3>Student Testimonial</h3><p>' + content.get('Student Testimonial') + 
    '' + studentContactString + '</p></div><div class="textBody" style="margin-bottom: 1rem;"><h3>Application Steps</h3>' + makeList(content.get('Application Instructions')) + '</div><div class="textBody">' +
    '<h3>Map</h3><div id="map"></div></div></div><div class="sideBoxWrapper"><div class="sideBox blueBox"><h4>Program Overview</h4><p>Program Fee: ' + content.get('Program Fee') + '</p>' +
    '<p>Terms Available:' + makeList(content.get('Terms')) + '</p><p>GPA: ' + content.get('GPA Requirement') + '</p><p>Pre-Requisites: ' + makeList(content.get('Pre-Requisites')) + 
    '</p></div><div class="sideBox blueBox"><h4>Budgets by Term</h4></div><div class="sideBox clearBoxBlue"><h4>Credits</h4><li>' + content.get('Credit Range') + ' (' + content.get('Credit System')  + ')</li><h4>Features</h4>'+ makeList(content.get('Additional Features')) +
    '<h4>Fields of study</h4><li>${fos here}</li></div></div></div></div>'
    )
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