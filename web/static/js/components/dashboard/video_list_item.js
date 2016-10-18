var videoListItem = {
  view: function(ctrl, video){
    return m("li", [
      m("a", {
        href: "/projects/" + video.project_id + "/videos/" + video.id + "/edit",
        config: m.route,
        class: "video-list__row media" }, [
        m("figure", { class: "poster media-left" }, [
          m("a", { href: "#" }, [
            m("img", {
              src: _.isEmpty(video.slides) ? '/images/contentplaceholder.png' : _.first(video.slides).thumb_url,
              class: "media-object"
            })
          ])
        ]),
        m("div", { class: "video-list__body media-body" }, [
          m("h5", { class: "title" }, _.truncate(video.title, 10)),
          m("p", { class: "description" }, _.truncate(video.description, 10)),
          m("span", { class: "video-time"}, "number of slides")
        ])
      ])
    ])
  }
}

export default videoListItem;
