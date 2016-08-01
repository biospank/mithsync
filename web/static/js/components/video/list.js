var videoList = {
  controller: function() {},
  view: function() {
    return m("ul", { class: "list-unstyled projects-list" }, [
      m("li", [
        m("div", { class: "projects-list__content" }, [
          m("h5", { class: "projects-list__head" }, "Project name"),
          m("p", { class: "projects-list__body" }, "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum"),
          m("small", { class: "projects-list__info" }, "16-05-2016"),
          m("div", [
            m("a", { href: "/video/view", class: "btn btn-default", config: m.route }, "View"),
            m("a", { href: "/video/edit", class: "btn btn-default", config: m.route }, "Edit")
          ])
        ])
      ]),
      m("li", [
        m("div", { class: "projects-list__content" }, [
          m("h5", { class: "projects-list__head" }, "Project name"),
          m("p", { class: "projects-list__body" }, "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum"),
          m("small", { class: "projects-list__info" }, "16-05-2016"),
          m("div", [
            m("a", { href: "/video/view", class: "btn btn-default", config: m.route }, "View"),
            m("a", { href: "/video/edit", class: "btn btn-default", config: m.route }, "Edit")
          ])
        ])
      ]),
      m("li", [
        m("div", { class: "projects-list__content" }, [
          m("h5", { class: "projects-list__head" }, "Project name"),
          m("p", { class: "projects-list__body" }, "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum"),
          m("small", { class: "projects-list__info" }, "16-05-2016"),
          m("div", [
            m("a", { href: "/video/view", class: "btn btn-default", config: m.route }, "View"),
            m("a", { href: "/video/edit", class: "btn btn-default", config: m.route }, "Edit")
          ])
        ])
      ]),
      m("li", [
        m("div", { class: "projects-list__content" }, [
          m("h5", { class: "projects-list__head" }, "Project name"),
          m("p", { class: "projects-list__body" }, "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum"),
          m("small", { class: "projects-list__info" }, "16-05-2016"),
          m("div", [
            m("a", { href: "/video/view", class: "btn btn-default", config: m.route }, "View"),
            m("a", { href: "/video/edit", class: "btn btn-default", config: m.route }, "Edit")
          ])
        ])
      ])
    ]);
  }
}

export default videoList;
