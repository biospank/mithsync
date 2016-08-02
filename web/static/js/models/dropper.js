import Videosync from '../videosync';
import Session from './session'

var Dropper = {
  init: function(element) {
    Dropzone.autoDiscover = false;

    var dropzone = new Dropzone(element, {
      url: Videosync.apiBaseUrl() + "/images",
      headers: {
        "Authorization" : Videosync.realm + " " + Session.token()
      },
      maxFilesize: 1,
      parallelUploads: 2,
      acceptedFiles: "image/*",
      maxFiles: 5
    });
  }
  // Dropzone.options.dropFile = {
  //   url: function() {
  //     return Videosync.apiBaseUrl() + "/images";
  //   }
  // };
}

export default Dropper;