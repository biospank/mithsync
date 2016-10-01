import Project from "../../models/project";

var listItem = {
  view: function(ctrl, project){
    ctrl.project = project;

    return m("li", [
      m("div", { class: "projects-list__content" }, [
        m(".projects-list__body clearfix", [
          m("a", {
            href: "/projects/" + project.id + "/videos",
            config: m.route
          }, [
            m("h5", { class: "projects-list__title" }, [
              project.name,
              m("small", { class: "projects-list__date" }, "Created at: " + "16-05-2016")
            ])
          ])
        ])
      ])
    ]);
  }
}

export default listItem;
