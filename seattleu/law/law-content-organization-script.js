/*  Content reorganization script 

 Determines section order of all page elements with .contentItem class (which should be all content 
 items), and applies a data-order attribute. Creates arrays of every content item based on the
 data-position-selected or data-position-default attributes. Manipulates the DOM to move those content
 items to the correct Zone based on the size of the screen.
 
  Based on contentOrganization.js for v9.

  Runs on Law pages with a footer. 

  Media Library ID: 848732
 
*/
var currentPageWidth = "xs"; //default since all content loads in ZoneA until moved into B or C
var siteNavCurrentlyInSidebarZone = false;
var siteNavCurrentlyInTopZone = false;
var siteNavOriginallyInSidebarZone = false;
var siteNavOriginallyInTopZone = false;


/* create arrays of all content items and determine which zone they belong 
   in based on data-position-selected or data-position-default attributes */
var listOfAllContentItems = $(".contentItem");
var MainZoneContentItems = $.fn.add.call($(".contentItem[data-position-selected='Main']"), $(".contentItem[data-position-default='Main'][data-position-selected='']"));
var SidebarZoneContentItems = $.fn.add.call($(".contentItem[data-position-selected='Sidebar']"), $(".contentItem[data-position-default='Sidebar'][data-position-selected='']"));

/* function to determine the width of the page. Will run on page load 
   (line 45 below) and whenever the page is resized (reference in page layout) 
   result stored as bootsrap class (string) because it's easier to follow the 
   code logic below. */
function determinePageWidth() {
    if (window.innerWidth < 768) {
        currentPageWidth = "xs";
    } else if (window.innerWidth < 992 && $(this).width() > 767) {
        currentPageWidth = "sm";
    } else if (window.innerWidth >= 992) {
        currentPageWidth = "md-lg";
    } else {
        console.log("Width not determined.");
    }
}

/* function to move the site nav to the top zone and toggle the appropriate variables */
function moveNavToTopZone() {
    $("#SidebarZone #siteNavigationWrapper").appendTo("#TopZone");
    siteNavCurrentlyInSidebarZone = false;
    siteNavCurrentlyInTopZone = true;
}

// append sequentially-numbered data-order attribute to all .contentItem(s)
var i = 0;
$('.contentItem').each(function() {
    i++;
    $(this).attr('data-order', i);
    $(this).val(i);
});

determinePageWidth();

// Sort all the content items by data-order and put into arrays
listOfAllContentItems.sort(function(a, b) {
    return $(a).data("order") - $(b).data("order")
});
MainZoneContentItems.sort(function(a, b) {
    return $(a).data("order") - $(b).data("order")
});
SidebarZoneContentItems.sort(function(a, b) {
    return $(a).data("order") - $(b).data("order")
});

// sitenav location is determined upon page load by nav objects
if ($("#SidebarZone #siteNavigationWrapper").length) {
    siteNavOriginallyInSidebarZone = true;
    siteNavCurrentlyInSidebarZone = true;
    $("#SidebarZone #siteNavigationWrapper #siteNavigationTitle button").attr("aria-expanded", "true");
    $("#SidebarZone #siteNavigationWrapper ul#menu").addClass("show");
} else if ($("#TopZone #siteNavigationWrapper").length) {
    siteNavOriginallyInTopZone = true;
    siteNavCurrentlyInTopZone = true;
} else { // sitenav is turned off 
}

// Assign content to zones based on page width     
if (currentPageWidth == "xs") {
    /* xs */
    if (siteNavCurrentlyInSidebarZone) {
        moveNavToTopZone();
    }
    $("#SidebarZone").hide();
} else if (currentPageWidth == "sm") {
    /* if sm: put SidebarZone content items in SidebarZone. */
    $("#MainZone").addClass("col-sm-12");
    if (siteNavCurrentlyInSidebarZone) {
        moveNavToTopZone();
        $("#SidebarZone").hide();
    }
    if ((SidebarZoneContentItems.length > 0)) {
        /* and if something in SidebarZone */
        //$("#MainZone").removeClass("col-sm-12").addClass("col-sm-8");
        //$("#SidebarZone").show().addClass("col-sm-4").append(SidebarZoneContentItems); 
    } else {
        /* no SidebarZone content */
        $("#SidebarZone").hide();
        $("#MainZone").addClass("col-sm-12");
    }
} else if (currentPageWidth == "md-lg") {
    /* if md and lg: put content items in SidebarZone */
    if (siteNavCurrentlyInSidebarZone) {
        $("#SidebarZone").addClass("col-md-4"); /* do no matter what */
        //if ((SidebarZoneContentItems.length == 0)){ /* no SidebarZone content */
        $("#MainZone").addClass("col-md-8");
        $("#SidebarZone").show().append(SidebarZoneContentItems).addClass("col-md-4");

    } else {
        /* menu is in the topzone or nonexistent */

        if (SidebarZoneContentItems.length == 0) {
            /* no SidebarZone content */
            $("#MainZone").addClass("col-md-12");
            $("#SidebarZone").hide();
        } else if (SidebarZoneContentItems.length > 0) {
            /* if something in SidebarZone*/
            $("#MainZone").addClass("col-md-8");
            $("#SidebarZone").show().append(SidebarZoneContentItems).addClass("col-md-4");
        }

    }
}

/* function that reorgaizes content on the page based on screen width using 
   arrays of content items from above into the correct zones */
function reorganizeContentItems() {
    determinePageWidth()
    if (currentPageWidth == "xs") {
        if (siteNavCurrentlyInSidebarZone) {
            moveNavToTopZone();
        }
        $("#MainZone").append(listOfAllContentItems);
        $("#SidebarZone").hide();
    } else if (currentPageWidth == "sm") {
        console.log("currentPageWidth");
        if (siteNavCurrentlyInSidebarZone) {
            moveNavToTopZone();
        }
        $("#MainZone").append(listOfAllContentItems);
        $("#SidebarZone").hide();
        //$("#SidebarZone").hide(); /* do no matter what */
        if ((SidebarZoneContentItems.length > 0)) {
            /* if something in SidebarZone */
            //$("#MainZone").removeClass("col-sm-12").addClass("col-sm-8");
            //$("#SidebarZone").show().addClass("col-sm-4").append(SidebarZoneContentItems); 
        } else {
            /* no SidebarZone content */
            $("#SidebarZone").hide();
            $("#MainZone").addClass("col-sm-12");
        }
    } else if (currentPageWidth == "md-lg") {
        console.log("currentPageWidth");
        if (siteNavOriginallyInSidebarZone) {
            /* menu in SidebarZone */
            if (siteNavCurrentlyInTopZone) {
                /* move menu to SidebarZone if it isnt already there */
                $("#TopZone #siteNavigationWrapper").appendTo("#SidebarZone");
                siteNavCurrentlyInSidebarZone = true;
                siteNavCurrentlyInTopZone = false;
                //$("#SidebarZone").show().addClass("col-md-3"); 
            }
            $("#MainZone").addClass("col-md-8");

            $("#SidebarZone").show().append(SidebarZoneContentItems).addClass("col-md-4");

        } else {
            /* menu is in the topzone or otherwise nonexistent */
            if ((SidebarZoneContentItems.length == 0)) {
                /* no zone C content, no zone B content */
                $("#MainZone").append(MainZoneContentItems).addClass("col-md-12");
                $("#SidebarZone").hide();
            } else if ((SidebarZoneContentItems.length > 0)) {
                /* if something in SidebarZone */
                $("#SidebarZone").show().addClass("col-md-4").append(SidebarZoneContentItems);

                $("#MainZone").addClass("col-md-8");
                //    $("#SidebarZone").append(SidebarZoneContentItems);	
            }
        }
    } else {
      console.log("currentPageWidth function did not run");
    }
}

window.addEventListener('resize', () => reorganizeContentItems())