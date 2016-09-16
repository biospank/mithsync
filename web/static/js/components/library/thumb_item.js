import Image from "../../models/image";

var thumbItem = {
  controller: function(image, parent){
    var ctrl = this;

    ctrl.delete = function() {
      Image.delete(ctrl.image.name).then(function() {
        parent.getImages(
          _.assign(
            parent.pageInfo.defaultParams || {},
            { page: parent.pageInfo.pageNumber }
          ),
          parent.requestOptions
        );
      }, function(response) {
        swal(
          'Delete error',
          response.errors.reason,
          'error'
        );
      });
    };
  },
  view: function(ctrl, image){
    ctrl.image = image;
    return m(".col-xs-6 .col-sm-4 .col-lg-2", [
      m("figure", { class: "thumbnail thumb_libraryitem" }, [
        m("img", {
          src: ctrl.image.thumb_url,
          title: ctrl.image.name,
          class: "img-responsive"
        }),
        m("div", { class: "btn-group", role: "group" }, [
          m("button", {
            type: "button",
            class: "btn"
          }, [
            m("i", { class: "fa fa-pencil-square-o", "aria-hidden": true })
          ]),
          m("button", {
            onclick: function() {
              swal({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                type: 'warning',
                showCancelButton: true,
                showLoaderOnConfirm: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
              }).then(function() {
                ctrl.delete();
              })
            },
            type: "button",
            class: "btn"
          }, [
            m("i", { class: "fa fa-trash", "aria-hidden": true })
          ])
        ])
      ])
    ]);
  }
}

export default thumbItem;
