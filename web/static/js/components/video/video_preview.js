import preview from './preview';

var videoPreview = {
  show: function() {
    $("#videoPreview").fadeIn( "fast" );
  },
  view: function(ctrl, video, slides) {
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
          m(".modal-body", [
            m(preview, video, slides)
          ])
        ])
      ])
    ])
  }
};

export default videoPreview;
