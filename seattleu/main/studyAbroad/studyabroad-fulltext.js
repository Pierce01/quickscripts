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
    // Until a new template is generated, we have to do this.
    var styles = '.blueBox,.clearBoxBlue{padding:20px!important}.margin2{margin:3px!important}.marginTop4{margin-top:4px!important}.SAWrapper .card{border:0!important;background-color:#f7f7f7!important;margin:0 auto 20px!important;max-width:100%!important}.SAWrapper .card-text{font-size:1.2rem}.SAWrapper{margin-bottom:100px}.textBodyWrapper{max-width:78%!important;margin:0 20px 0 0!important}@media (min-width:1200px){.textBodyWrapper{max-width:72%!important;margin:0 auto 0 0!important}}.sideBox{float:right!important;font-size:1rem!important;height:fit-content!important}.contentWrapper{display:flex!important;margin:0 auto!important}.blueBox{background-color:#088099!important;color:#fff!important;margin-bottom:20px!important}.clearBoxBlue{border:2px solid #088099!important}.sideBoxWrapper{display:grid!important;grid-template-rows:auto auto 1fr 1fr;grid-gap:10px;max-width:270px!important}#map{width:100%;height:400px}.blueBox a{width:100%!important;white-space:nowrap!important;overflow:hidden!important;text-overflow:ellipsis!important;text-align:left!important}.blueBox a:not(:last-child){margin-bottom:15px}.SAWrapper .btn{border:1px solid #12859d;border-radius:0!important;width:30%;font-size:1.2vw}.SAWrapper .btn:hover{color:#9e9e9e}.SAWrapper img{width:100%;object-fit:cover}.textBody>p{font-size:1.3rem;line-height:normal}.SAWrapper>div.contentWrapper>div.textBodyWrapper>div:nth-child(2)>ul>li>ul{margin-top:5px}.textBody ol li,.textBody ul li{font-size:1.2rem!important}.SAWrapper li:not(:last-child){margin-bottom:5px}.SAWrapper .dropdown-content li{margin-bottom:0}h3{font-size:1.5rem!important}h2{font-size:1.75rem!important}h1{font-size:2rem!important}.redBold,.textBody h2{font-weight:520!important;color:#a00!important}.dropbtn{color:#000;border:none;background:0 0}.dropbtn::after{content:"▾"}.dropdownWrap{position:relative;display:inline-block}.dropdown-content{display:none;position:absolute;background-color:#f1f1f1;min-width:160px;box-shadow:0 8px 16px 0 rgba(0,0,0,.2);z-index:1;font-size:.7rem!important}.dropdown-content a{color:#000;padding:12px 16px;text-decoration:none;display:block}.dropdown-content a:hover{background-color:#ddd}.dropdownWrap:hover .dropdown-content{display:block}.dropdownWrap:hover .dropbtn::after{content:"▴"}.dropdownWrap li{list-style:none;text-indent:0;padding-left:0}.SAWrapper button.dropbtn{font-size:initial}.SAWrapper a:not([href]){position:inherit;visibility:visible}.SAWrapper p.card-text.text-muted{margin-top:10px!important}@media only screen and (min-width:1200px){.SAWrapper p.card-text.text-muted{margin-bottom:10px!important;position:absolute!important;bottom:0!important}}a.btn.marginTop4.redBold{overflow:hidden;white-space:nowrap;min-width:fit-content}@media (min-width:1440px){.sideBox a.btn{font-size:1vw!important}}@media (max-width:992px){.sideBoxWrapper,.textBodyWrapper{max-width:100%!important}.contentWrapper{display:block!important}.textBodyWrapper{margin:0!important}#map{margin-bottom:1rem}}@media (max-width:575px){.SAWrapper{margin:10px!important}}.blueBox a{background-color:#333;color:#fff;border:0!important;display:inline-block!important;position:relative!important;vertical-align:top!important;padding-right:50px}.blueBox a:after{background-image:url(data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgODAgODAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjEwMCI+CiAgICA8cGF0aCBkPSJNIDIwIDQwIEwgNjAgNDAiIHN0cm9rZS13aWR0aD0iNCIgc3Ryb2tlPSIjMDQ4OTlkIiAvPgogICAgPHBhdGggZD0iTSA1MCAzMCBMIDYwIDQwIDUwIDUwIiBzdHJva2Utd2lkdGg9IjQiIHN0cm9rZT0iIzA0ODk5ZCIgZmlsbD0ibm9uZSIgLz4KICAgIDxwYXRoIGQ9Ik0gNDAgMzAgTCA1MCA0MCA0MCA1MCIgc3Ryb2tlLXdpZHRoPSI0IiBzdHJva2U9IiMwNDg5OWQiIGZpbGw9Im5vbmUiIC8+CiAgICA8cGF0aCBkPSJNIDMwIDMwIEwgNDAgNDAgMzAgNTAiIHN0cm9rZS13aWR0aD0iNCIgc3Ryb2tlPSIjMDQ4OTlkIiBmaWxsPSJub25lIiAvPgogICAgPGNpcmNsZSBjeD0iNDAiIGN5PSI0MCIgcj0iMzUiIHN0cm9rZS13aWR0aD0iNCIgc3Ryb2tlPSIjMDQ4OTlkIiBmaWxsPSJub25lIiAvPgogIDwvc3ZnPg==);background-position:left!important;background-repeat:no-repeat!important;background-size:25px!important;content:" "!important;display:block!important;height:25px!important;position:absolute!important;right:15px!important;top:calc(50% - 12px)!important;width:25px!important}.SAWrapper h1,.SAWrapper h2,.SAWrapper h3,.SAWrapper h4{font-family:"Roboto Slab",serif!important}'
    appendToHtmlTag('head', 'style', styles, 'saStyles')

    var youtubeRegex = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube(-nocookie)?\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/
    var templateHTMLMulti = '<p><div class="dropdownWrap"><button class="dropbtn" id="dropdownMenuButton">NAME</button><div class="dropdown-content">TARGET</div></div></p>'
    
    var mapInfo = get('Map', (points) => {
        points =  '' + points.publish()
        return points.split('|').map(point => point.trim().split(',').map(_point => parseFloat(_point)))
    })

    if (mapInfo) {
        var script = 'function initialize(){const map=new google.maps.Map(document.getElementById("map"),{center:{lat:LATREPLACE,lng:LNGREPLACE},streetViewControl:0,mapTypeControl:0,fullscreenControl:0,zoom:4});NEWBOUNDS;MARKERREPLACE;FITBOUNDS}window.addEventListener("load",initialize);'
        var center = GetCenterFromDegrees(mapInfo)
        script = script.replace('LATREPLACE', center[0]).replace('LNGREPLACE', center[1]).replace('MARKERREPLACE', function () {
            var str = ''
            for (var i = 0; i < mapInfo.length; i++) {
                str += 'var position ={lat:LATREPLACE,lng:LNGREPLACE};new google.maps.Marker({position,map});BOUNDSEXTEND;'.replace('LATREPLACE', mapInfo[i][0]).replace('LNGREPLACE', mapInfo[i][1]).replace('BOUNDSEXTEND;', function() {
                    return mapInfo.length > 1 ? 'bounds.extend(position);' : ''
                })
            }
            return str
        }()).replace('NEWBOUNDS;', function () {
            return mapInfo.length > 1 ? 'var bounds=new google.maps.LatLngBounds();' : ''
        }()).replace('FITBOUNDS', function () {
            return mapInfo.length > 1 ? 'map.fitBounds(bounds)' : ''
        }())

        document.write('<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAl51bxzHfJlGn9--0VhBtEMpDHknYu6sI"></script>')
        document.write('<script>' + script + '</script>')
    }

    var cityCountryHTML = function () {
        var cities = content.get('City').getValue().split(',').length
        var countries = content.get('Country').getValue().split(',').length

        if (cities > 1 && (countries > 1 || countries == 1)) {
            var templateHTMLMultiCountries = templateHTMLMulti
            return templateHTMLMultiCountries.replace('TARGET', formatLocations(content.get('City').getValue(), content.get('Country').getValue())).replace('NAME', 'Locations')
        } else {
            var city = content.get('City').getValue()
            var country =  content.get('Country').getValue()
            return ('Location: ' + (city == "Various" && country == "Various" 
                ? 'Multiple locations'
                : city + ', ' + country)).wrap([{tag: 'p', attributes: 'class="card-text margin2"'}])
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
    var preReq = function () {
        var gpa = get('GPA Requirement', (obj) => { return 'GPA: ' + obj.publish() })
        var req = get('Pre-Requisites', (obj) => {
            return gpa ? gpa + ', ' + obj.publish() : obj.publish()
        }, () => { return gpa })
        return makeList(req || 'Information not specified')
    }()
    var programFee = function () {
        var num = 0;
        var fee = '' + content.get('Program Fee').publish()
        var feeParse = fee.split('|').map(entry => {
            entry = entry.split(': ')
            if (entry.length > 1) {
                num = 1
            }
            if (entry[num] == '') {
                entry[num] = 'Fee not specified'
            } else if (!entry[num].includes('$')) {
                entry[num] = '$' + entry[num]
            }
            return entry.join(': ')
        })
        return num ? makeList(feeParse.join('|'), '|') : feeParse.join('|')
    }()
    var buddgetArray = function () {
        var budgetArr = []
        var arr = content.getElements()
        for (var i = 0; i < arr.size(); i++) {
            var name = arr.get(i).getName()
            if (name.indexOf('Program Budget') > -1) {
                var value = arr.get(i).getValue()
                if (value.indexOf('https') > -1) budgetArr.push((name.split('-')[1].trim()).wrap([{tag: 'a', attributes: 'target="_blank" rel="noopener noreferrer" href="' + value + '" class="btn"'}]))
            }
        }
        return budgetArr
    }()
    var fieldOfStudyHTML = function () {
        var templateHTML = templateHTMLMulti
        var disciplines = get('Disciplines', (args) => {
            return args.getValue().split(',').map(study => { return study.wrap(['li', 'a']) }).join('')
        }, noInfoFoundPTag)
        return !(disciplines.indexOf('not specified') > -1) ? (templateHTML.replace('TARGET', disciplines).replace('NAME', 'View all Disciplines')) : disciplines
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
                                '<h1 class="card-title redBold">' + get('Program Title') + '</h1>',
                                '<p class="card-text margin2">Program Type: ' + get('Program Type') + '</p>',
                                '<p class="card-text margin2">Program Provider: ' + get('Program Provider') + '</p>',
                                // Needs to be wrapped in a string since T4 will sometimes not auto cast this return value
                                '' + cityCountryHTML + '',
                                '<a href="' + get('Link to Apply') + '" class="btn marginTop4 redBold" style="margin-right: 20px;">APPLY NOW</a>',
                                '<a href="' + get('Program Website') + '" class="btn marginTop4 redBold">PROGRAM WEBSITE</a>',
                                '<p class="card-text text-muted">Application Deadline: ' + get('Application Deadline', null, () => {return "Information not specified"}) + '</p>',
                            closeDiv,
                        closeDiv,
                    closeDiv,
                closeDiv,
            closeDiv,
            '<div class="contentWrapper">',
                '<div class="textBodyWrapper" style="overflow: hidden;">',
                    textBodyWithMargin,
                        '<h2>Program Summary</h2>' + get('Program Summary HTML', (text) => { return text.getValue().wrap('p') }, () => {
                            return get('Program Summary', (text) => { return text.getValue().wrap('p')}, () => {
                                return 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'.wrap('p')
                            })
                        }),
                    closeDiv,
                    (get('Program Type').getValue() == 'SU Faculty Led' && get('Course(s)')) ? [ textBodyWithMargin,
                        'Courses'.wrap('h2'),
                        get('Course(s)', (text) => { return makeList(text, '; ') }), 
                    closeDiv ]: undefined,
                    textBodyWithMargin,
                        '<h2>Housing</h2>' + get('Abroad Housing Included', (text) => {
                            return ('Housing '+ ((''+text.publish()).toLowerCase().indexOf('yes') > -1 ? 'is' : 'is not') +' included' + get('Housing', makeList, () => {
                                return ''
                            })).wrap(['ul', 'li'])
                        }, noInfoFoundPTag),
                    closeDiv,
                    get('Student Testimonial') ? [ textBodyWithMargin,
                        '<h2>Student Testimonial</h2>' + (get('Student Testimonial') + studentContactString).wrap('p'),
                    closeDiv ] : undefined,
                    textBodyWithMargin,
                        '<h2>Program Dates</h2>' + get('Program Dates', (text) => {return makeList(''+text.publish(), '|')}, () => makeList('Information not specified')),
                    closeDiv,
                    textBodyWithMargin,
                        '<h2>Application Steps</h2>' + get('Application Instructions', (text) => {return makeList(''+text.publish(), '|', 'ol')}, () => makeList('Information not specified')),
                        ('If you haven’t joined the Education Abroad Canvas Course yet, ' + ('Join Now!'.wrap([{attributes: 'href="https://forms.office.com/Pages/ResponsePage.aspx?id=UuAQvBywSUiZZ-5-x0_J2CrqSVSnPn9KtGVI66pTpfNUNTZYMTFSWUsxVlIxUFU1TVhLQkEzQlFZSyQlQCN0PWcu"', tag: 'a'}])) + '').wrap('p'),
                    closeDiv,
                    textBodyWithMargin,
                        '<h2>Credits</h2>',
                        '<ul><li><b>Credit Range:</b> ' + get('Credit Range') + '</li>',
                        '<li><b>Credit System:</b> ' + get('Credit System') + '</li>',
                        '<li><b>Credit Conversion Rate:</b> ' + get('Credit Conversion Rate') + '</li>',
                        '<li><b>Quarter Range:</b> ' + get('Quarter Range') + '</li>',
                        '<li><b>Credit Per Course:</b> ' + get('Credit Per Course') + '</li>',
                        '<li><b>Average Courseload:</b> ' + get('Average Courseload') + '</li></ul>',
                    closeDiv,
                    get('Youtube Id') ? [ textBodyWithMargin,
                        'Video'.wrap('h2'),
                        '<iframe width="560" height="315" src="https://www.youtube.com/embed/' + (get('Youtube Id').getValue()).match(youtubeRegex)[6] + '"'
                            + ' title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
                    closeDiv ] : undefined,
                    '<div class="textBody">',
                        '<h2>Map</h2><div id="map"></div>',
                    closeDiv,
                closeDiv,
                '<div class="sideBoxWrapper">',
                    '<div class="sideBox blueBox">',
                        '<h3>Program Overview</h3><p>Program Fee: ' + programFee + '</p>',
                            '<p>Terms Available:' + get('Terms', makeList, noInfoFoundPTag) + '</p>',
                            '<p>Pre-Requisites: ' + preReq + '</p>',
                    closeDiv,
                    buddgetArray.length > 0 ? ['<div class="sideBox blueBox">',
                        '<h3>Budgets by Term</h3>',
                        buddgetArray,
                    closeDiv] : undefined,
                    '<div class="sideBox clearBoxBlue">',
                        '<h3>Model</h3>' + get('Model', makeList, noInfoFoundPTag),
                        '<h3 style="margin-top:16px">Features</h3>'+ get('Additional Features', makeList, noInfoFoundPTag),
                        '<h3 style="margin-top:16px">Fields of study</h3>' + fieldOfStudyHTML,
                    closeDiv,
                closeDiv,
            closeDiv,
        closeDiv
    ])
} catch (e) {
    document.write(e)
}

function makeList (str, del, type) {
    var arr
    if (!del) del = ','
    if (!type) type = 'ul'
    // Allows us to parse both types of strings in the context of T4
    try {
        arr = str.getValue().split(del)
    } catch (e) {
        arr = str.split(del)
    }
    for (let i = 0; i < arr.length; i++) {
        arr[i] = arr[i].wrap('li')
    }
    return arr.join('').wrap(type)
}

function formatLocations (cities, countries) {
    cities = cities.split(',')
    countries = countries.split(',')

    var tempArr = []
    var countriesCounter = 0
    for (var i = 0; i < cities.length; i++) {
        tempArr.push((cities[i] + ', ' + countries[countriesCounter]).wrap(['li', 'a']))
        if (countries[countriesCounter + 1]) {
            countriesCounter++
        }
    }
    return tempArr.join('')
}

function get (name, cbSuccess, cbFail) {
    var rawObject = content.get(name)
    return rawObject.getValue() == '' 
        ? (cbFail ? cbFail() 
                  : null)
        : (cbSuccess ? cbSuccess(rawObject) 
              : rawObject)
}

function noInfoFoundPTag () {
    return 'Information not specified'.wrap('p')
}

// https://stackoverflow.com/questions/6671183/calculate-the-center-point-of-multiple-latitude-longitude-coordinate-pairs
function GetCenterFromDegrees(data) {       
    if (!(data.length > 0)){ return false; }
    var num_coords = data.length;
    var X = 0.0;
    var Y = 0.0;
    var Z = 0.0;
    for(i = 0; i < data.length; i++){
        var lat = data[i][0] * Math.PI / 180;
        var lon = data[i][1] * Math.PI / 180;
        var a = Math.cos(lat) * Math.cos(lon);
        var b = Math.cos(lat) * Math.sin(lon);
        var c = Math.sin(lat);
        X += a;
        Y += b;
        Z += c;
    }
    X /= num_coords;
    Y /= num_coords;
    Z /= num_coords;
    var lon = Math.atan2(Y, X);
    var hyp = Math.sqrt(X * X + Y * Y);
    var lat = Math.atan2(Z, hyp);
    var newX = (lat * 180 / Math.PI);
    var newY = (lon * 180 / Math.PI);
    return new Array(newX, newY);
}