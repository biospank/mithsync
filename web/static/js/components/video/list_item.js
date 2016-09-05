import confirmDialog from "../widgets/confirm_dialog";
import Video from "../../models/video";

var listItem = {
  controller: function(video, parent){
    var ctrl = this;

    ctrl.cbConfirm = function() {
      Video.delete(ctrl.video.id).then(function() {
        parent.getVideos(
          _.assign(
            parent.pageInfo.defaultParams || {},
            { page: parent.pageInfo.pageNumber }
          ),
          parent.requestOptions
        );
      });
    };
    ctrl.cbCancel = function() {
    };
    ctrl.delete = function() {
      confirmDialog.init(
        {
          msg: "Are you sure?",
          cbConfirm: ctrl.cbConfirm,
          cbCancel: ctrl.cbCancel
        }
      );
    };
  },
  view: function(ctrl, video){
    ctrl.video = video;

    return m("li", [
      m("div", { class: "projects-list__content" }, [
        m("div", [
          m("input", { class: "magic-radio", type: "checkbox", name: video.id, id: video.id }),
          m("label", { for: video.id })
        ]),
        m(".projects-list__body clearfix", [
          m("h5", { class: "projects-list__title" }, video.title),
          //m("p", { class: "projects-list__description" }, video.description),
          //m("label", { class: "projects-list__date" }, "16-05-2016"),
          m("div", { class: "projects-list__buttons" }, [
            m("a", {
              href: "/video/" + video.id + "/edit",
              class: "btn btn-primary icon-left",
              config: m.route
            }, [
              m("i", { class: "fa fa-info", "aria-hidden": true }),
              m("span", {}, "Info")
            ]),
            m("a", {
              href: "/video/" + video.id + "/edit",
              class: "btn btn-primary icon-left",
              config: m.route
            }, [
              m("i", { class: "fa fa-pencil", "aria-hidden": true }),
              m("span", {}, "Edit")
            ]),
            m("button", {
              onclick: "",
              type: "button",
              class: "btn btn-primary icon-left"
            }, [
              m("i", { class: "fa fa-copy", "aria-hidden": true }),
              m("span", {}, "Duplicate")
            ]),
            m("button", {
              onclick: "",
              type: "button",
              class: "btn btn-primary icon-left"
            }, [
              m("i", { class: "fa fa-download", "aria-hidden": true }),
              m("span", {}, "Export")
            ]),
            m("button", {
              onclick: ctrl.delete,
              type: "button",
              class: "btn btn-danger icon-left"
            }, [
              m("i", { class: "fa fa-trash", "aria-hidden": true }),
              m("span", {}, "Delete")
            ])



            // m("button", {
            //   onclick: ctrl.delete,
            //   type: "button",
            //   class: "btn btn-danger icon-left"
            // }, [
            //   m("i", { class: "fa fa-trash", "aria-hidden": true }),
            //   m("span", {}, "Delete")
            // ])
          ])
        ])
      ])
    ]);
  }
}

export default listItem;
