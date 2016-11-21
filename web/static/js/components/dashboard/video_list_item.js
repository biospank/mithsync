import Video from "../../models/video";
import Clippy from "../../models/clippy";

var videoListItem = {
  controller: function() {
    return {
      initClipboard: function(element, isInit, context) {
        if(!isInit) {
          Clippy.init(element);
        }
      }
    };
  },
  view: function(ctrl, video){
    return m("li", [
      m(".video-list__row media", [
        m("a", {
          href: "",
          onclick: function(event) {
            event.preventDefault();
            Video.current(video);
            m.route("/projects/" + video.project_id + "/videos/" + video.id + "/edit");
          },
          class: "video-list__body" }, [
          m("figure", { class: "poster media-left" }, [
            m("a", { href: "#" }, [
              m("img", {
                src: _.isEmpty(video.slides) ? '/images/thumb-placeholder.png' : _.first(video.slides).thumb_url,
                class: "media-object",
                width: "53"
              })
            ])
          ]),
          m("div", { class: "media-body" }, [
            m("h5", { class: "title" }, _.truncate(video.title, { length: 25 })),
            m("p", { class: "description mb-0" }, _.truncate(video.description, { length: 30 }))
            // m("span", {
            //   class: "video-slide"
            // }, video.slide_count + (_.gt(video.slide_count, 1) ? " slides" : " slide"))
          ])
        ]),
        m(".video-list__buttons dashboard", [
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
