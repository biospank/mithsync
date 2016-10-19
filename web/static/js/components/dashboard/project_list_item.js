var projectListItem = {
  view: function(ctrl, project){
    return m("li", [
      m("a", {
        href: "/projects/" + project.id + "/videos",
        config: m.route,
        class: "projects-list__row"
      }, [
        m(".projects-list__body", [
          m("h5", { class: "title" }, _.truncate(project.name, 10)),
          m("p", { class: "creation-date" }, "5 Febbraio 2015"),
          m("span", {
            class: "videos-number"
          }, project.video_count + (_.gt(project.video_count, 1) ? " videos" : " video"))
        ])
      ])
    ])
  }
}

export default projectListItem;
