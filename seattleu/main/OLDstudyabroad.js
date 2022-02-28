// PSL
var version="21.0";eval(function(version){var minImports=JavaImporter(com.terminalfour.media.IMediaManager,com.terminalfour.spring.ApplicationContextProvider,com.terminalfour.version.Version);with(minImports){var mm=ApplicationContextProvider.getBean(IMediaManager),media=mm.get(3101315,language,new Version(version)).getMedia(),s=new java.util.Scanner(media).useDelimiter("\\A");return String(s.hasNext()?s.next():"")}}(version))
importClass(com.terminalfour.navigation.IServerSideLinkManager)
importClass(com.terminalfour.hierarchy.IHierarchyManager)
importClass(com.terminalfour.content.IContentManager)
importClass(com.terminalfour.utils.Base64)

try {
    var ssLinkManager = ApplicationContextProvider.getBean(IServerSideLinkManager)
    var hierarchyManager = ApplicationContextProvider.getBean(IHierarchyManager)
    var contentManager = ApplicationContextProvider.getBean(IContentManager)
    var mediaManager = ApplicationContextProvider.getBean(IMediaManager)
    var ssid = Number(String(content.get('Items')).match(/sslink_id="(\d+)"/)[1])
    var ssLink = ssLinkManager.get(ssid, section.getID(), content.getID(), language)
    var section = hierarchyManager.get(ssLink.getToSectionID())
    var sContentList = section.getContentSections()
    
    document.write('<div class="studyAbroadOrganizerLocation d-flex flex-column flex-md-row flex-wrap justify-content-center card-group">')
    var cssClass = 'locationFeedItem profileItem card shadow col-xs-12 col-sm-10 col-md-8 col-lg-6 col-xl-4'
    for(var i = 0; i < sContentList.size(); i++) {
        try {
            // Get content entry
            var targetContent = contentManager.get(section.getContentSections().get(i).getContentID(), language)
            var imageStr = function () {
                if (targetContent.get('Web Image ID number') == '') {
                    return targetContent.get('Web Image URL')
                } else {
                    return Base64.encode(getMedia(targetContent.get('Web Image ID number')).readAllBytes())
                }
            }()
            var imageDescription = function () {
                if (targetContent.get('Alt Text') == '' && !(targetContent.get('Web Image ID Number') == '')) {
                    return mediaManager.get(targetContent.get('Web Image ID number'), language).getDescription()
                } else {
                    return targetContent.get('Alt Text')
                }
            }()

            document.write('<div id="source" class="' + cssClass + '" title="' + targetContent.get('Name') + '" id="id' + targetContent.getID() + 
            '" data-position-default="ZoneA" data-position-selected="ZoneA">' + 
            '<span class="cardImageWrapper"><img src="data:image/jpeg;base64,' + imageStr + '" class="card-img-top"' +
            ' alt="' + imageDescription + '"></span> <div class="card-body"><h3 class="card-title">' + 
            '<a href="' + targetContent.get('Program Website') + '">' + targetContent.get('Program Title') + '</a></h3>' +
            '<p class="card-text margin0 subtext">' + targetContent.get('City') + ', ' + targetContent.get('Country') + 
            '</p> <p class="card-text margin0">' + targetContent.get('Program Type') + '</p> <p class="card-text">' + targetContent.get('Program Fee') + '</p>' + 
            '</div><div class="card-footer"><span class="locationRegion">' + targetContent.get('Region') + '</span></div></div>')
        } catch (e) {
            document.write(e)
        }
    }
    document.write('</div>')
} catch (error) {
    document.write(error)
}