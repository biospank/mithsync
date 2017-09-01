import preview from './preview';

const videoPreview = (() => {
  return {
    show() {
      preview.reinitSlider();
      $("#videoPreview").fadeIn( "fast" );
    },
    oninit({attrs}) {
      this.video = attrs.video;
      this.slides = attrs.slides;
    },
    view({state}) {
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
                onclick: () => {
                  preview.pause();
                  $("#videoPreview").hide();
                }
              }, [
                m("span", { "aria-hidden": "true" }, m.trust("&times"))
              ]),
              m("h4.modal-title", "Preview")
            ]),
            m(".modal-body", { class: "p-all-side-0" }, [
              m(preview, {video: state.video, slides: state.slides})
            ])
          ])
        ])
      ])
    }
  };
})();

export default videoPreview;
