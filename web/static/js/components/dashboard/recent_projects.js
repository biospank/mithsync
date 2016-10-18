import Project from "../../models/project";
import projectListItem from "./project_list_item";

var recentProjects = {
  controller: function() {
    var ctrl = this;

    ctrl.projects = m.prop([]);
    ctrl.errors = m.prop({});
    ctrl.pageInfo = {};

    ctrl.requestOptions = {
      unwrapSuccess: function(response) {
        if(response) {
          ctrl.pageInfo = {
            totalEntries: response.total_entries,
            totalPages: response.total_pages,
            pageNumber: response.page_number
          };
          return response.data;
        }
      },
      unwrapError: function(response) {
        return response.error;
      }
    };

    ctrl.getRecentProjects = function(args) {
      return Project.recent(args).then(function(projects) {
        ctrl.projects(projects);
      }, function(response) {
        ctrl.errors(response.errors);
      })
    };

    ctrl.showProjects = function() {
      return ctrl.projects().map(function(project) {
        return m(projectListItem, project);
      })
    };

    ctrl.getRecentProjects(ctrl.requestOptions);
  },
  view: function(ctrl) {
    return m("article", { class: "col-xs-4 col-sm-4 col-md-4" }, [
      m("div", { class: "box" }, [
        m("h4", { class: "box__title" }, "Projects"),
        m("div", { class: "box__counter" }, [
          m("span", { class: "box__counter-number" }, ctrl.pageInfo.totalEntries || 0),
          m("p", { class: "box__counter-text" }, m.trust("You’ve got " + (ctrl.pageInfo.totalEntries || 0) + "<br>projects"))
        ])
      ]),
      m("ol", { class: "projects-list list-unstyled" }, [
        _.isEmpty(ctrl.projects()) ? "" : ctrl.showProjects()
      ])
    ])
  }
};

export default recentProjects;
