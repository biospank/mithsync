var recentVideo = {
  controller: function() {},
  view: function() {
    return m("ul", { class: "list-unstyled projects-list" }, [
      m("li", [
        m("a", { href: "/video/view", config: m.route, class: "projects-list__content" }, [
          m("h5", { class: "projects-list__head" }, "Project name"),
          m("p", { class: "projects-list__body" }, "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum"),
          m("small", { class: "projects-list__info" }, "16-05-2016")
        ])
      ]),
      m("li", [
        m("a", { href: "/video/view", config: m.route, class: "projects-list__content" }, [
          m("h5", { class: "projects-list__head" }, "Project name"),
          m("p", { class: "projects-list__body" }, "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum"),
          m("small", { class: "projects-list__info" }, "16-05-2016")
        ])
      ]),
      m("li", [
        m("a", { href: "/video/view", config: m.route, class: "projects-list__content" }, [
          m("h5", { class: "projects-list__head" }, "Project name"),
          m("p", { class: "projects-list__body" }, "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum"),
          m("small", { class: "projects-list__info" }, "16-05-2016")
        ])
      ]),
      m("li", [
        m("a", { href: "/video/view", config: m.route, class: "projects-list__content" }, [
          m("h5", { class: "projects-list__head" }, "Project pippo"),
          m("p", { class: "projects-list__body" }, "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum"),
          m("small", { class: "projects-list__info" }, "16-05-2016")
        ])
      ])
    ]);
  }
}

export default recentVideo;
