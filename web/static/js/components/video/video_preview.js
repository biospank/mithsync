import preview from './preview';

var videoPreview = (function() {
  var currentVideo, currentSlides = undefined;

  return {
    show: function(video, slides) {
      currentVideo = video;
      currentSlides = slides;
      $("#videoPreview").fadeIn( "fast" );
    },
    controller: function() {
      return {

      };
    },
    view: function() {
      return m(".modal image-modal-lg", {
        "tabindex": "-1",
        "role": "dialog",
        "id": "videoPreview"
      }, [
        m(".modal-dialog modal-lg", {
          role: "document",
          class: "bounceIn animated"
        }, [
          m(".modal-content", [
            m(".modal-header", [
              m("button.close", {
                onclick: function() {
                  $("#videoPreview").hide();
                }
              }, [
                m("span", { "aria-hidden": "true" }, m.trust("&times"))
              ]),
              m("h4.modal-title", "Video preview")
            ]),
            m(".modal-body", [
              currentVideo ? m(preview, currentVideo, currentSlides) : ""
            ])
          ])
        ])
      ])
    }
  }
})();

export default videoPreview;
