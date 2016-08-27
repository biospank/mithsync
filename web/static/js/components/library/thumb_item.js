import confirmDialog from "../widgets/confirm_dialog";
import Image from "../../models/image";

var thumbItem = {
  controller: function(image, parent){
    var ctrl = this;

    ctrl.cbConfirm = function() {
      Image.delete(ctrl.image.name).then(function() {
        parent.getImages(
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
  view: function(ctrl, image){
    ctrl.image = image;
    return m(".col-xs-6 .col-sm-4 .col-lg-2", [
      m("figure", { class: "thumb_libraryitem" }, [
        m("img", {
          src: ctrl.image.path,
          title: ctrl.image.name,
          class: "img-responsive"
        }),
        m("div", { class: "btn-group", role: "group" }, [
          m("button", {
            onclick: ctrl.delete,
            type: "button",
            class: "btn btn-danger"
          }, [
            m("i", { class: "fa fa-trash", "aria-hidden": true })
          ]),
          m("button", { type: "button", class: "btn btn-primary" }, [
            m("i", { class: "fa fa-pencil-square-o", "aria-hidden": true })
          ]),
          m("button", { type: "button", class: "btn btn-success" }, [
            m("i", { class: "fa fa-check", "aria-hidden": true })
          ])
        ])
      ])
    ]);
  }
}

export default thumbItem;
