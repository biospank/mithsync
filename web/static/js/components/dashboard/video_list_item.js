import Video from "../../models/video";
import Clippy from "../../models/clippy";

var videoListItem = {
  controller: function(video) {
    return {
      initClipboard: function(element, isInit, context) {
        if(!isInit) {
          Clippy.init(element, video);
        }
      }
    };
  },
  view: function(ctrl, video){
    return m("li", [
      m(".list media", [
        m("a", {
          href: "",
          onclick: function(event) {
            event.preventDefault();
            Video.current(video);
            m.route("/projects/" + video.project_id + "/videos/" + video.id + "/edit");
          },
          class: "list__contents" }, [
          m("figure", { class: "list__image media-left border-right hidden-xs hidden-sm hidden-md" }, [
            m("a", [
              m("img", {
                src: _.isEmpty(video.slides) ? '/images/thumb-placeholder.png' : _.first(video.slides).thumb_url,
                class: "media-object",
                width: "56"
              })
            ])
          ]),
          m(".list__body media-body", [
            m("h5", { class: "list__body-title mboth-0 text-uppercase" }, _.truncate(video.title, { length: 25 })),
            m("p", { class: "list__body-description mb-0 text-uppercase" }, _.truncate(video.description, { length: 30 }))
          ])
        ]),
        m(".list__buttons list__buttons--32", [
          m("a", {
            href: "#",
            class: "btn btn-default btn-square btn-square--32",
            config: ctrl.initClipboard,
            onclick: function(e) {
              e.preventDefault();
            }
          }, [
            m("i", {
              class: "fa fa-code",
              "aria-hidden": true
            })
          ])
        ])
      ])
    ])
  }
}

export default videoListItem;
