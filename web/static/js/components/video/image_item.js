import Image from "../../models/image";

var thumbItem = {
  controller: function(image, callback){
    return {
      selectImage: function() {
        callback(image);
      }
    }
  },
  view: function(ctrl, image){
    ctrl.image = image;
    return m(".col-xs-6 .col-sm-4 .col-lg-2", [
      m("figure", { class: "thumb_libraryitem" }, [
        m("a", {
          href: "#",
          onclick: ctrl.selectImage
        }, [
          m("img", {
            src: ctrl.image.path,
            title: ctrl.image.name,
            class: "img-responsive"
          })
        ])
      ])
    ]);
  }
}

export default thumbItem;
