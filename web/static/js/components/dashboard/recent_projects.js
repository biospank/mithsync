import Project from "../../models/project";
import projectListItem from "./project_list_item";

var recentProjects = {
  oninit(vnode) {
    this.projects = m.stream([]);
    this.errors = m.stream({});
    this.pageInfo = {};

    this.requestOptions = {
      unwrapSuccess: (response) => {
        if(response) {
          this.pageInfo = {
            totalEntries: response.total_entries,
            totalPages: response.total_pages,
            pageNumber: response.page_number
          };
          return response.data;
        }
      },
      unwrapError: (response) => {
        return response.error;
      }
    };

    this.getRecentProjects = (args) => {
      return Project.recent(args).then((response) => {
        this.projects(response.data);
      }, (e) => {
        vnode.state.errors(JSON.parse(e.message).errors);
      })
    };

    this.showProjects = () => {
      return this.projects().map(function(project) {
        return m(projectListItem, {key: project.id, project: project});
      })
    };

    this.getRecentProjects(this.requestOptions);
  },
  view: function({state}) {
    return m("article", { class: "col-xs-4 col-sm-4 col-md-4" }, [
      m("div", { class: "box border radius" }, [
        m("h4", { class: "box__title" }, "Projects"),
        m("div", { class: "box__counter" }, [
          m("span", { class: "box__counter-number" }, state.pageInfo.totalEntries || 0),
          m("p", { class: "box__counter-text" }, m.trust("You’ve got " + (state.pageInfo.totalEntries || 0) + "<br>projects"))
        ])
      ]),
      m("ol", { class: "projects-list list-unstyled" }, [
        _.isEmpty(state.projects()) ? "" : state.showProjects()
      ])
    ])
  }
};

export default recentProjects;
