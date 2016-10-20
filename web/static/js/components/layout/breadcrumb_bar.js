import searchForm from "./search_form";
import breadcrumb from "./breadcrumb";
import Project from "../../models/project";

var breadcrumbBar = {
  view: function(ctrl) {
    return m('nav', { class: 'breadcrumb-bar' }, [
      m('.container', [
        m(".clearfix", [
          m("h2", { class: "section-title pull-left" }, "Section title"),
          m("div", { class: "pull-right" }, [
            m("div", { class: "breadcrumb-container" }, [
              m("span", { class: "location-text" }, "You are here:"),
              m(breadcrumb, Project.current())
            ])
          ])
        ])
      ])
    ])
  }
}

export default breadcrumbBar;
