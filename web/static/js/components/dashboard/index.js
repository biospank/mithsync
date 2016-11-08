import mixinLayout from "../layout/mixin_layout";
import Session from "../../models/session";
import Project from "../../models/project";
import recentProjects from "./recent_projects";
import recentVideos from "./recent_videos";

var dashboard = (function() {

  var content = function(ctrl) {
    return [
      m("section", { class: "row" }, [
        m("article", { class: "col-xs-3 col-sm-3 col-md-3" }, [
          m("div", { class: "box" }, [
            m("h4", { class: "box__title" }, "Create new project"),
            m("div", { class: "text-center" }, [
              m("a", {
                onclick: ctrl.newProject,
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
  };

  return {
    controller: function() {
      var ctrl = this;

      ctrl.newProject = function() {
        swal({
          title: 'Project name',
          input: 'text',
          showCancelButton: true,
          confirmButtonText: 'Create',
          inputValidator: function(value) {
            return new Promise(function(resolve, reject) {
              if (value) {
                resolve();
              } else {
                reject('You need to write something!');
              }
            });
          },
        }).then(function(value) {
          Project.model.name(value);
          Project.create().then(function(data) {
            m.route("/projects");
          })
        }).catch(swal.noop)
      };

      if(Session.isExpired()) {
        m.route("/signin");
      }

    },
    view: mixinLayout(content)
  };
})();

export default dashboard;
