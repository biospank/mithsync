import searchForm from "./search_form";
import breadcrumb from "./breadcrumb";
import title from "./title";
import Project from "../../models/project";
import Video from "../../models/video";

var breadcrumbBar = {
  view: function(ctrl) {
    return m('nav', { class: 'breadcrumb-bar' }, [
      m('.main-container', [
        m(".clearfix", [
          m(title, Video.current()),
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
