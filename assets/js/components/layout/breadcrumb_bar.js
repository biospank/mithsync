import searchForm from "./search_form";
import breadcrumb from "./breadcrumb";
import title from "./title";
import Project from "../../models/project";
import Video from "../../models/video";

var breadcrumbBar = {
  oninit(vnode) {
    document.body.addEventListener("video:edit:reload", function(e) {
      m.redraw();
    }, false);
  },
  view(vnode) {
    return m('nav', { class: 'breadcrumb-bar' }, [
      m(".clearfix", [
        m(title, {title: Video.model.title()}),
        m("div", { class: "pull-right" }, [
          m("div", { class: "breadcrumb-container" }, [
            m("span", { class: "location-text" }, "You are here:"),
            m(breadcrumb, {project: Project.current()})
          ])
        ])
      ])
    ])
  }
}

export default breadcrumbBar;
