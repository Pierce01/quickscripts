importClass(com.terminalfour.media.utils.ImageInfo)

// String conversion needed to be removed since we need the InputStream object type.
function readMedia(mediaID) {
    var oMM = com.terminalfour.media.MediaManager.getManager();
    var oMedia = oMM.get(dbStatement, mediaID, language);
    var oMediaStream = oMedia.getMedia(); // InputStream
    return oMediaStream;
}

var media = readMedia(1376806) // is an InputStream
var info = new ImageInfo // Initializes ImageInfo object
info.setInput(media) // Loads image in ImageInfo class
document.write(info.check() + ' ') // Checks if image has loaded
document.write(info.getWidth()) // Displays width
document.write('x')
document.write(info.getHeight()) // Displays height