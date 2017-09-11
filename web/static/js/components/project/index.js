import mixinLayout from "../layout/mixin_layout";
import searchForm from "../widgets/search_form";
import Pagination from "../widgets/pagination";
import listItem from "./list_item";
import loader from "../widgets/loader";
import recordNotFound from "../widgets/404";
import Session from "../../models/session";
import Project from "../../models/project";
import User from "../../models/user";

var paginate = function(state) {
  return m(new Pagination(),
    _.assign(
      state.pageInfo,
      {
        xhr: function(params) {
          state.getProjects(params, state.requestOptions);
        },
        defaultParams: {
          filter: state.filter()
        }
      }
    )
  );
}

var projectList = {
  oninit(vnode) {
    this.projects = m.stream(undefined);
    this.errors = m.stream({});
    this.filter = m.stream("");
    this.pageInfo = {};

    this.unwrapSuccess = (response) => {
      if(response) {
        this.pageInfo = {
          totalEntries: response.total_entries,
          totalPages: response.total_pages,
          pageNumber: response.page_number
        };

        return response;
      }
    };

    if(Session.isExpired()) {
      m.route.set("/signin");
    }

    this.getProjects = (params) => {
      return Project.all(params).then(this.unwrapSuccess).then((response) => {
        this.projects(response.data);
      }, (e) => {
        this.errors(JSON.parse(e.message).errors);
      })
    };

    this.showProjects = () => {
      if(!this.projects()) {
        return m(loader);
      } else {
        if(_.isEmpty(this.projects())) {
           //return m(recordNotFound);
        } else {
          return this.projects().map(function(project) {
            return m(listItem, {key: project.id, project: project, parent: vnode.state});
          })
        }
      }
    };

    this.updateProject = (project) => {
      Project.update(project.id).then((response) => {
        let newProjectList = _.map(this.projects(), (prj) => {
          if(prj.id === response.data.id)
            prj.name = response.data.name;

          return prj;
        })
        this.projects(newProjectList);
      });
    };

    this.deleteProject = (project) => {
      return Project.delete(project.id).then(() => {
        User.getCurrent().then((response) => {
          User.current(response.data);
        });
        // m.route.set('/projects');
        // to reload the same url use {state: {key: Date.now()}}
        m.route.set(m.route.get(), null, {state: {key: Date.now()}});
      }, (e) => {
        this.errors(JSON.parse(e.message).errors);
      })
    };

    if(_.isEmpty(User.current())) {
      User.getCurrent().then((response) => {
        User.current(response.data);
      });
    }

    this.getProjects(this.pageInfo.defaultParams || {});

  },
  view: mixinLayout(({state}) => {
    return [
      m("div", { class: "clearfix mb-25" }, [
        m("div", { class: "pull-left" }, [
          m(searchForm, {
            action: (event) => {
              event.preventDefault();

              state.getProjects(
                _.assign(
                  state.pageInfo.defaultParams || {},
                  { page: 1 }
                ), state.requestOptions
              );
            },
            filter: state.filter
          })
        ]),
        m("div", { class: "pull-right" }, [
          m("button", {
            class: "btn btn-success btn-md",
            onclick: () => {
              swal({
                title: 'Project name',
                input: 'text',
                showCancelButton: true,
                showCloseButton: true,
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
                Project.create().then(function(data) {
                  User.getCurrent().then((response) => {
                    User.current(response.data);
                  });
                  // m.route.set("/projects");
                  m.route.set(m.route.get(), null, {state: {key: Date.now()}});
                })
              }).catch(swal.noop)
            }
          }, "New project")
        ])
      ]),
      m("ul", { class: "list-unstyled projects-list" }, [
        state.showProjects()
      ]),
      m("div", { class: "clearfix" }, [
        m("div", { class: "pull-left" }, [
          paginate(state)
        ])
      ])
    ]
  })
};

export default projectList;
