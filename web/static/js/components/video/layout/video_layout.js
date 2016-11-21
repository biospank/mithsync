import Video from "../../../models/video";
import feedbackButton from "../../widgets/feedback_button";

var videoLayout = {
  controller: function() {
    var layout = m.prop(Video.current().layout);

    return {
      get currentLayout() {
        return layout;
      },
      set currentLayout(lyt) {
        layout = lyt;
      },
      updateLayout: function() {
        Video.model.layout(this.currentLayout());

        return Video.update(Video.current()).then(function() {
          swal({
            type: 'success',
            title: 'Video layout saved!',
            showConfirmButton: false,
            timer: 1000
          }).catch(swal.noop);
        })
      }
    };
  },
  view: function(ctrl) {
    return m("", [
      m("div", {
        class: "panel panel-default theme-layout" + ((ctrl.currentLayout() === 1) ? " active" : ""),
        onclick: function() {
          ctrl.currentLayout(1);
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
        class: "panel panel-default theme-layout" + ((ctrl.currentLayout() === 2) ? " active" : ""),
        onclick: function() {
          ctrl.currentLayout(2);
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
        class: "panel panel-default theme-layout" + ((ctrl.currentLayout() === 3) ? " active" : ""),
        onclick: function() {
          ctrl.currentLayout(3);
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
      m("div", { class: "text-right" }, [
        m.component(feedbackButton, {
          action: function() {
            return ctrl.updateLayout();
          },
          label: 'Update',
          feedbackLabel: 'Updating...',
          style: 'btn btn-success btn-md btn-rectangular'
        })
      ])
    ])
  }
}

export default videoLayout;
