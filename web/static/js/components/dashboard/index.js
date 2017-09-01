import mixinLayout from "../layout/mixin_layout";
import Session from "../../models/session";
import Project from "../../models/project";
import recentProjects from "./recent_projects";
import recentVideos from "./recent_videos";

const dashboard = (() => {
  const content = ({state}) => {
    return [
      m("section", { class: "row" }, [
        m("article", { class: "col-xs-3 col-sm-3 col-md-3" }, [
          m("div", { class: "box border radius" }, [
            m("h4", { class: "box__title" }, "Create new project"),
            m("div", { class: "text-center" }, [
              m("a", {
                onclick: state.newProject,
                class: "btn btn-none",
                href: "#" }, [
                m("img", { src: "/images/icons/add.png" })
              ])
            ])
          ])
        ]),
        m(recentProjects),
        m(recentVideos)
      ])
    ];
  }

  return {
    oninit(vnode) {
      this.newProject = (event) => {
        event.preventDefault();
        
        swal({
          title: 'Project name',
          input: 'text',
          showCancelButton: true,
          confirmButtonText: 'Create',
          inputValidator: (value) => {
            return new Promise((resolve, reject) => {
              if (value) {
                resolve();
              } else {
                reject('You need to write something!');
              }
            });
          },
        }).then((value) => {
          Project.model.name(value);
          Project.create().then((data) => {
            m.route.set("/projects");
          })
        }).catch(swal.noop)
      };

      if(Session.isExpired()) {
        m.route.set("/signin");
      }

    },
    view: mixinLayout(content)
  };

})();

export default dashboard;
