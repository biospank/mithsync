import confirmDialog from "../widgets/confirm_dialog";

var thumbItem = {
  controller: function(image){
    var ctrl = this;
    ctrl.cbConfirm = function() {
      alert("Delete");
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
    return m(".col-xs-6 .col-sm-4 .col-md-3", [
      m("a", { href: "#" }, [
        m("img", { src: ctrl.image.path, class: "img-responsive" }),
        m("div", { class: "btn-group", role: "group" }, [
          m("button", { type: "button", class: "btn btn-default" }, [
            m("i", { class: "fa fa-trash", "aria-hidden": true })
          ]),
          m("button", { type: "button", class: "btn btn-default" }, [
            m("i", { class: "fa fa-pencil-square-o", "aria-hidden": true })
          ]),
          m("button", { type: "button", class: "btn btn-default" }, [
            m("i", { class: "fa fa-check", "aria-hidden": true })
          ])
        ])
      ])
    ]);
  }
}

export default thumbItem;
