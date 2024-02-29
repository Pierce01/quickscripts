try {
  //Defining main functions
  function processTags(t4Tag) {
    myContent = content || null;
    return String(com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, myContent, language, isPreview, t4Tag));
  }

  function getLayout(contentLayout) {
    var tid = content.getContentTypeID();
    formatter = contentLayout;
    format = publishCache.getTemplateFormatting(dbStatement, tid, formatter);
    formatString = format.getFormatting();
    return processTags(formatString);
  }

  var cityCountryString = function () {
    var cities = content.get('City').getValue().split(',').length;
    var countries = content.get('Country').getValue().split(',').length;
    if (cities > 1 && countries > 1) {
      return 'Multiple locations';
    } else if (cities > 1 && countries == 1) {
      return 'Multiple cities in ' + content.get('Country');
    } else if (cities == 1 && countries > 1) {
      // This would be caused by user error
      return 'Multiple locations';
    } else {
      var city = content.get('City').getValue();
      var country =  content.get('Country').getValue();
      return city == "Various" && country == "Various" 
        ? 'Multiple locations'
        : city + ', ' + country;
    }
  }();

  var list = {};

  list["contentID"] = processTags("<t4 type='meta' meta='content_id' />");
  list["programURL"] = processTags("<t4 type='content' name='Name' output='fulltext' modifiers='striptags,htmlentities' />");
  list["programTitle"] = processTags("<t4 type='content' name='Program Title' output='normal' modifiers='striptags,htmlentities' />");
  list["programDestination"] = content.get('Country').getValue();
  list["programRegion"] = content.get('Region').getValue() == '' ? 'Multiple Regions' : content.get('Region').getValue();
  list["programType"] = content.get('Program Type').getValue();
  list["programFee"] = content.get('Program Fee').getValue();
  list["programTerm"] = content.get('Terms').getValue();
  list["programFeatures"] = content.get('Additional Features').getValue();
  list["programFieldofStudy"] = content.get('Disciplines').getValue();
  list["programProvider"] = content.get('Program Provider').getValue();
  list["programCityCountry"] = String(cityCountryString)

  var jsonObj = new org.json.JSONObject(list);
  document.write(jsonObj.toString() + ',');
} catch (err) {
  document.write(err);
}
