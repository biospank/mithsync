import Videosync from '../videosync';
import Session from './session'

var Dropper = {
  init: function(element, opts) {
    this.opts = opts;
    Dropzone.autoDiscover = false;

    var dropzone = new Dropzone(element, {
      url: Videosync.apiBaseUrl() +
        "/projects/" + this.opts.urlParams['projectId'] +
        "/videos/" + this.opts.urlParams['videoId'] + "/images",
      headers: {
        "Authorization" : Videosync.realm + " " + Session.token()
      },
      maxFilesize: 1,
      parallelUploads: 5,
      acceptedFiles: "image/*",
      maxFiles: 20
    });

    dropzone.on("queuecomplete", function(event) {
      if(this.opts.onQueueComplete)
        this.opts.onQueueComplete();
    }.bind(this));

    dropzone.on("success", function(file) {
      _.delay(function(file) {
        dropzone.removeFile(file);
      }, 3000, file);
    });
  }
  // Dropzone.options.dropFile = {
  //   url: function() {
  //     return Videosync.apiBaseUrl() + "/images";
  //   }
  // };
}

export default Dropper;
