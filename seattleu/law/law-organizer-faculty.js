// Inital rewrite of Victor's old code.


/***
 *      @author Pierce Harriz
 *      @file organizer.faculty.js
 *      @see Seattle University School of Law Faculty Profile Type
 *      law/organizer/facultyList/
 *
 *      This content layout will be the organizer layout and will link to the
 *      full text layout to reveal the full article.
 *
 *      Document will write once when the page loads
 *
 *      @version 4.0
 */

// Outside of try catch as both will not cause errors. Following StandardJS style guide.
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
      message: error.message
    }
  }
}

try {
  // Create dictionary holding the values we need.
  // Cant use const to define a dict for whatever reason. Not the latest version of JS
  var dict = {
    contentName: getValueFromTag("<t4 type='content' name='Name' output='normal' modifiers='striptags,htmlentities' />"),
    firstName: getValueFromTag("<t4 type='content' name='First Name' output='normal' modifiers='striptags,htmlentities' />"),
    lastName: getValueFromTag("<t4 type='content' name='Last Name' output='normal' modifiers='striptags,htmlentities' />"),
    facultyStatus: getValueFromTag("<t4 type='content' name='Faculty Status' output='normal' display_field='value' />"),
    primaryTitle: getValueFromTag("<t4 type='content' name='Primary Title' output='normal' modifiers='striptags,htmlentities />"),
    secondaryTitle: getValueFromTag("<t4 type='content' name='Secondary Title' output='normal' modifiers='striptags,htmlentities />"),
    primaryImage: getValueFromTag("<t4 type='content' name='Profile Pic' output='normal' formatter='path/*' />"),
    emailAddress: getValueFromTag("<t4 type='content' name='Email' output='normal' modifiers='striptags,htmlentities,encode_emails' />"),
    roomNumber: getValueFromTag("<t4 type='content' name='Room' output='normal' modifiers='striptags,htmlentities />"),
    cv: getValueFromTag("<t4 type='content' name='CV' output='normal' formatter='path/*' />"),
    cvLinkStatus: getValueFromTag("<t4 type='content' name='Show link to CV' output='normal' display_field='value' />"),
    education: getValueFromTag("<t4 type='content' name='Education' output='normal' modifiers='medialibrary,nav_sections' />"),
    expertise: getValueFromTag("<t4 type='content' name='Areas of Expertise' output='normal' modifiers='medialibrary,nav_sections' />"),
    affiliations: getValueFromTag("<t4 type='content' name='Affiliations' output='normal' modifiers='medialibrary,nav_sections' />"),
    courses: getValueFromTag("<t4 type='content' name='Courses' output='normal' modifiers='medialibrary,nav_sections' />"),
    biography: getValueFromTag("<t4 type='content' name='Biography' output='normal' modifiers='medialibrary,nav_sections' />"),
    publications: getValueFromTag("<t4 type='content' name='Publications' output='normal' modifiers='medialibrary,nav_sections' />"),
    activity: getValueFromTag("<t4 type='content' name='Activity' output='normal' modifiers='medialibrary,nav_sections' />"),
    fullTextLink: getValueFromTag("<t4 type='content' name='Name' output='fulltext' modifiers='striptags,htmlentities' />"),
    anchorTag: getValueFromTag("<t4 type='meta' meta='html_anchor' />"),
    contentID: getValueFromTag("<t4 type='meta' meta='content_id' />")
  }

  // Get all the errors returned from getValueFromTag and put them in errorString.
  var errorString = ''
  var keys = Object.keys(dict)
  for (var i = 0; i < keys.length; i++) {
    if (dict[keys[i]].isError) {
      errorString += '' + keys[i] + ' - ' + dict[keys[i]].message + '\n'
    }
  }
  // If errors exist, display them. If not, continue.
  if (errorString) {
    document.write('Faild to get needed profile information from the following:\n')
    document.write('<pre>' + errorString + '</pre>')
  } else {
    // Declare/Assign local variables with base formatting.
    var hiddenFields = ''
    var openHiddenFields = '<div class="hiddenSearchText visually-hidden">'
    var closeHiddenFields = '</div>'
    var primaryImageString = '<img src="' + dict.primaryImage.content + '" class="card-img rounded-circle" alt="' + dict.firstName.content + ' ' + dict.lastName.content + ', ' + dict.primaryTitle.content + '">'
    var cardTitle = '<h3 class="card-title d-flex justify-content-center justify-content-md-start text-center text-md-start">' + dict.firstName.content + ' ' + dict.lastName.content + '</h3>'
    var primaryTitleString = '<p class="card-text mb-0 d-flex justify-content-center justify-content-md-start text-center text-md-start">' + dict.primaryTitle.content + '</p>'
    var emailAddressString = '<p class="card-text d-flex justify-content-center justify-content-md-start text-center text-md-start"><a href="mailto:' + dict.emailAddress.content + '?subject=From your Faculty Profile" title="Email ' + dict.firstName.content + ' ' + dict.lastName.content + '">Contact ' + dict.firstName.content + '</a></p>'
    // closeCardTitle doesn't exist within this page, leaving as var since it's probably here for a reason.
    var closeCardTitle = '</h3>'
    var openCardBody = '<div class="card-body">'
    var closeCardBody = '</div>'
    var openBodyWrapper = '<div class="col-md-8 d-flex align-items-center">'
    var closeBodyWrapper = '</div>'
    var openImageWrapper = '<div class="col-md-4">'
    var closeImageWrapper = '</div>'
    var openRow = '<div class="row g-0">'
    var closeRow = '</div>'
    var anchorWrap = '<div class="visually-hidden">' + dict.anchorTag.content + '</div>'
    var beginningHTML = '<div class="lawFacultyWrapper contentItem card w-100 border-0" aria-label="' + dict.firstName.content + ' ' + dict.lastName.content + '" id="id' + dict.contentID.content + '" data-position-default="Main" data-position-selected="Main">'
    var endingHTML = '</div>'
    var horizontalRule = '<hr class="lawProfileBorderRule" />'

    // Determine if the article contains full text content
    if (dict.biography.content) {
      cardTitle = '<h3 class="card-title d-flex justify-content-center justify-content-md-start text-center text-md-start"><a href="' + dict.fullTextLink.content + '" title="' + dict.firstName.content + ' ' + dict.lastName.content + ', ' + dict.primaryTitle.content + '">' + dict.firstName.content + ' ' + dict.lastName.content + '</a></h3>'
    }

    // Write hidden search fields from specifiedFields.
    // T4 also cannot handle or process modern for loops (for(let key of array){})
    // To add entries: match class name & dict key.
    var specifiedFields = ['secondaryTitle', 'education', 'expertise', 'affiliations', 'courses', 'biography', 'publications', 'activity']
    for (var k = 0; k < specifiedFields.length; k++) {
      if (dict[specifiedFields[k]].content) {
        hiddenFields += '<span class="visually-hidden ' + specifiedFields[k] + '">' + dict[specifiedFields[k]].content + '</span>'
      }
    }

    // Write all HTML tags using document.write
    document.write(beginningHTML)
    document.write(anchorWrap)
    document.write(openRow)
    document.write(openImageWrapper)
    document.write(primaryImageString)
    document.write(closeImageWrapper)
    document.write(openBodyWrapper)
    document.write(openCardBody)
    document.write(cardTitle)
    document.write(primaryTitleString)
    document.write(emailAddressString)
    document.write(closeCardBody)
    document.write(closeBodyWrapper)
    document.write(closeRow)
    document.write(openHiddenFields)
    document.write(hiddenFields)
    document.write(closeHiddenFields)
    document.write(horizontalRule)
    document.write(endingHTML)
  }
} catch (err) {
  document.write(err.message)
}
