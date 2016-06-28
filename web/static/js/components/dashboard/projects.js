var projects = {
  controller: function() {},
  view: function() {
    return m(".ibox", [
      m("h4", { class: "ibox__head" }, "Projects list" ),
      m("p", { class: "ibox__description" }, [
        m("small", "Here, You can get the last 4 projects")
      ]),
      m("div", { class: "ibox__body" }, [
        m("ul", { class: "list-unstyled projects-list" }, [
          m("li", [
            m("a", { href: "", class: "projects-list__content" }, [
              m("h5", { class: "projects-list__head" }, "Project name"),
              m("p", { class: "projects-list__body" }, "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum"),
              m("small", { class: "projects-list__info" }, "16-05-2016")
            ])
          ]),
          m("li", [
            m("a", { href: "", class: "projects-list__content" }, [
              m("h5", { class: "projects-list__head" }, "Project name"),
              m("p", { class: "projects-list__body" }, "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum"),
              m("small", { class: "projects-list__info" }, "16-05-2016")
            ])
          ]),
          m("li", [
            m("a", { href: "", class: "projects-list__content" }, [
              m("h5", { class: "projects-list__head" }, "Project name"),
              m("p", { class: "projects-list__body" }, "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum"),
              m("small", { class: "projects-list__info" }, "16-05-2016")
            ])
          ]),
          m("li", [
            m("a", { href: "", class: "projects-list__content" }, [
              m("h5", { class: "projects-list__head" }, "Project name"),
              m("p", { class: "projects-list__body" }, "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum"),
              m("small", { class: "projects-list__info" }, "16-05-2016")
            ])
          ])
        ])
      ]),
      m("footer", { class: "ibox__footer" }, [
        m("a", { class: "btn btn-success" }, "View all")
      ])
    ]);
  }
}

export default projects;
