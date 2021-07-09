/***
 *      @author Pierce Harriz
 *      @file law-organizer-masonry.js
 *      @see Seattle University School of Law Faculty Spotlight Type
 *      law/organizer/masonryfeed
 *
 *      This content layout will be the organizer layout and will link to the
 *      full text layout to reveal the full article.
 *
 *      Document will write once when the page loads
 *
 *      @version 0.1
 */

 importClass(com.terminalfour.publish.utils.BrokerUtils)

 function getValueFromTag (tag) {
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
     for(var i = 0; i < array.length; i++) {
         document.write(array[i])
     }
 }
 
 function appendToTag(htmlTag, type, html, id) {
     var newScript = "var element = document.createElement('"+type+"');element.innerHTML = '"+html+"';element.id = '"+id+"';if(!document.getElementById(element.id)){document.getElementsByTagName('"+htmlTag+"')[0].append(element);};"
     var scriptTag = "<script id='tempScript'>"+newScript+"var tempScript = document.getElementById('tempScript'); tempScript.parentNode.removeChild(tempScript)</script>"
     document.write(scriptTag)
 }
 
 try {
     var dict = {
         contentID: getValueFromTag("<t4 type='meta' meta='content_id' />"),
         anchorTag: getValueFromTag("<t4 type='meta' meta='html_anchor' />"),
         profileImageUrl: getValueFromTag("<t4 type='content' name='Photo' output='normal' formatter='path/*' />"),
         profileImageAlt: getValueFromTag("<t4 type='content' name='Name of student' output='normal' />"),
         contentFirstName: getValueFromTag("<t4 type='content' name='First name' output='normal' modifiers='striptags,htmlentities' />"),
         contentLastName: getValueFromTag('<t4 type="content" name="Last name" output="normal" modifiers="striptags,htmlentities" />'),
         contentGraduatingClassNumber: getValueFromTag('<t4 type="content" name="Seattle U Law Graduating class" output="selective-output"' + 
             'modifiers="striptags,htmlentities,nl2br" format="\'<span>$value</span>" />'),
         contentTextIntro: getValueFromTag('<t4 type="content" name="Introductory text" output="selective-output"' + 
             'modifiers="medialibrary,nav_sections" format="<div class=&quot;Introductory text&quot;>$value</div>" />'),
         contentEmail: getValueFromTag("<t4 type='content' name='Email' output='normal' modifiers='striptags' />"),
         readMoreLink: getValueFromTag('<t4 type="content" name="Read more" output="fulltext" use-element="true" filename-element="Read more" modifiers="nav_sections" />')
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
         var mainWrapper = '<div class="studentDiaryCardWrapper profileItem card shadow col-xs-12 col-sm-10 col-md-8 col-lg-6 col-xl-4" id="id'+ dict.contentID.content +'" data-position-default="Main" data-position-selected="Main" aria-labelledby="label'+ dict.contentID.content +'">'
         var standardContent = '<div class="studentDiaryNamePhotoIntrotext">'
         var img = '<img src="'+ dict.profileImageUrl.content +'" class="" alt="Photo of '+ dict.contentID.content +'" />'
         var h3Wrapper = '<h3 class="studentDiaryNameOfStudent">'
         var pReadMeWrapper = "<p class=\"readDiary\">"
         var readMoreText = '<a href="'+ dict.readMoreLink.content +'">Read '+ dict.contentFirstName.content +' \'s diary</a>'
         var pEmailWrapper = '<p class="studentDiaryCardEmail"><span class="fas fa-envelope"></span>&nbsp;'
         var mailToLink = '<a href="mailto:'+ dict.contentEmail.content +'">'+ dict.contentEmail.content +'</a>'
         var clearFix = '<div class="clearfix"></div>'
         var closeH3 = "</h3>"
         var closeP = "</p>"
         var closeDiv = "</div>"
         var styles = '.flexContainer {background: #ffffff;display: flex;flex-wrap: wrap;justify-content: center;align-items: stretch;}.studentDiaryCardWrapper {box-sizing: border-box;width: 100%;padding: 15px !important;xoutline: 1px solid #333;display: flex;align-items: stretch;}.studentDiaryNamePhotoIntrotext {background: #f7f7f7;padding: 15px;overflow: hidden;}.studentDiaryNamePhotoIntrotext img {border-radius: 50%;}.studentDiaryNamePhotoIntrotext h3 {text-align: center;margin-top: 0;margin-bottom: 20px;font-size: 2.1rem;}a.photo-nameLink:link {text-decoration: none }a.photo-nameLink:hover {text-decoration: underline;}.primaryContentWrapper {flex: none;width: 100%;}@media only screen and (min-width : 425px) {.studentDiaryNamePhotoIntrotext img {max-width: 300px;display: block;margin: 0 auto;}}@media only screen and (min-width : 768px) {.studentDiaryCardWrapper {width: 50%;}}'
         // appendToTag("head", "style", styles, "diariesExtraStyles")
 
         writeHtml([
             mainWrapper,
             dict.anchorTag.content,
             standardContent,
             img,
             h3Wrapper,
             dict.contentFirstName.content + " ",
             dict.contentLastName.content + " ",
             dict.contentGraduatingClassNumber.content,
             closeH3,
             dict.contentTextIntro.content,
             pReadMeWrapper,
             readMoreText,
             closeP,
             pEmailWrapper,
             mailToLink,
             closeP,
             closeDiv,
             clearFix,
             closeDiv
         ])
     }
 } catch(e) {
     document.write(e.message + '\n'+ e.stack)
 }