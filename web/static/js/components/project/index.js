import mixinLayout from "../layout/mixin_layout";
import searchForm from "../widgets/search_form";
import pagination from "../widgets/pagination";
import listItem from "./list_item";
import loader from "../widgets/loader";
import recordNotFound from "../widgets/404";
import Session from "../../models/session";
import Project from "../../models/project";

var paginate = function(ctrl) {
  return m.component(pagination,
    _.assign(
      ctrl.pageInfo,
      {
        xhr: function(params) {
          ctrl.getProjects(params, ctrl.requestOptions);
        },
        defaultParams: {
          filter: ctrl.filter()
        }
      }
    )
  );
}

var projectList = {
  controller: function() {
    var ctrl = this;

    ctrl.projects = m.prop(undefined);
    ctrl.errors = m.prop({});
    ctrl.filter = m.prop("");
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

    if(Session.isExpired()) {
      m.route("/signin");
    }

    ctrl.getProjects = function(params, args) {
      return Project.all(params, args).then(function(projects) {
        ctrl.projects(projects);
      }, function(response) {
        ctrl.errors(response.errors);
      })
    };

    ctrl.showProjects = function() {
      if(!ctrl.projects()) {
        return m(loader);
      } else {
        if(_.isEmpty(ctrl.projects())) {
           return m(recordNotFound);
        } else {
          return ctrl.projects().map(function(project) {
            return m(listItem, project, ctrl);
          })
        }
      }
    };

    ctrl.updateProject = function(project) {
      Project.update(project.id).then(function(response) {
        var index = _.findIndex(ctrl.projects(), { id: response.data.id })
        ctrl.projects()[index] = response.data;
      });
    };

    ctrl.deleteProject = function(project) {
      return Project.delete(project.id).then(function() {
        m.route('/projects');
      }, function(response) {
        ctrl.errors(response.errors);
      })
    };

    ctrl.getProjects(
      ctrl.pageInfo.defaultParams || {},
      ctrl.requestOptions
    );

  },
  view: mixinLayout(function(ctrl) {
    return [
      m("div", { class: "clearfix" }, [
        m("div", { class: "pull-left" }, [
          m(searchForm, {
            action: function(event) {
              event.preventDefault();

              ctrl.getProjects(
                _.assign(
                  ctrl.pageInfo.defaultParams || {},
                  { page: 1 }
                ), ctrl.requestOptions
              );
            },
            filter: ctrl.filter
          })
        ]),
        m("div", { class: "pull-right" }, [
          m("button", {
            class: "btn btn-success btn-md",
            onclick: function() {
              swal({
                title: 'Project name',
                input: 'text',
                showCancelButton: true,
                showCloseButton: true,
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
            }
          }, "New project")
        ])
      ]),
      m("ul", { class: "list-unstyled projects-list" }, [
        ctrl.showProjects()
      ]),
      m("div", { class: "clearfix" }, [
        m("div", { class: "pull-left" }, [
          paginate(ctrl)
        ])
      ])
    ]
  })
};

export default projectList;
