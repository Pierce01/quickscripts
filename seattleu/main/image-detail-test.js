importClass(com.terminalfour.media.IMediaManager);
importClass(com.terminalfour.spring.ApplicationContextProvider)

try {
    // Initializes the new media manager without having to collect and initalize everything ourselves.
    var mediaManager = ApplicationContextProvider.getBean(IMediaManager);
    // Get media
    var media = mediaManager.get(1376806, language)
    // Access media methods
    document.write(media.getName() + ": " + media.getDescription())
}
catch (error) {
  document.write(error);
}