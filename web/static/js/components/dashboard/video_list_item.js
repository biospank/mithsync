var videoListItem = {
  view: function(ctrl, video){
    return m("li", [
      m(".video-list__row", [
        m("a", {
          href: "/projects/" + video.project_id + "/videos/" + video.id + "/edit",
          config: m.route,
          class: "video-list__body media" }, [
          m("figure", { class: "poster media-left" }, [
            m("a", { href: "#" }, [
              m("img", {
                src: _.isEmpty(video.slides) ? '/images/placeholder-no-image.png' : _.first(video.slides).thumb_url,
                class: "media-object"
              })
            ])
          ]),
          m("div", { class: "media-body" }, [
            m("h5", { class: "title" }, _.truncate(video.title, 10)),
            m("p", { class: "description" }, _.truncate(video.description, 10)),
            m("span", {
              class: "video-time"
            }, video.slide_count + (_.gt(video.slide_count, 1) ? " slides" : " slide"))
          ])
        ])
      ])
    ])
  }
}

export default videoListItem;
