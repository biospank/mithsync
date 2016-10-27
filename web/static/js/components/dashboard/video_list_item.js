import Video from "../../models/video";

var videoListItem = {
  view: function(ctrl, video){
    return m("li", [
      m(".video-list__row", [
        m("a", {
          href: "",
          onclick: function(event) {
            event.preventDefault();
            Video.current(video);
            m.route("/projects/" + video.project_id + "/videos/" + video.id + "/edit");
          },
          class: "video-list__body media" }, [
          m("figure", { class: "poster media-left" }, [
            m("a", { href: "#" }, [
              m("img", {
                src: _.isEmpty(video.slides) ? '/images/thumb-placeholder.png' : _.first(video.slides).thumb_url,
                class: "media-object"
              })
            ])
          ]),
          m("div", { class: "media-body" }, [
            m("h5", { class: "title" }, _.truncate(video.title, { length: 25 })),
            m("p", { class: "description" }, _.truncate(video.description, { length: 30 })),
            m("span", {
              class: "video-slide"
            }, video.slide_count + (_.gt(video.slide_count, 1) ? " slides" : " slide"))
          ])
        ])
      ])
    ])
  }
}

export default videoListItem;
