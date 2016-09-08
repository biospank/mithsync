// import confirmDialog from "../widgets/confirm_dialog";
// import Image from "../../models/image";

var slickItem = {
  controller: function(args, slide){
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
  view: function(ctrl, args, slide){
    ctrl.slide = slide;

    return m("figure", {
      class: "pull-left thumbnail",
      style: "cursor: pointer;",
      onclick: function() {
        if(args.selectCallback)
          args.selectCallback(ctrl.slide);
      }
    }, [
      m("img", {
        src: ctrl.slide.url,
        class: "img-responsive"
      }),
    ]);
  }
}

export default slickItem;
