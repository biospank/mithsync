import mixinLayout from "../layout/mixin_layout";
import searchForm from "../widgets/search_form";
import pagination from "../widgets/pagination";
import listItem from "./list_item";
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

    ctrl.projects = m.prop([]);
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
      return ctrl.projects().map(function(project) {
        return m(listItem, project, ctrl);
      })
    };

    ctrl.getProjects(
      ctrl.pageInfo.defaultParams || {},
      ctrl.requestOptions
    );

  },
  view: mixinLayout(function(ctrl) {
    return m("div", [
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
        ])
      ]),
      m("ul", { class: "list-unstyled projects-list" }, [
        _.isEmpty(ctrl.projects()) ? m("li", {}, [
          m(recordNotFound)
        ]) : ctrl.showProjects()
      ]),
      m("div", { class: "clearfix" }, [
        m("div", { class: "pull-left" }, [
          paginate(ctrl)
        ])
      ])
    ]);
  })
};

export default projectList;
