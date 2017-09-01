import Project from "../../models/project";

var projectListItem = {
  oninit({attrs}) {
    this.project = attrs.project;
  },
  view({state}){
    return m("li", [
      m(".list media border radius", [
        m("a", {
            href: "#",
            onclick: (event) => {
              console.log(state.project);
              event.preventDefault();
              Project.current(state.project);
              m.route.set("/projects/" + state.project.id + "/videos");
            },
            class: "list__contents"
          }, [
          m("figure", { class: "list__image media-left p-all-side-10 hidden-xs hidden-sm hidden-md" }, [
            m("a", [
              m("img", { src: "/images/icons/folder.svg", class: "media-object", width: "40" })
            ])
          ]),
          m(".list__body media-body", [
            m("h5", { class: "list__body-title text-uppercase pull-left" }, _.truncate(state.project.name, { length: 20 })),
            //m("span", { class: "list__body-summary list__body-summary--space-right10 text-uppercase" }, moment(state.project.inserted_at).format('lll')),
            m("p", { class: "list__body-summary list__body-summary--space-left10 mboth-10 coloured text-uppercase pull-right" }, state.project.video_count + (_.gt(state.project.video_count, 1) ? " videos" : " video"))
          ])
        ])
      ])
    ])
  }
}

export default projectListItem;
