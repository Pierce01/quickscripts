/***
 *      @author Pierce Harriz
 *      @file law-horizontal-card.js
 *      @see Seattle University School of Law Horizontal Card content type.
 *      law/text/html
 *
 *      Document will write once when the page loads
 *
 *      @version 1.0
 */
importClass(com.terminalfour.publish.utils.BrokerUtils)

function getValueFromTag(tag) {
    try {
        return {
            isError: false,
            content: BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, tag)
        }
    } catch (error) {
        return {
            isError: true,
            message: error.stack
        }
    }
}

function writeHtml(array) {
    for (var i = 0; i < array.length; i++) {
        if (array[i]) document.write(array[i])
    }
}

try {
    var dict = {
        title: getValueFromTag("<t4 type='content' name='Title' output='normal' modifiers='striptags,htmlentities' />"),
        text: getValueFromTag('<t4 type="content" name="Content" output="normal" modifiers="medialibrary,nav_sections" />'),
        imageOffSite: getValueFromTag("<t4 type='content' name='Image' output='imageurl' />"),
        imageOnSite: getValueFromTag("<t4 type='content' name='Image (Media Library)' output='imageurl' />"),
        customClass: getValueFromTag("<t4 type='content' name='Custom Class Names' output='normal' modifiers='striptags,htmlentities' />"),
        linkName: getValueFromTag("<t4 type='content' name='Link Name' output='normal' modifiers='striptags,htmlentities' />"),
        onSiteLink: getValueFromTag('<t4 type="content" name="On-site Link (Priority)" output="linkurl" modifiers="nav_sections" />'),
        offSiteLink: getValueFromTag('<t4 type="content" name="Off-site Link" output="normal" modifiers="striptags,htmlentities" />'),
    }

    // Get all the errors returned from getValueFromTag and put them in errorString.
    var errorString = ''
    var keys = Object.keys(dict)
    for (var i = 0; i < keys.length; i++) {
        if (dict[keys[i]].isError) {
            errorString += '' + keys[i] + ' - ' + dict[keys[i]].message + '\n'
        }
    }

    if (errorString) {
        document.write('Faild to get needed profile information from the following:\n')
        document.write('<pre>' + errorString + '</pre>')
    } else {
        // Defaults
        var linkName = dict.linkName.content == "" ? "Read More" : dict.linkName.content
        var linkUrl = dict.onSiteLink.content == "" ? dict.offSiteLink.content : dict.onSiteLink.content
        var imageUrl = dict.imageOffSite.content == "" ? dict.onSiteLink.content : dict.imageOffSite.content

        // Building HTML
        var closeDiv = '</div>'
        var hCardWrapper = '<div class="horizontalCard card mb-3 standardContent">'
        var hCard = '<div class="row g-0">'
        var hCardImageWrapper = '<div class="col-md-4 text-center">'
        var imageHtml = '<img src="' + (imageUrl == "" ? getValueFromTag('<t4 type="media" formatter="path/*" id="1752501" />').content : imageUrl) + '" class="img-fluid rounded" alt="...">'
        var hCardBodyWrapper = '<div class="col-md-8">'
        var hCardBody = '<div class="card-body h-100 d-flex flex-column">'
        var hCardTitle = '<h2 class="card-title">' + dict.title.content + '</h2>'
        var hCardText = dict.text.content
        var hCardFooter = '<div class="cardFooter mt-auto">'
        var hCardFooterContent = '<a class="btn btn-sm mx-lg-0 px-4" href="' + linkUrl + '">' + linkName + '</a>'

        writeHtml([
            hCardWrapper,
            hCard,
            hCardImageWrapper,
            imageHtml,
            closeDiv,
            hCardBodyWrapper,
            hCardBody,
            hCardTitle,
            hCardText,
            // If there is no link specified, then the footer will not be added.
            linkUrl == "" ? null : hCardFooter,
            linkUrl == "" ? null : hCardFooterContent,
            linkUrl == "" ? null : closeDiv,
            closeDiv,
            closeDiv,
            closeDiv,
            closeDiv
        ])
    }
} catch (e) {
    document.write(e.message + '\n' + e.stack)
}