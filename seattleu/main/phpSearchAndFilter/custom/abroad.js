// PSL
var version="23.0";eval(function(version){var minImports=JavaImporter(com.terminalfour.media.IMediaManager,com.terminalfour.spring.ApplicationContextProvider,com.terminalfour.version.Version);with(minImports){var mm=ApplicationContextProvider.getBean(IMediaManager),media=mm.get(3101315,language,new Version(version)).getMedia(),s=new java.util.Scanner(media).useDelimiter("\\A");return String(s.hasNext()?s.next():"");}}(version));

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

  var mediaManager = ApplicationContextProvider.getBean(IMediaManager);
  var imageObj = function () {
    var libraryImage = content.get('Web Image ID number') == '' ? null : content.get('Web Image ID number');
    if (libraryImage) {
      var resolved = getValueFromT4Tag("<t4 type='media' formatter='path/*' id='" + libraryImage + "' />");
      return {
        url: resolved.content,
        description: mediaManager.get(libraryImage, language).getDescription()
      };
    } else {
      return {
        url: 'https://i.imgur.com/UNoVLwX.png',
        description: 'No image provided'
      };
    }
  }();
  
  function getPrices(strPrice) {
    var prices = [], splitPrice = String(strPrice).split('|');
    for (var i = 0; i < splitPrice.length; i++) {
      var price = (splitPrice[i].toLocaleLowerCase()).trim();
      if (price == 'tbd' || price == 'n/a') {
        prices.push("$0");
      }
      price = price.split(':');
      if (price.length <= 1) continue;
      prices.push(price[1]);
    }
    prices.sort();
    // return String(prices.length > 1 ? prices[0] + "-" + prices[prices.length - 1] : prices[0]) 
    return String(prices[0]);
  }

  var list = {};

  list["contentID"] = processTags("<t4 type='meta' meta='content_id' />");
  list["programURL"] = processTags("<t4 type='content' name='Name' output='fulltext' modifiers='striptags,htmlentities' />");
  list["programTitle"] = processTags("<t4 type='content' name='Program Title' output='normal' modifiers='striptags,htmlentities' />");
  list["programImageURL"] = imageObj.url;
  list["programImageDescription"] = imageObj.description;
  list["programDestination"] = content.get('Country').getValue();
  list["programRegion"] = content.get('Region').getValue() == '' ? 'Multiple Regions' : content.get('Region').getValue();
  list["programType"] = content.get('Program Type').getValue();
  list["programFee"] = getPrices(content.get('Program Fee').getValue());
  list["programTerm"] = content.get('Terms').getValue();
  list["programFeatures"] = content.get('Additional Features').getValue();
  list["programFieldofStudy"] = content.get('Disciplines').getValue();
  list["programProvider"] = content.get('Program Provider').getValue();
  list["programCityCountry"] = String(cityCountryString);

  var jsonObj = new org.json.JSONObject(list);
  document.write(jsonObj.toString() + ',');
} catch (err) {
  document.write(err);
}
