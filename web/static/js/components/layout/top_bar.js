import searchForm from "./search_form";
import breadcrumb from "./breadcrumb";
import Project from "../../models/project";

var topBar = {
  view: function(ctrl) {
    return m('section', { class: 'top-bar navbar navbar-default navbar-fixed-top' }, [
      m('.container-fluid', [
        m('.navbar-header', [
          m('a', {
            href: '#menu-toggle',
            class: 'navbar-toggle',
            id: "menu-toggle"
          },
          [
            m('span', { class: 'sr-only' }, 'Toggle navigation'),
            m('span', { class: 'fa fa-list' })
          ]),
          m(breadcrumb)
        ]),
        m('.collapse navbar-collapse navbar-right',
          m("a", {
            onclick: function() {
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
              }, function(dismiss) {

              })
            },
            class: "btn btn-primary effect btn-md text-uppercase icon-left"
          }, [
            m("i", { class: 'fa fa-plus' }),
            m("span", {}, "New project")
          ])
        )
      ])
    ])
  }
}

export default topBar;
