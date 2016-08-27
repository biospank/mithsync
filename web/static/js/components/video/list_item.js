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
        m("h5", { class: "projects-list__head" }, video.title),
        m("p", { class: "projects-list__body" }, video.description),
        m("small", { class: "projects-list__info" }, "16-05-2016"),
        m("div", [
          m("a", {
            href: "/video/" + video.id + "/edit",
            class: "btn btn-default",
            config: m.route 
          }, "Edit"),
          m("button", {
            onclick: ctrl.delete,
            type: "button",
            class: "btn btn-default"
          }, "Delete")
        ])
      ])
    ]);
  }
}

export default listItem;
