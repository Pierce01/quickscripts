// *** Begin Google Map JS ***  //
// *** Last Modified 8/17/21 *** ///



 // *** Floating InfoWindow  ***  //
 function modifyTextBox(type, header, text) {
  $("#POITextBox").show();
  $("#POITextBox h5").html(header);
  $("#POITextBox p").html(text);
  $("#POITextBox").css("padding","5px 25px 15px 25px");

  // Physical Space/Yellow
  if(type == 0){
   $("#POITextBox").css("border-left", "5px solid #FDB913");
   $("#POITextBox h5").css("color", "#333333");
  }
   // Services/Green
   if(type == 1){
   $("#POITextBox").css("border-left", "5px solid #6CCB3F");
   $("#POITextBox h5").css("color", "#333333");
   }
 // Involvement/Red
   if(type == 2){
   $("#POITextBox").css("border-left", "5px solid #EF4135");
   $("#POITextBox h5").css("color", "#aa0000");
  }
 //  Food/Blue
   if(type == 3){
   $("#POITextBox").css("border-left", "5px solid #47C3D3");
   $("#POITextBox h5").css("color", "#003282");
  }
  // Text Box Margins
  var margin = ($("#POITextBox").height() * -1) - 30;
  $("#POITextBox").css("margin", (margin + "px auto 10px auto"));
}
// *** End of Floating InfoWindow  ***  //


// *** Floating InfoPopup  ***  //
function modifyPinLabel(type, header, text) {
  $("#PinLabel").show();
  $("#PinLabel h5").html(header);
  $("#PinLabel p").html(text);
  $("#PinLabel").css("padding","5px 15px 15px 15px");

  // Physical Space/Yellow
  if(type == 0){
    $("#PinLabel").css("border-left", "5px solid #FDB913");
    $("#PinLabel h5").css("color", "#333333");
  }
   // Services/Green
   if(type == 1){
   $("#PinLabel").css("border-left", "5px solid #6CCB3F");
   $("#PinLabel h5").css("color", "#333333");
   }
 // Involvement/Red
   if(type == 2){
   $("#PinLabel").css("border-left", "5px solid #EF4135");
   $("#PinLabel h5").css("color", "#aa0000");
  }
 //  Food/Blue
   if(type == 3){
   $("#PinLabel").css("border-left", "5px solid #47C3D3");
   $("#PinLabel h5").css("color", "#003282");
  }
  // Pin Label Margins
  var margin = ($("#PinLabel").height() * -1) - 30;
  $("#PinLabel").css("margin", (margin + "px auto 10px auto"));
}

// Close other key menus when point is clicked
const categories = ['One', 'Two', 'Three', 'Four'];
function closeMenuExcept (key) {
  for (let cat of categories) {
    const category = `category${cat}`;
    if (!(category === key)) {
      if (isOpen(category)) {
        document.querySelector(`#${category} > div > button`).click();
      }
    }
  }
}

// Helper function to determine whether a menu is open.
function isOpen (key) {
  return document.querySelector(`[aria-labelledby="${key}"]`).ariaExpanded
}

// Toggles menu key category
function openKey (key) {
  const val = () => {
    switch (key) {
      case 1: return categories[0]
      case 2: return categories[1]
      case 3: return categories[2]
      case 4: return categories[3]
    }
  }
  const category = `category${val()}`;
  closeMenuExcept(category);
  if (!isOpen(category)) {
    document.querySelector(`#${category} > div > button`).click();
  }
} 

//  *** Implementation of initialize function ***  //
function initialize() {
  //  ***  Campus Primary Location  ***  //
  var seattleu = {
    lat: 47.610399,
    lng: -122.318070
  }

  //  ***  Campus Map Control Settings  ***  //
  var map = new google.maps.Map(document.getElementById('SeattlePOIMap'), {
    center: seattleu,
    streetViewControl: false,
    scaleControl: true,
    zoomControl: true,
    mapTypeControl: true,
    fullscreenControl: false,
    mapTypeId: 'satellite',
    zoom: 16,
    //  *** Map style from Snazzy Maps (Blue Water) start ***  //
    styles: [{
      // Land
      "featureType": "administrative.land_parcel",
      "elementType": "labels",
      "stylers": [{
        "visibility": "off"
      }],
    }, {
      // Points of Interest
      "featureType": "poi",
      "elementType": "labels.text",
      "stylers": [{
        "visibility": "off"
      }],
    }, {
      // Businesses
      "featureType": "poi.business",
      "stylers": [{
        "visibility": "off"
      }],
    }, {
      // Roads
      "featureType": "road",
      "elementType": "labels.icon",
      "stylers": [{
        "visibility": "off"
      }],
    }, {
      // Local Roads
      "featureType": "road.local",
      "elementType": "labels",
      "stylers": [{
        "visibility": "off"
      }],
    }, {
      // Transit
      "featureType": "transit",
      "stylers": [{
        "visibility": "off"
      }],
    }, {
      // Water
      "featureType": "water",
      "elementType": "all",
      "stylers": [{
        "color": "#04A9C5"
      }, {
        "visibility": "on"
      }],
    }],
  });
  // Click Listener for Text Box
  map.addListener('click', function() {
    $("#POITextBox").hide();
  });
  // Click Listener for Text Box
  map.addListener('click', function() {
    $("#PinLabel").hide();
  });
  //  *** Map style end ***  //



  //  *** Map markers start ***  //

  //  *** Map marker url list start ***  //
  var icons = {
    // SU Icon
    seattleUIcon: {
      icon: '/media/graduate-admissions/images/graduate-viewbook/sulogo.png'
    },
    // Physical Icon
    physicalSpacesIcon: {
      icon: '/media/student-development/Marker_Yellow.png'
    },
    // Services Icon
    servicesIcon: {
      icon: '/media/student-development/Marker_Green.png'
    },
    // Involvement Icon
    involvementIcon: {
      icon: '/media/student-development/Marker_Red.png'
    },
    // Food Icon
    foodIcon: {
      icon: '/media/student-development/Marker_Blue.png'
    },
  };
  //  *** Map marker url list end ***  //



  //  ***  click listeners for map icons ***  //

  //  *** Seattle University Main Campus Marker ***  //
  var seattleuMarker = new google.maps.Marker({
    position: seattleu,
    icon: icons['seattleUIcon'].icon,
    map: map,
    optimized: false,
    zIndex: 100,
  });
  seattleuMarker.addListener('click', function() {
    map.setZoom(19);
    map.setCenter(seattleuMarker.getPosition());
    modifyTextBox(2, "Seattle University", "Seattle University, founded in 1891, is a Jesuit Catholic university located on 50 acres in Seattle's Capitol Hill neighborhood.");
  });
  // create mouseover listener for marker label
  seattleuMarker.addListener('mouseover', function() {
    modifyTextBox(2, "Seattle University", "Seattle University, founded in 1891, is a Jesuit Catholic university located on 50 acres in Seattle's Capitol Hill neighborhood.");
  });
  // Click Listener for Pin Labels
  seattleuMarker.addListener('mouseout', function() {
    $("#POITextBox").hide();
  });
  //  *** Physical Space/yellow Markers start, alphabetized listings ***  //

  //  ***  Commuter Showers  ***  //
  var commuterShowersMarker = new google.maps.Marker({
    position: {
      lat: 47.608331,
      lng: -122.318721
    },
    icon: icons['physicalSpacesIcon'].icon,
    map: map,
  });
  // create variable to store b-coloumn link ID
  var commuterShowersLink = document.getElementById('commuterShowers');
  // create object to store Info Box attributes
  var commuterShowersObj = {linkId: commuterShowersLink, linkName: 'Commuter Showers', linkDesc: "If you are a bicycle commuter, or just want to take a shower after running the track before class, there is a locker room with showers available on campus specifically for commuter students. These showers are located at the west end of the first floor of the Student Center. Bring your campus card and swipe for entry. Find out more on the <a href='https://www.seattleu.edu/student-outreach/commuter-students/commuter-resources/' target='_blank'>Commuter Students Resources webpage</a>."};
  // create dom listener for b-coloumn anchor link
  google.maps.event.addDomListener(commuterShowersLink, 'click', function() {
    map.setZoom(19);
    map.setCenter(commuterShowersMarker.getPosition());
    modifyTextBox(0, commuterShowersObj.linkName, commuterShowersObj.linkDesc);
  });
  // create click listener for marker
  commuterShowersMarker.addListener('click', function() {
    map.setZoom(19);
    map.setCenter(commuterShowersMarker.getPosition());
    modifyTextBox(0, commuterShowersObj.linkName, commuterShowersObj.linkDesc);
    $("#PinLabel").hide();
    openKey(1);
  });
  // create mouseover listener for marker label
  commuterShowersMarker.addListener('mouseover', function() {
    modifyPinLabel(0, "Physical Spaces", commuterShowersObj.linkName);
    $("#POITextBox").hide();
  });
  // Click Listener for Pin Labels
  commuterShowersMarker.addListener('mouseout', function() {
    $("#PinLabel").hide();
  });


  //  ***  Lemieux Library   ***  //
  var lemieuxLibraryMarker = new google.maps.Marker({
    position: {
      lat: 47.608963,
      lng: -122.318996
    },
    icon: icons['physicalSpacesIcon'].icon,
    map: map,
  });
  // create variable to store b-coloumn link ID
  var lemieuxLibraryLink = document.getElementById('lemieuxLibrary');
  // create object to store Info Box attributes
  var lemieuxLibraryObj = {linkId: lemieuxLibraryLink, linkName: 'Lemieux Library and McGoldrick Learning Commons', linkDesc: "The library offers many study areas, quiet reading rooms, and research assistance to all students. Visit the <a href='http://libguides.seattleu.edu/libraryhours' target='_blank'>Library's website</a> to find out their hours. Group study rooms can be reserved using <a href='http://libguides.seattleu.edu/gsr' target='_blank'>these instructions</a>. <a href='https://www.seattleu.edu/library/library-services/study-spaces/' target='_blank'>Check out the full list of the Library's study spaces</a>."};
  // create dom listener for b-coloumn anchor link
  google.maps.event.addDomListener(lemieuxLibraryLink, 'click', function() {
    map.setZoom(19);
    map.setCenter(lemieuxLibraryMarker.getPosition());
    modifyTextBox(0, lemieuxLibraryObj.linkName, lemieuxLibraryObj.linkDesc);
  });
  // create click listener for marker
  lemieuxLibraryMarker.addListener('click', function() {
    map.setZoom(19);
    map.setCenter(lemieuxLibraryMarker.getPosition());
    modifyTextBox(0, lemieuxLibraryObj.linkName, lemieuxLibraryObj.linkDesc);
    $("#PinLabel").hide();
    openKey(1);
  });
  // create mouseover listener for marker label
  lemieuxLibraryMarker.addListener('mouseover', function() {
    modifyPinLabel(0, "Physical Spaces", lemieuxLibraryObj.linkName);
    $("#POITextBox").hide();
  });
  // Click Listener for Pin Labels
  lemieuxLibraryMarker.addListener('mouseout', function() {
    $("#PinLabel").hide();
  });

  //  *** McGoldrick Collegium  ***  //
  var mcgoldrickCollegiumMarker = new google.maps.Marker({
    position: {
      lat: 47.611762,
      lng: -122.318301
    },
    icon: icons['physicalSpacesIcon'].icon,
    map: map,
  });
  // create variable to store b-coloumn link ID
  var mcgoldrickCollegiumLink = document.getElementById('mcgoldrickCollegium');
  // create object to store Info Box attributes
  var mcgoldrickCollegiumObj = {linkId: mcgoldrickCollegiumLink, linkName: 'McGoldrick Collegium', linkDesc: "<a href='https://www.seattleu.edu/student-outreach/adult-learners/mcgoldrick-collegium/' target='_blank'>McGoldrick Collegium</a>, located in Hunthausen Hall, is the home for graduate students and adult learners over the age of 25. The space is staffed by current SU students and offers a comfortable study space and multiple events and programs throughout the year. For a list of events and to stay connected please visit our <a href='https://www.facebook.com/SUcollegia/' target='_blank'>Facebook</a> and <a href='https://orgsync.com/161729/chapter' target='_blank'>ConnectSU</a> pages."};
  // create dom listener for b-coloumn anchor link
  google.maps.event.addDomListener(mcgoldrickCollegiumLink, 'click', function() {
    map.setZoom(19);
    map.setCenter(mcgoldrickCollegiumMarker.getPosition());
    modifyTextBox(0, mcgoldrickCollegiumObj.linkName, mcgoldrickCollegiumObj.linkDesc);
  });
  // create click listener for marker
  mcgoldrickCollegiumMarker.addListener('click', function() {
    map.setZoom(19);
    map.setCenter(mcgoldrickCollegiumMarker.getPosition());
    modifyTextBox(0, mcgoldrickCollegiumObj.linkName, mcgoldrickCollegiumObj.linkDesc);
    $("#PinLabel").hide();
    openKey(1);
  });
  // create mouseover listener for marker label
  mcgoldrickCollegiumMarker.addListener('mouseover', function() {
    modifyPinLabel(0, "Physical Spaces", mcgoldrickCollegiumObj.linkName);
    $("#POITextBox").hide();
  });
  // Click Listener for Pin Labels
  mcgoldrickCollegiumMarker.addListener('mouseout', function() {
    $("#PinLabel").hide();
  });


  //  ***  Outreach Center  ***  //
  var outreachCenterMarker = new google.maps.Marker({
    position: {
      lat: 47.608319,
      lng: -122.317772
    },
    icon: icons['physicalSpacesIcon'].icon,
    map: map,
  });
  // create variable to store b-coloumn link ID
  var outreachCenterLink = document.getElementById('outreachCenter');
  // create object to store Info Box attributes
  var outreachCenterObj = {linkId: outreachCenterLink, linkName: 'Outreach Center', linkDesc: "Located in STCN 110, <a href='https://www.seattleu.edu/student-outreach/resource-spaces/outreach-center/' target='_blank'>The Outreach Center</a> is a community and resource space for members of the Seattle University community who identify with the first-generation college student experience and the student veteran experience."};
  // create dom listener for b-coloumn anchor link
  google.maps.event.addDomListener(outreachCenterLink, 'click', function() {
    map.setZoom(19);
    map.setCenter(outreachCenterMarker.getPosition());
    modifyTextBox(0, outreachCenterObj.linkName, outreachCenterObj.linkDesc);
  });
  // create click listener for marker
  outreachCenterMarker.addListener('click', function() {
    map.setZoom(19);
    map.setCenter(outreachCenterMarker.getPosition());
    modifyTextBox(0, outreachCenterObj.linkName, outreachCenterObj.linkDesc);
    $("#PinLabel").hide();
    openKey(1);
  });
  // create mouseover listener for marker label
  outreachCenterMarker.addListener('mouseover', function() {
    modifyPinLabel(0, "Physical Spaces", outreachCenterObj.linkName);
    $("#POITextBox").hide();
  });
  // Click Listener for Pin Labels
  outreachCenterMarker.addListener('mouseout', function() {
    $("#PinLabel").hide();
  });
  //  *** Physical Spaces markers end ***  //



  //  *** Services/Green Markers start, alphabetized listings ***  //

  //  ***  Campus Store  ***  //
  var campusStoreMarker = new google.maps.Marker({
    position: {
      lat: 47.612600,
      lng: -122.316988
    },
    icon: icons['servicesIcon'].icon,
    map: map,
  });
  // create variable to store b-coloumn link ID
  var campusStoreLink = document.getElementById('campusStore');
  // create object to store Info Box attributes
  var campusStoreObj = {linkId: campusStoreLink, linkName: 'Campus Store', linkDesc: "Located at 12th and Madison, you can buy, rent, and sell your textbooks, and get all your Seattle U swag, at the <a href='https://www.seattleu.edu/campus-store/' target='_blank'>Campus Store</a>."};
  // create dom listener for b-coloumn anchor link
  google.maps.event.addDomListener(campusStoreLink, 'click', function() {
    map.setZoom(19);
    map.setCenter(campusStoreMarker.getPosition());
    modifyTextBox(1, campusStoreObj.linkName, campusStoreObj.linkDesc);
  });
  // create click listener for marker
  campusStoreMarker.addListener('click', function() {
    map.setZoom(19);
    map.setCenter(campusStoreMarker.getPosition());
    modifyTextBox(1, campusStoreObj.linkName, campusStoreObj.linkDesc);
    $("#PinLabel").hide();
    openKey(2);
  });
  // create mouseover listener for marker label
  campusStoreMarker.addListener('mouseover', function() {
    modifyPinLabel(1, "Student Services", campusStoreObj.linkName);
    $("#POITextBox").hide();
  });
  // Click Listener for Pin Labels
  campusStoreMarker.addListener('mouseout', function() {
    $("#PinLabel").hide();
  });

  //  ***  Career Engagement Office  ***  //
  var careerEngagementOfficeMarker = new google.maps.Marker({
    position: {
      lat: 47.608853,
      lng: -122.317784
    },
    icon: icons['servicesIcon'].icon,
    map: map,
  });
  // create variable to store b-coloumn link ID
  var careerEngagementOfficeLink = document.getElementById('careerEngagementOffice');
  // create object to store Info Box attributes
  var careerEngagementOfficeObj = {linkId: careerEngagementOfficeLink, linkName: 'Career Engagement Office', linkDesc: "The <a href='https://www.seattleu.edu/careerservices' target='_blank'>Career Engagement Office</a>, located in PAVL 110, works with students at every stage of the career and job process. Career advisors are available to discuss career exploration, job and internship searches, resumes, cover letters, conduct mock interviews, and more."};
  // create dom listener for b-coloumn anchor link
  google.maps.event.addDomListener(careerEngagementOfficeLink, 'click', function() {
    map.setZoom(19);
    map.setCenter(careerEngagementOfficeMarker.getPosition());
    modifyTextBox(1, careerEngagementOfficeObj.linkName, careerEngagementOfficeObj.linkDesc);
  });
  // create click listener for marker
  careerEngagementOfficeMarker.addListener('click', function() {
    map.setZoom(19);
    map.setCenter(careerEngagementOfficeMarker.getPosition());
    modifyTextBox(1, careerEngagementOfficeObj.linkName, careerEngagementOfficeObj.linkDesc);
    $("#PinLabel").hide();
    openKey(2);
  });
  // create mouseover listener for marker label
  careerEngagementOfficeMarker.addListener('mouseover', function() {
    modifyPinLabel(1, "Student Services", careerEngagementOfficeObj.linkName);
    $("#POITextBox").hide();
  });
  // Click Listener for Pin Labels
  careerEngagementOfficeMarker.addListener('mouseout', function() {
    $("#PinLabel").hide();
  });


  //  ***  Counseling and Psychological Services  ***  //
  var capsMarker = new google.maps.Marker({
    position: {
      lat: 47.608884,
      lng: -122.317554
    },
    icon: icons['servicesIcon'].icon,
    map: map,
  });
  // create variable to store b-coloumn link ID
  var capsLink = document.getElementById('caps');
  // create object to store Info Box attributes
  var capsObj = {linkId: capsLink, linkName: 'Counseling and Psychological Services (CAPS)', linkDesc: "<a href='https://www.seattleu.edu/caps' target='_blank'>Counseling and Psychological Services (CAPS)</a> is committed to helping students meet the challenges of life during college, graduate and professional school by encouraging healthy personal choices and balanced perspectives. CAPS provides affirmative therapy that values diversity and respects the individual."};
  // create dom listener for b-coloumn anchor link
  google.maps.event.addDomListener(capsLink, 'click', function() {
    map.setZoom(19);
    map.setCenter(capsMarker.getPosition());
    modifyTextBox(1, capsObj.linkName, capsObj.linkDesc);
  });
  // create click listener for marker
  capsMarker.addListener('click', function() {
    map.setZoom(19);
    map.setCenter(capsMarker.getPosition());
    modifyTextBox(1, capsObj.linkName, capsObj.linkDesc);
    $("#PinLabel").hide();
    openKey(2);
  });
  // create mouseover listener for marker label
  capsMarker.addListener('mouseover', function() {
    modifyPinLabel(1, "Student Services", capsObj.linkName);
    $("#POITextBox").hide();
  });
  // Click Listener for Pin Labels
  capsMarker.addListener('mouseout', function() {
    $("#PinLabel").hide();
  });

  //  ***  Learning Assistance Program  ***  //
  var learningAssistanceProgramsMarker = new google.maps.Marker({
    position: {
      lat: 47.608837,
      lng: -122.319127
    },
    icon: icons['servicesIcon'].icon,
    map: map,
  });
  // create variable to store b-coloumn link ID
  var learningAssistanceProgramsLink = document.getElementById('learningAssistancePrograms');
  // create object to store Info Box attributes
  var learningAssistanceProgramsObj = {linkId: learningAssistanceProgramsLink, linkName: 'Learning Assistance Programs & The Writing Center', linkDesc: "Both located on the second floor of the Lemieux Library, the <a href='https://www.seattleu.edu/writingcenter/' target='_blank'>Writing Center</a> and <a href='https://www.seattleu.edu/learning-assistance/' target='_blank'>Learning Assistance Programs</a> offer one-on-one sessions and workshops to help you become a better writer and learner."};
  // create dom listener for b-coloumn anchor link
  google.maps.event.addDomListener(learningAssistanceProgramsLink, 'click', function() {
    map.setZoom(19);
    map.setCenter(learningAssistanceProgramsMarker.getPosition());
    modifyTextBox(1, learningAssistanceProgramsObj.linkName, learningAssistanceProgramsObj.linkDesc);
  });
  // create click listener for marker
  learningAssistanceProgramsMarker.addListener('click', function() {
    map.setZoom(19);
    map.setCenter(learningAssistanceProgramsMarker.getPosition());
    modifyTextBox(1, learningAssistanceProgramsObj.linkName, learningAssistanceProgramsObj.linkDesc);
    $("#PinLabel").hide();
    openKey(2);
  });
  // create mouseover listener for marker label
  learningAssistanceProgramsMarker.addListener('mouseover', function() {
    modifyPinLabel(1, "Student Services", learningAssistanceProgramsObj.linkName);
    $("#POITextBox").hide();
  });
  // Click Listener for Pin Labels
  learningAssistanceProgramsMarker.addListener('mouseout', function() {
    $("#PinLabel").hide();
  });

  //  ***  Media Production Center  ***  //
  var mpcMarker = new google.maps.Marker({
    position: {
      lat: 47.608838,
      lng: -122.318540
    },
    icon: icons['servicesIcon'].icon,
    map: map,
  });
  // create variable to store b-coloumn link ID
  var mpcLink = document.getElementById('mpc');
  // create object to store Info Box attributes
  var mpcObj = {linkId: mpcLink, linkName: 'Media Production Center', linkDesc: "Located on the first floor of the Lemieux Library, the <a href='https://www.seattleu.edu/library/library-services/media-production-center/' target='_blank'>Media Production Center</a> offers training, workshops, equipment check-out, and support so you can bring to life your original multimedia productions."};
  // create dom listener for b-coloumn anchor link
  google.maps.event.addDomListener(mpcLink, 'click', function() {
    map.setZoom(19);
    map.setCenter(mpcMarker.getPosition());
    modifyTextBox(1, mpcObj.linkName, mpcObj.linkDesc);
  });
  // create click listener for marker
  mpcMarker.addListener('click', function() {
    map.setZoom(19);
    map.setCenter(mpcMarker.getPosition());
    modifyTextBox(1, mpcObj.linkName, mpcObj.linkDesc);
    $("#PinLabel").hide();
    openKey(2);
  });
  // create mouseover listener for marker label
  mpcMarker.addListener('mouseover', function() {
    modifyPinLabel(1, "Student Services", mpcObj.linkName);
    $("#POITextBox").hide();
  });
  // Click Listener for Pin Labels
  mpcMarker.addListener('mouseout', function() {
    $("#PinLabel").hide();
  });

  //  ***  Public Safety  ***  //
  var publicSafetyMarker = new google.maps.Marker({
    position: {
      lat: 47.6090,
      lng: -122.3145
    },
    icon: icons['servicesIcon'].icon,
    map: map,
  });
  // create variable to store b-coloumn link ID
  var publicSafetyLink = document.getElementById('publicSafety');
  // create object to store Info Box attributes
  var publicSafetyObj = {linkId: publicSafetyLink, linkName: 'Public Safety', linkDesc: "Located in University Services 102, open 8:30am-4:30pm. 24-Hour Emergency Line:  (206) 296-5911; 24-Hour Non-Emergency Line:  (206) 296-5990; Business Line: (206) 296-5992; Email: <a href='mailto:publicsafety@seattleu.edu'>publicsafety@seattleu.edu</a>."};
  // create dom listener for b-coloumn anchor link
  google.maps.event.addDomListener(publicSafetyLink, 'click', function() {
    map.setZoom(19);
    map.setCenter(publicSafetyMarker.getPosition());
    modifyTextBox(1, publicSafetyObj.linkName, publicSafetyObj.linkDesc);
  });
  // create click listener for marker
  publicSafetyMarker.addListener('click', function() {
    map.setZoom(19);
    map.setCenter(publicSafetyMarker.getPosition());
    modifyTextBox(1, publicSafetyObj.linkName, publicSafetyObj.linkDesc);
    $("#PinLabel").hide();
    openKey(2);
  });
  // create mouseover listener for marker label
  publicSafetyMarker.addListener('mouseover', function() {
    modifyPinLabel(1, "Student Services", publicSafetyObj.linkName);
    $("#POITextBox").hide();
  });
  // Click Listener for Pin Labels
  publicSafetyMarker.addListener('mouseout', function() {
    $("#PinLabel").hide();
  });

  //  ***  Redhawk Axis  ***  //
  var redhawkStudentServicesMarker = new google.maps.Marker({
    position: {
      lat: 47.6122,
      lng: -122.3176
    },
    icon: icons['servicesIcon'].icon,
    map: map,
  });
  // create variable to store b-coloumn link ID
  var redhawkStudentServicesLink = document.getElementById('redhawkStudentServices');
  // create object to store Info Box attributes
  var redhawkStudentServicesObj = {linkId: redhawkStudentServicesLink, linkName: 'Redhawk Student Services', linkDesc: "Located on the second floor of Vi Hilbert Hall, this desk allows students to drop and speak to a Registrar staff member or a Student Financial Services staff member. Extended hours are offered during registration!"};
  // create dom listener for b-coloumn anchor link
  google.maps.event.addDomListener(redhawkStudentServicesLink, 'click', function() {
    map.setZoom(19);
    map.setCenter(redhawkStudentServicesMarker.getPosition());
    modifyTextBox(1, redhawkStudentServicesObj.linkName, redhawkStudentServicesObj.linkDesc);
  });
  // create click listener for marker
  redhawkStudentServicesMarker.addListener('click', function() {
    map.setZoom(19);
    map.setCenter(redhawkStudentServicesMarker.getPosition());
    modifyTextBox(1, redhawkStudentServicesObj.linkName, redhawkStudentServicesObj.linkDesc);
    $("#PinLabel").hide();
    openKey(2);
  });
  // create mouseover listener for marker label
  redhawkStudentServicesMarker.addListener('mouseover', function() {
    modifyPinLabel(1, "Student Services", redhawkStudentServicesObj.linkName);
    $("#POITextBox").hide();
  });
  // Click Listener for Pin Labels
  redhawkStudentServicesMarker.addListener('mouseout', function() {
    $("#PinLabel").hide();
  });

  //  ***  Redhawk Resource Desk  ***  //
  var redhawkResourceHubDeskMarker = new google.maps.Marker({
    position: {
      lat: 47.608555,
      lng: -122.317994
    },
    icon: icons['servicesIcon'].icon,
    map: map,
  });
  // create variable to store b-coloumn link ID
  var redhawkResourceHubDeskLink = document.getElementById('redhawkResourceHubDesk');
  // create object to store Info Box attributes
  var redhawkResourceHubDeskObj = {linkId: redhawkResourceHubDeskLink, linkName: 'Redhawk Resource Hub Desk', linkDesc: "Located on the first floor of the Student Center, this desk offers free daily ORCA passes, locker rentals, and sells tickets for major campus events."};
  // create dom listener for b-coloumn anchor link
  google.maps.event.addDomListener(redhawkResourceHubDeskLink, 'click', function() {
    map.setZoom(19);
    map.setCenter(redhawkResourceHubDeskMarker.getPosition());
    modifyTextBox(1, redhawkResourceHubDeskObj.linkName, redhawkResourceHubDeskObj.linkDesc);
  });
  // create click listener for marker
  redhawkResourceHubDeskMarker.addListener('click', function() {
    map.setZoom(19);
    map.setCenter(redhawkResourceHubDeskMarker.getPosition());
    modifyTextBox(1, redhawkResourceHubDeskObj.linkName, redhawkResourceHubDeskObj.linkDesc);
    $("#PinLabel").hide();
    openKey(2);
  });
  // create mouseover listener for marker label
  redhawkResourceHubDeskMarker.addListener('mouseover', function() {
    modifyPinLabel(1, "Student Services", redhawkResourceHubDeskObj.linkName);
    $("#POITextBox").hide();
  });
  // Click Listener for Pin Labels
  redhawkResourceHubDeskMarker.addListener('mouseout', function() {
    $("#PinLabel").hide();
  });

  //  ***  SU Supercopy  ***  //
  var supercopyMarker = new google.maps.Marker({
    position: {
      lat: 47.608936,
      lng: -122.317423
    },
    icon: icons['servicesIcon'].icon,
    map: map,
  });
  // create variable to store b-coloumn link ID
  var superCopyLink = document.getElementById('superCopy');
  // create object to store Info Box attributes
  var superCopyObj = {linkId: superCopyLink, linkName: 'SUperCopy', linkDesc: "Located in PAVL 010, Supercopy offers multiple services to students, such as printing, copying, mailing, and making your SU ID card. They also sell stamps and course packs. They take cash, check or card for payment. You can mail things from campus through this office! Perfect for when you need to mail back a rented textbook. Pick up time for USPS is 2pm Mon-Fri."};
  // create dom listener for b-coloumn anchor link
  google.maps.event.addDomListener(superCopyLink, 'click', function() {
    map.setZoom(19);
    map.setCenter(supercopyMarker.getPosition());
    modifyTextBox(1, superCopyObj.linkName, superCopyObj.linkDesc);
  });
  // create click listener for marker
  supercopyMarker.addListener('click', function() {
    map.setZoom(19);
    map.setCenter(supercopyMarker.getPosition());
    modifyTextBox(1, superCopyObj.linkName, superCopyObj.linkDesc);
    $("#PinLabel").hide();
    openKey(2);
  });
  // create mouseover listener for marker label
  supercopyMarker.addListener('mouseover', function() {
    modifyPinLabel(1, "Student Services", superCopyObj.linkName);
    $("#POITextBox").hide();
  });
  // Click Listener for Pin Labels
  supercopyMarker.addListener('mouseout', function() {
    $("#PinLabel").hide();
  });

  //  ***  Fitness Center  ***  //
  var universityRecreationMarker = new google.maps.Marker({
    position: {
      lat: 47.606994,
      lng: -122.313798
    },
    icon: icons['servicesIcon'].icon,
    map: map,
  });
  // create variable to store b-coloumn link ID
  var universityRecreationLink = document.getElementById('universityRecreation');
  // create object to store Info Box attributes
  var universityRecreationObj = {linkId: universityRecreationLink, linkName: 'William F. Eisiminger Fitness Center', linkDesc: "Located in the Redhawk Center, the Rec Center offers fitness classes, a weight room, cardio floor and studios. Check out their <a href='https://www.seattleu.edu/recreation/' target='_blank'>website</a> for quarterly hours, as well as pool hours."};
  // create dom listener for b-coloumn anchor link
  google.maps.event.addDomListener(universityRecreationLink, 'click', function() {
    map.setZoom(19);
    map.setCenter(universityRecreationMarker.getPosition());
    modifyTextBox(1, universityRecreationObj.linkName, universityRecreationObj.linkDesc);
  });
  // create click listener for marker
  universityRecreationMarker.addListener('click', function() {
    map.setZoom(19);
    map.setCenter(universityRecreationMarker.getPosition());
    modifyTextBox(1, universityRecreationObj.linkName, universityRecreationObj.linkDesc);
    $("#PinLabel").hide();
    openKey(2);
  });
  // create mouseover listener for marker label
  universityRecreationMarker.addListener('mouseover', function() {
    modifyPinLabel(1, "Student Services", universityRecreationObj.linkName);
    $("#POITextBox").hide();
  });
  // Click Listener for Pin Labels
  universityRecreationMarker.addListener('mouseout', function() {
    $("#PinLabel").hide();
  });
  //  *** Services Markers end ***  //



  //  *** Involvement Opportunities/red Markers, alphabetized listings ***  //

  //  ***  Center for Student Involvement  ***  //
  var centerStudentInvolvementMarker = new google.maps.Marker({
    position: {
      lat: 47.608285,
      lng: -122.318658
    },
    icon: icons['involvementIcon'].icon,
    map: map,
  });
  // create variable to store b-coloumn link ID
  var centerForStudentInvolvementLink = document.getElementById('centerForStudentInvolvement');
  // create object to store Info Box attributes
  var centerForStudentInvolvementObj = {linkId: centerForStudentInvolvementLink, linkName: 'Center for Student Involvement', linkDesc: "Located in Student Center 350 and 360. Get involved through this office! Whether you join a club or organization, create a new one, or partake in a <a href='https://www.seattleu.edu/seac/' target='_blank'>SEAC</a> event - there are many way to get connected!"};
  // create dom listener for b-coloumn anchor link
  google.maps.event.addDomListener(centerForStudentInvolvementLink, 'click', function() {
    map.setZoom(19);
    map.setCenter(centerStudentInvolvementMarker.getPosition());
    modifyTextBox(2, centerForStudentInvolvementObj.linkName, centerForStudentInvolvementObj.linkDesc);
  });
  // create click listener for marker
  centerStudentInvolvementMarker.addListener('click', function() {
    map.setZoom(19);
    map.setCenter(centerStudentInvolvementMarker.getPosition());
    modifyTextBox(2, centerForStudentInvolvementObj.linkName, centerForStudentInvolvementObj.linkDesc);
    $("#PinLabel").hide();
    openKey(3);
  });
  // create mouseover listener for marker label
  centerStudentInvolvementMarker.addListener('mouseover', function() {
    modifyPinLabel(2, "Involvement Opportunities", centerForStudentInvolvementObj.linkName);
    $("#POITextBox").hide();
  });
  // Click Listener for Pin Labels
  centerStudentInvolvementMarker.addListener('mouseout', function() {
    $("#PinLabel").hide();
  });

  //  ***  Intramural Sports  ***  //
  var intramuralMarker = new google.maps.Marker({
    position: {
      lat: 47.607561,
      lng: -122.313441
    },
    icon: icons['involvementIcon'].icon,
    map: map,
  });
  // create variable to store b-coloumn link ID
  var intramuralLink = document.getElementById('intramural');
  // create object to store Info Box attributes
  var intramuralObj = {linkId: intramuralLink, linkName: 'Intramural Sports', linkDesc: "Happening throughout the school year and open to all students! Visit the <a href='https://www.seattleu.edu/recreation/intramural-sports/' target='_blank'>UREC Website</a> for more information."};
  // create dom listener for b-coloumn anchor link
  google.maps.event.addDomListener(intramuralLink, 'click', function() {
    map.setZoom(19);
    map.setCenter(intramuralMarker.getPosition());
    modifyTextBox(2, intramuralObj.linkName, intramuralObj.linkDesc);
  });
  // create click listener for marker
  intramuralMarker.addListener('click', function() {
    map.setZoom(19);
    map.setCenter(intramuralMarker.getPosition());
    modifyTextBox(2, intramuralObj.linkName, intramuralObj.linkDesc);
    $("#PinLabel").hide();
    openKey(3);
  });
  // create mouseover listener for marker label
  intramuralMarker.addListener('mouseover', function() {
    modifyPinLabel(2, "Involvement Opportunities", intramuralObj.linkName);
    $("#POITextBox").hide();
  });
  // Click Listener for Pin Labels
  intramuralMarker.addListener('mouseout', function() {
    $("#PinLabel").hide();
  });

  //  ***  International Student Center  ***  //
  var internationalStudentCenterMarker = new google.maps.Marker({
    position: {
      lat: 47.608758,
      lng: -122.317567
    },
    icon: icons['involvementIcon'].icon,
    map: map,
  });
  // create variable to store b-coloumn link ID
  var internationalStudentCenterLink = document.getElementById('internationalStudentCenter');
  // create object to store Info Box attributes
  var internationalStudentCenterObj = {linkId: internationalStudentCenterLink, linkName: 'International Student Center', linkDesc: "Located in PAVL 160, the <a href='https://www.seattleu.edu/isc/' target='_blank'>ISC</a> works closely with campus partners in supporting over 865 international students from 60 countries around the world. Some major events and programs include: International Dinner and International Education Week."};
  // create dom listener for b-coloumn anchor link
  google.maps.event.addDomListener(internationalStudentCenterLink, 'click', function() {
    map.setZoom(19);
    map.setCenter(internationalStudentCenterMarker.getPosition());
    modifyTextBox(2, internationalStudentCenterObj.linkName, internationalStudentCenterObj.linkDesc);
  });
  // create click listener for marker
  internationalStudentCenterMarker.addListener('click', function() {
    map.setZoom(19);
    map.setCenter(internationalStudentCenterMarker.getPosition());
    modifyTextBox(2, internationalStudentCenterObj.linkName, internationalStudentCenterObj.linkDesc);
    $("#PinLabel").hide();
    openKey(3);
  });
  // create mouseover listener for marker label
  internationalStudentCenterMarker.addListener('mouseover', function() {
    modifyPinLabel(2, "Involvement Opportunities", internationalStudentCenterObj.linkName);
    $("#POITextBox").hide();
  });
  // Click Listener for Pin Labels
  internationalStudentCenterMarker.addListener('mouseout', function() {
    $("#PinLabel").hide();
  });

  //  ***  Office of Multicultural Affairs  ***  //
  var omaMarker = new google.maps.Marker({
    position: {
      lat: 47.608711,
      lng: -122.317803
    },
    icon: icons['involvementIcon'].icon,
    map: map,
  });
  // create variable to store b-coloumn link ID
  var omaLink = document.getElementById('oma');
  // create object to store Info Box attributes
  var omaObj = {linkId: omaLink, linkName: 'Office of Multicultural Affairs', linkDesc: "Located in PAVL 180, OMA encourages students to increase their awareness of and engagement with diversity by creating an environment that promotes inclusion and advocacy. This is done through a variety of programs, services, and resources focused on historically marginalized experiences, dynamics of privilege, and social justice."};
  // create dom listener for b-coloumn anchor link
  google.maps.event.addDomListener(omaLink, 'click', function() {
    map.setZoom(19);
    map.setCenter(omaMarker.getPosition());
    modifyTextBox(2, omaObj.linkName, omaObj.linkDesc);
  });
  // create click listener for marker
  omaMarker.addListener('click', function() {
    map.setZoom(19);
    map.setCenter(omaMarker.getPosition());
    modifyTextBox(2, omaObj.linkName, omaObj.linkDesc);
    $("#PinLabel").hide();
    openKey(3);
  });
  // create mouseover listener for marker label
  omaMarker.addListener('mouseover', function() {
    modifyPinLabel(2, "Involvement Opportunities", omaObj.linkName);
    $("#POITextBox").hide();
  });
  // Click Listener for Pin Labels
  omaMarker.addListener('mouseout', function() {
    $("#PinLabel").hide();
  });

  //  ***  Student Government at SeattleU  ***  //
  var sgsuMarker = new google.maps.Marker({
    position: {
      lat: 47.608363,
      lng: -122.318600
    },
    icon: icons['involvementIcon'].icon,
    map: map,
  });
  // create variable to store b-coloumn link ID
  var sgsuLink = document.getElementById('sgsu');
  // create object to store Info Box attributes
  var sgsuObj = {linkId: sgsuLink, linkName: 'Student Government of Seattle University (SGSU)', linkDesc: "Stop by Student Center 360 and involved with student government. There are roles specific to non-traditional students on <a href='https://www.seattleu.edu/sgsu/' target='_blank_'>SGSU</a>. If you are a graduate student, the <a href='https://www.seattleu.edu/gsc/' target='_blank_'>Graduate Student Council</a> is here to support you."};
  // create dom listener for b-coloumn anchor link
  google.maps.event.addDomListener(sgsuLink, 'click', function() {
    map.setZoom(19);
    map.setCenter(sgsuMarker.getPosition());
    modifyTextBox(2, sgsuObj.linkName, sgsuObj.linkDesc);
  });
  // create click listener for marker
  sgsuMarker.addListener('click', function() {
    map.setZoom(19);
    map.setCenter(sgsuMarker.getPosition());
    modifyTextBox(2, sgsuObj.linkName, sgsuObj.linkDesc);
    $("#PinLabel").hide();
    openKey(3);
  });
  // create mouseover listener for marker label
  sgsuMarker.addListener('mouseover', function() {
    modifyPinLabel(2, "Involvement Opportunities", sgsuObj.linkName);
    $("#POITextBox").hide();
  });
  // Click Listener for Pin Labels
  sgsuMarker.addListener('mouseout', function() {
    $("#PinLabel").hide();
  });

  //  ***  Wellness and Health Promotion  ***  //
  var wellnessHealthPromotionMarker = new google.maps.Marker({
    position: {
      lat: 47.608406,
      lng: -122.318307
    },
    icon: icons['involvementIcon'].icon,
    map: map,
  });
  // create variable to store b-coloumn link ID
  var wellnessHealthPromotionLink = document.getElementById('wellnessHealthPromotion');
  // create object to store Info Box attributes
  var wellnessHealthPromotionObj = {linkId: wellnessHealthPromotionLink, linkName: 'Wellness and Health Promotion', linkDesc: "Through online screenings, individual consultations and large events this office offers education and support for the following areas: mental health, alcohol and other drugs, healthy relationships and physical wellness. Get involved with <a href='https://www.seattleu.edu/wellness/hawc/' target='_blank'>HAWC</a>."};
  // create dom listener for b-coloumn anchor link
  google.maps.event.addDomListener(wellnessHealthPromotionLink, 'click', function() {
    map.setZoom(19);
    map.setCenter(wellnessHealthPromotionMarker.getPosition());
    modifyTextBox(2, wellnessHealthPromotionObj.linkName, wellnessHealthPromotionObj.linkDesc);
  });
  // create click listener for marker
  wellnessHealthPromotionMarker.addListener('click', function() {
    map.setZoom(19);
    map.setCenter(wellnessHealthPromotionMarker.getPosition());
    modifyTextBox(2, wellnessHealthPromotionObj.linkName, wellnessHealthPromotionObj.linkDesc);
    $("#PinLabel").hide();
    openKey(3);
  });
  // create mouseover listener for marker label
  wellnessHealthPromotionMarker.addListener('mouseover', function() {
    modifyPinLabel(2, "Involvement Opportunities", wellnessHealthPromotionObj.linkName);
    $("#POITextBox").hide();
  });
  // Click Listener for Pin Labels
  wellnessHealthPromotionMarker.addListener('mouseout', function() {
    $("#PinLabel").hide();
  });
  //  *** Markers for Involvement Opportunities end ***  //



  //  *** Food/Blue markers begin, alphabetically listed ***  //

  //  ***  Cupcake Royale  ***  //
  var cupcakeRoyaleMarker = new google.maps.Marker({
    position: {
      lat: 47.614058,
      lng: -122.317592
    },
    icon: icons['foodIcon'].icon,
    map: map,
  });
  // create variable to store b-coloumn link ID
  var cupcakeRoyaleLink = document.getElementById('cupcakeRoyale');
  // create object to store Info Box attributes
  var cupcakeRoyaleObj = {linkId: cupcakeRoyaleLink, linkName: 'Cupcake Royale', linkDesc: "Just off campus, at 1111 E Pike St, be sure to visit <a href='https://www.cupcakeroyale.com/' target='_blank'>Cupcake Royale</a> to enjoy fresh baked cupcakes, Stumptown espresso, and Seattle's Best ice cream scoops, sundaes, shakes, and pints! They are open late (to 10am Sun-Thurs and 11pm Fri-Sat) and offer a 10% student discount for SU students."};
  // create dom listener for b-coloumn anchor link
  google.maps.event.addDomListener(cupcakeRoyaleLink, 'click', function() {
    map.setZoom(19);
    map.setCenter(cupcakeRoyaleMarker.getPosition());
    modifyTextBox(3, cupcakeRoyaleObj.linkName, cupcakeRoyaleObj.linkDesc);
  });
  // create click listener for marker
  cupcakeRoyaleMarker.addListener('click', function() {
    map.setZoom(19);
    map.setCenter(cupcakeRoyaleMarker.getPosition());
    modifyTextBox(3, cupcakeRoyaleObj.linkName, cupcakeRoyaleObj.linkDesc);
    $("#PinLabel").hide();
    openKey(4);
  });
  // create mouseover listener for marker label
  cupcakeRoyaleMarker.addListener('mouseover', function() {
    modifyPinLabel(3, "Food on or Near Campus", cupcakeRoyaleObj.linkName);
    $("#POITextBox").hide();
  });
  // Click Listener for Pin Labels
  cupcakeRoyaleMarker.addListener('mouseout', function() {
    $("#PinLabel").hide();
  });

  //  ***  Mr. Saigon  ***  //
  var mrSaigonMarker = new google.maps.Marker({
    position: {
      lat: 47.60915,
      lng: -122.3166
    },
    icon: icons['foodIcon'].icon,
    map: map,
  });
  // create variable to store b-coloumn link ID
  var mrSaigonLink = document.getElementById('mrSaigon');
  // create object to store Info Box attributes
  var mrSaigonObj = {linkId: mrSaigonLink, linkName: 'Mr. Saigon', linkDesc: "Right on the corner of 12th and Columbia, visit Mr. Saigon to enjoy awesome bahn mi, bubble tea and Vietnamese iced coffee. For more info check out their <a href='https://www.mrsaigonbanhmi.com/' target='_blank'>website</a>. They also offer a student discount of 10%, so remember to bring your SU ID."};
  // create dom listener for b-coloumn anchor link
  google.maps.event.addDomListener(mrSaigonLink, 'click', function() {
    map.setZoom(19);
    map.setCenter(mrSaigonMarker.getPosition());
    modifyTextBox(3, mrSaigonObj.linkName, mrSaigonObj.linkDesc);
  });
  // create click listener for marker
  mrSaigonMarker.addListener('click', function() {
    map.setZoom(19);
    map.setCenter(mrSaigonMarker.getPosition());
    modifyTextBox(3, mrSaigonObj.linkName, mrSaigonObj.linkDesc);
    $("#PinLabel").hide();
    openKey(4);
  });
  // create mouseover listener for marker label
  mrSaigonMarker.addListener('mouseover', function() {
    modifyPinLabel(3, "Food on or Near Campus", mrSaigonObj.linkName);
    $("#POITextBox").hide();
  });
  // Click Listener for Pin Labels
  mrSaigonMarker.addListener('mouseout', function() {
    $("#PinLabel").hide();
  });

  //  ***  Southpaw Pizza  ***  //
  var southPawMarker = new google.maps.Marker({
    position: {
      lat: 47.611189,
      lng: -122.3166
    },
    icon: icons['foodIcon'].icon,
    map: map,
  });
  // create variable to store b-coloumn link ID
  var southPawLink = document.getElementById('southPaw');
  // create object to store Info Box attributes
  var southPawObj = {linkId: southPawLink, linkName: 'Southpaw', linkDesc: "Located at 926 12th Ave, for great pizza, a great lunch special, and a family friendly atmosphere, this is a great place to eat near campus. Check out their <a href='http://www.southpawpizza.com/' target='_blank'>website</a> for details about their menu and upcoming events. They also offer a student discount of 10%, so remember to bring your SU ID."};
  // create dom listener for b-coloumn anchor link
  google.maps.event.addDomListener(southPawLink, 'click', function() {
    map.setZoom(19);
    map.setCenter(southPawMarker.getPosition());
    modifyTextBox(3, southPawObj.linkName, southPawObj.linkDesc);
  });
  // create click listener for marker
  southPawMarker.addListener('click', function() {
    map.setZoom(19);
    map.setCenter(southPawMarker.getPosition());
    modifyTextBox(3, southPawObj.linkName, southPawObj.linkDesc);
    $("#PinLabel").hide();
    openKey(4);
  });
  // create mouseover listener for marker label
  southPawMarker.addListener('mouseover', function() {
    modifyPinLabel(3, "Food on or Near Campus", southPawObj.linkName);
    $("#POITextBox").hide();
  });
  // Click Listener for Pin Labels
  southPawMarker.addListener('mouseout', function() {
    $("#PinLabel").hide();
  });

  //  ***  The Bottom Line  ***  //
  var theBottomLineMarker = new google.maps.Marker({
    position: {
      lat: 47.610729,
      lng: -122.318657
    },
    icon: icons['foodIcon'].icon,
    map: map,
  });
  // create variable to store b-coloumn link ID
  var theBottomLineLink = document.getElementById('theBottomLine');
  // create object to store Info Box attributes
  var theBottomLineObj = {linkId: theBottomLineLink, linkName: 'The Bottom Line', linkDesc: "If you have a class in Pigott, stop by The Bottom Line for coffee, baked goods, or a hot sandwich. Visit the <a href='https://www.dineoncampus.com/seattleu' target='_blank'>Redhawk Dining website</a> for hours and daily menu."};
  // create dom listener for b-coloumn anchor link
  google.maps.event.addDomListener(theBottomLineLink, 'click', function() {
    map.setZoom(19);
    map.setCenter(theBottomLineMarker.getPosition());
    modifyTextBox(3, theBottomLineObj.linkName, theBottomLineObj.linkDesc);
  });
  // create click listener for marker
  theBottomLineMarker.addListener('click', function() {
    map.setZoom(19);
    map.setCenter(theBottomLineMarker.getPosition());
    modifyTextBox(3, theBottomLineObj.linkName, theBottomLineObj.linkDesc);
    $("#PinLabel").hide();
    openKey(4);
  });
  // create mouseover listener for marker label
  theBottomLineMarker.addListener('mouseover', function() {
    modifyPinLabel(3, "Food on or Near Campus", theBottomLineObj.linkName);
    $("#POITextBox").hide();
  });
  // Click Listener for Pin Labels
  theBottomLineMarker.addListener('mouseout', function() {
    $("#PinLabel").hide();
  });

  //  ***  The Byte  ***  //
  var theByteMarker = new google.maps.Marker({
    position: {
      lat: 47.608912,
      lng: -122.318623
    },
    icon: icons['foodIcon'].icon,
    map: map,
  });
  // create variable to store b-coloumn link ID
  var theByteLink = document.getElementById('theByte');
  // create object to store Info Box attributes
  var theByteObj = {linkId: theByteLink, linkName: 'The Byte', linkDesc: "Located on the second floor of the Lemieux Library, The Byte offers a great place to grab a coffee or snack while studying. Visit the <a href='https://www.dineoncampus.com/seattleu' target='_blank'>Redhawk Dining website</a> for hours and daily menu."};
  // create dom listener for b-coloumn anchor link
  google.maps.event.addDomListener(theByteLink, 'click', function() {
    map.setZoom(19);
    map.setCenter(theByteMarker.getPosition());
    modifyTextBox(3, theByteObj.linkName, theByteObj.linkDesc);
  });
  // create click listener for marker
  theByteMarker.addListener('click', function() {
    map.setZoom(19);
    map.setCenter(theByteMarker.getPosition());
    modifyTextBox(3, theByteObj.linkName, theByteObj.linkDesc);
    $("#PinLabel").hide();
    openKey(4);
  });
  // create mouseover listener for marker label
  theByteMarker.addListener('mouseover', function() {
    modifyPinLabel(3, "Food on or Near Campus", theByteObj.linkName);
    $("#POITextBox").hide();
  });
  // Click Listener for Pin Labels
  theByteMarker.addListener('mouseout', function() {
    $("#PinLabel").hide();
  });

  //  ***  The Side Bar  ***  //
  var theSideBarMarker = new google.maps.Marker({
    position: {
      lat: 47.609565,
      lng: -122.317597
    },
    icon: icons['foodIcon'].icon,
    map: map,
  });
  // create variable to store b-coloumn link ID
  var theSideBarLink = document.getElementById('theSideBar');
  // create object to store Info Box attributes
  var theSideBarObj = {linkId: theSideBarLink, linkName: 'The Sidebar', linkDesc: "While located in the Law School, this cafe is open to all at SU. Known for their grilled cheeses, be sure to check out The Side Bar. Visit the <a href='https://www.dineoncampus.com/seattleu' target='_blank'>Redhawk Dining website</a> for hours and daily menu."};
  // create dom listener for b-coloumn anchor link
  google.maps.event.addDomListener(theSideBarLink, 'click', function() {
    map.setZoom(19);
    map.setCenter(theSideBarMarker.getPosition());
    modifyTextBox(3, theSideBarObj.linkName, theSideBarObj.linkDesc);
  });
  // create click listener for marker
  theSideBarMarker.addListener('click', function() {
    map.setZoom(19);
    map.setCenter(theSideBarMarker.getPosition());
    modifyTextBox(3, theSideBarObj.linkName, theSideBarObj.linkDesc);
    $("#PinLabel").hide();
    openKey(4);
  });
  // create mouseover listener for marker label
  theSideBarMarker.addListener('mouseover', function() {
    modifyPinLabel(3, "Food on or Near Campus", theSideBarObj.linkName);
    $("#POITextBox").hide();
  });
  // Click Listener for Pin Labels
  theSideBarMarker.addListener('mouseout', function() {
    $("#PinLabel").hide();
  });

  //  ***  Student Center Dining Options  ***  //
  var stcnDiningMarker = new google.maps.Marker({
    position: {
      lat: 47.608298,
      lng: -122.318114
    },
    icon: icons['foodIcon'].icon,
    map: map,
  });
  // create variable to store b-coloumn link ID
  var stcnDiningLink = document.getElementById('stcnDining');
  // create object to store Info Box attributes
  var stcnDiningObj = {linkId: stcnDiningLink, linkName: 'Cherry Street Market and The Hawks Nest', linkDesc: "On the second floor of the Student Center, you will find the <strong>Cherry Street Market</strong>, our main dining hall location on campus; serving a variety of breakfast, lunch, and dinner options every day. On the third floor of the Student Center, check out the <strong>Hawk's Nest Bistro</strong>-a great place to grab a late night meal! Visit the <a href='https://www.dineoncampus.com/seattleu' target='_blank'>Redhawk Dining website</a> for hours and daily menu."};
  // create dom listener for b-coloumn anchor link
  google.maps.event.addDomListener(stcnDiningLink, 'click', function() {
    map.setZoom(19);
    map.setCenter(stcnDiningMarker.getPosition());
    modifyTextBox(3, stcnDiningObj.linkName, stcnDiningObj.linkDesc);
  });
  // create click listener for marker
  stcnDiningMarker.addListener('click', function() {
    map.setZoom(19);
    map.setCenter(stcnDiningMarker.getPosition());
    modifyTextBox(3, stcnDiningObj.linkName, stcnDiningObj.linkDesc);
    $("#PinLabel").hide();
    openKey(4);
  });
  // create mouseover listener for marker label
  stcnDiningMarker.addListener('mouseover', function() {
    modifyPinLabel(3, "Food on or Near Campus", stcnDiningObj.linkName);
    $("#POITextBox").hide();
  });
  // Click Listener for Pin Labels
  stcnDiningMarker.addListener('mouseout', function() {
    $("#PinLabel").hide();
  });
  //  *** End of Food/Blue Markers ***  // 
  //  *** End of Google Map JavaScript ***  //
}
//eof
