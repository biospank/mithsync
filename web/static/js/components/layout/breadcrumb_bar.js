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
              m(breadcrumb)
            ])
          ])
        ])
        // m('.collapse navbar-collapse navbar-right',
        //   m("a", {
        //     onclick: function() {
        //       swal({
        //         title: 'Project name',
        //         input: 'text',
        //         showCancelButton: true,
        //         confirmButtonText: 'Create',
        //         inputValidator: function(value) {
        //           return new Promise(function(resolve, reject) {
        //             if (value) {
        //               resolve();
        //             } else {
        //               reject('You need to write something!');
        //             }
        //           });
        //         },
        //       }).then(function(value) {
        //         Project.model.name(value);
        //         Project.create().then(function(data) {
        //           m.route("/projects");
        //         })
        //       }, function(dismiss) {
        //
        //       })
        //     },
        //     class: "btn btn-primary effect btn-md text-uppercase icon-left"
        //   }, [
        //     m("i", { class: 'fa fa-plus' }),
        //     m("span", {}, "New project")
        //   ])
        // )
      ])
    ])
  }
}

export default breadcrumbBar;
