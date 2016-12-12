import Video from "../../../models/video";
import Layout from "../../../models/layout";
import feedbackButton from "../../widgets/feedback_button";

var videoLayout = {
  controller: function() {
    Layout.model = Video.current().layout;

    return {
      theme: function(value) {
        if(arguments.length)
          layout().theme = value;

        return layout().theme;
      },
      updateLayout: function() {
        swal({
          title: 'Saving...',
          width: '400px',
          allowOutsideClick: false,
          allowEscapeKey: false,
          showConfirmButton: false,
          onOpen: function(progress) {
            swal.showLoading();
            return Layout.update(Video.current()).then(function() {
              swal.close();
              swal({
                type: 'success',
                title: 'Layout saved!',
                width: '400px',
                showConfirmButton: false,
                timer: 1000
              }).catch(swal.noop);
            });
          }
        }).catch(swal.noop);
      }
    };
  },
  view: function(ctrl) {
    return m("", [
      m("div", {
        class: "panel panel-default theme-layout" + ((Layout.model.theme === 1) ? " active" : ""),
        onclick: function() {
          Layout.model.theme = 1
        }
      }, [
        m(".panel-body", { class: "row" }, [
          m("div", { class: "col-xs-6" }, [
            m("div", { class: "panel-body__col" }, [
              m("span")
            ])
          ]),
          m("div", { class: "col-xs-6" }, [
            m("div", { class: "panel-body__col" }, [
              m("span")
            ])
          ])
        ])
      ]),
      m("div", {
        class: "panel panel-default theme-layout" + ((Layout.model.theme === 2) ? " active" : ""),
        onclick: function() {
          Layout.model.theme = 2;
        }
      }, [
        m(".panel-body", { class: "row" }, [
          m("div", { class: "col-xs-4" }, [
            m("div", { class: "panel-body__col" }, [
              m("span")
            ])
          ]),
          m("div", { class: "col-xs-8" }, [
            m("div", { class: "panel-body__col" }, [
              m("span")
            ])
          ])
        ])
      ]),
      m("div", {
        class: "panel panel-default theme-layout" + ((Layout.model.theme === 3) ? " active" : ""),
        onclick: function() {
          Layout.model.theme = 3;
        }
      }, [
        m(".panel-body", { class: "row" }, [
          m("div", { class: "col-xs-8" }, [
            m("div", { class: "panel-body__col" }, [
              m("span")
            ])
          ]),
          m("div", { class: "col-xs-4" }, [
            m("div", { class: "panel-body__col" }, [
              m("span")
            ])
          ])
        ])
      ]),
      m("section", { class: "p-all-side-20 mb-30 panel panel-default" }, [
        m("div", { class: "row" }, [
          m("div", { class: "col-sm-6" }, [
            m("div", { class: "mb-10" }, [
              m("input", {
                class: "magic-checkbox",
                type: "checkbox",
                name: "layout",
                id: "1",
                onclick: function(e) {
                  Layout.model.show_title = e.target.checked;
                },
                checked: Layout.model.show_title
              }),
              m("label", { class: "mb-0 weight-regular", for: "1" }, "Show Title")
            ])
          ]),
          m("div", { class: "col-sm-6" }, [
            m("div", { class: "mb-10" }, [
              m("input", {
                class: "magic-checkbox",
                type: "checkbox",
                name: "layout",
                id: "2",
                onclick: function(e) {
                  Layout.model.show_description = e.target.checked;
                },
                checked: Layout.model.show_description
              }),
              m("label", { class: "mb-0 weight-regular", for: "2" }, "Show Description")
            ])
          ]),
          m("div", { class: "col-sm-6" }, [
            m("div", [
              m("input", {
                class: "magic-checkbox",
                type: "checkbox",
                name: "layout",
                id: "3",
                onclick: function(e) {
                  Layout.model.show_date = e.target.checked;
                },
                checked: Layout.model.show_date
              }),
              m("label", { class: "mb-0 weight-regular", for: "3" }, "Show Date")
            ])
          ]),
          m("div", { class: "col-sm-6" }, [
            m("div", [
              m("input", {
                class: "magic-checkbox",
                type: "checkbox",
                name: "layout",
                id: "4",
                onclick: function(e) {
                  Layout.model.show_slider = e.target.checked;
                },
                checked: Layout.model.show_slider
              }),
              m("label", { class: "mb-0 weight-regular", for: "4" }, "Show Slider")
            ])
          ])
        ])
      ]),
      m("div", { class: "text-right" }, [
        m("button[type=submit]", {
          onclick: ctrl.updateLayout,
          class: 'btn btn-success btn-md btn-rectangular btn-space--left-5 icon-inside--left',
          title: "Update"
        }, [
          m("i", { class: "fa fa-save" }),
          "Update"
        ])
      ])
    ])
  }
}

export default videoLayout;
