import preview from './preview';

var videoPreview = (function() {
  var previewSlides = [];

  return {
    show: function() {
      preview.reinitSlider();
      $("#videoPreview").fadeIn( "fast" );
    },
    view: function(ctrl, video, slides) {
      previewSlides = slides
      return m(".modal image-modal-lg", {
        "tabindex": "-1",
        "role": "dialog",
        "id": "videoPreview"
      }, [
        m(".modal-dialog modal-lg", {
          role: "document"
          // class: "bounceIn animated"
        }, [
          m(".modal-content", [
            m(".modal-header", [
              m("button.close", {
                onclick: function() {
                  preview.pause();
                  $("#videoPreview").hide();
                }
              }, [
                m("span", { "aria-hidden": "true" }, m.trust("&times"))
              ]),
              m("h4.modal-title", "Preview")
            ]),
            m(".modal-body", { class: "p-all-side-0" }, [
              m(preview, video, previewSlides)
            ])
          ])
        ])
      ])
    }
  };
})();

export default videoPreview;
