import Project from "../../models/project";

var projectListItem = {
  view: function(ctrl, project){
    return m("li", [
      m("a", {
        href: "",
        onclick: function(event) {
          event.preventDefault();
          Project.current(project);
          m.route("/projects/" + project.id + "/videos");
        },
        class: "projects-list__row"
      }, [
        m(".projects-list__body", [
          m("h5", { class: "title" }, _.truncate(project.name, { length: 15 })),
          m("p", { class: "creation-date" }, moment(project.inserted_at).format('LLL')),
          m("span", {
            class: "videos-number"
          }, project.video_count + (_.gt(project.video_count, 1) ? " videos" : " video"))
        ])
      ])
    ])
  }
}

export default projectListItem;
