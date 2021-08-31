/***
 *      @author Pierce Harriz
 *      @file law-horizontal-card.js
 *      @see Seattle University School of Law Horizontal Card content type.
 *      law/text/html
 *
 *      Document will write once when the page loads
 *
 *      @version 1.4
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
        imageOnSite: getValueFromTag('<t4 type="content" name="Image (Media Library)" output="normal" formatter="path/*" />'),
        imageAltText: getValueFromTag('<t4 type="content" name="Image Alt Text" output="normal" modifiers="htmlentities" />'),
        customClass: getValueFromTag("<t4 type='content' name='Custom Class Names (Card Wrapper)' output='normal' modifiers='striptags,htmlentities' />"),
        customClassImg: getValueFromTag("<t4 type='content' name='Custom Class Names (Image)' output='normal' modifiers='striptags,htmlentities' />"),
        linkName: getValueFromTag("<t4 type='content' name='Link Name' output='normal' modifiers='striptags,htmlentities' />"),
        onSiteLink: getValueFromTag('<t4 type="content" name="Internal Link" output="linkurl" modifiers="nav_sections" />'),
        offSiteLink: getValueFromTag('<t4 type="content" name="Off-site Link" output="normal" modifiers="striptags,htmlentities" />'),
        toolTipText: getValueFromTag('<t4 type="content" name="Title Attribute" output="normal" modifiers="htmlentities" />'),
        imageRow: getValueFromTag('<t4 type="content" name="Image Row Column Width" output="normal" modifiers="htmlentities" />'),
        bodyRow: getValueFromTag('<t4 type="content" name="Body Row Column Width" output="normal" modifiers="htmlentities" />')
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
        var imageUrl = dict.imageOffSite.content == "" ? dict.imageOnSite.content : dict.imageOffSite.content
        var toolTip = dict.toolTipText.content == "" ? linkUrl : dict.toolTipText.content
        var row = {
            image: dict.imageRow.content == '' ? 4 : dict.imageRow.content,
            body: dict.bodyRow.content == '' ? 8: dict.bodyRow.content
        }

        // Building HTML
        var closeDiv = '</div>'
        var hCardWrapper = '<div class="horizontalCard card mb-3 standardContent '+ dict.customClass.content +'">'
        var hCard = '<div class="row g-0">'
        var hCardImageWrapper = '<div class="col-lg-' + row.image +' text-center">'
        var imageHtml = '<img src="' + (imageUrl == "" ? getValueFromTag('<t4 type="media" formatter="path/*" id="1752501" />').content : imageUrl) 
            + '" class="img-fluid'+ (dict.customClassImg.content == "" ? "" : (" " + dict.customClassImg.content)) +'" alt="'+ dict.imageAltText.content +'">'
        var hCardBodyWrapper = '<div class="col-lg-'+ row.body +'">'
        var hCardBody = '<div class="card-body h-100 d-flex flex-column">'
        var hCardTitle = '<h2 class="card-title">' + dict.title.content + '</h2>'
        var hCardText = dict.text.content
        var hCardFooter = '<div class="cardFooter mt-auto">'
        var hCardFooterContent = '<a class="btn btn-lg mx-lg-0 px-4" href="' + linkUrl + '" title="'+ toolTip +'">' + linkName + '</a>'

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