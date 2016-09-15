import Image from "../../models/image";

var thumbItem = {
  controller: function(image, callback){
    var ctrl = this;
    ctrl.currentImage = m.prop({});

    ctrl.selectImage = function() {
      callback(ctrl.currentImage());
    };
  },
  view: function(ctrl, image){
    ctrl.currentImage(image);

    return m(".col-xs-6 .col-sm-4 .col-lg-2", [
      m("figure", { class: "thumb_libraryitem" }, [
        m("a", {
          href: "#",
          onclick: ctrl.selectImage
        }, [
          m("img", {
            src: ctrl.currentImage().path,
            title: ctrl.currentImage().name,
            class: "img-responsive"
          })
        ])
      ])
    ]);
  }
}

export default thumbItem;
