import Project from "../../models/project";

var projectListItem = {
  view: function(ctrl, project){
    return m("li", [
      m(".list media", [
        m("a", {
            href: "#",
            onclick: function(event) {
              event.preventDefault();
              Project.current(project);
              m.route("/projects/" + project.id + "/videos");
            },
            class: "list__contents"
          }, [
          m("figure", { class: "list__image media-left p-all-side-10 hidden-xs hidden-sm hidden-md" }, [
            m("a", [
              m("img", { src: "/images/icons/folder.svg", class: "media-object", width: "40" })
            ])
          ]),
          m(".list__body media-body", [
            m("h5", { class: "list__body-title text-uppercase pull-left" }, _.truncate(project.name, { length: 20 })),
            //m("span", { class: "list__body-summary list__body-summary--space-right10 text-uppercase" }, moment(project.inserted_at).format('lll')),
            m("p", { class: "list__body-summary list__body-summary--space-left10 mboth-10 coloured text-uppercase pull-right" }, project.video_count + (_.gt(project.video_count, 1) ? " videos" : " video"))
          ])
        ])
      ])
    ])
  }
}

export default projectListItem;
