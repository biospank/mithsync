import Image from "../../../models/image";

var imageItem = {
  controller: function(image, parent){
    var ctrl = this;

    ctrl.delete = function() {
      Image.delete(
        {
          projectId: m.route.param('projectId'),
          videoId: m.route.param('videoId')
        },
        ctrl.image.name
      ).then(function() {
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
    return m(".col-xs-3", [
      m("figure", { class: "img-thumbnail" }, [
        m("img", {
          src: ctrl.image.thumb_url,
          title: ctrl.image.name,
          class: "img-responsive"
        }),
        m("div", { class: "img-thumbnail__buttons" }, [
          m("button", {
            onclick: function() {
              swal({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                type: 'warning',
                showCancelButton: true,
                showLoaderOnConfirm: true,
                confirmButtonColor: '#75c4cb',
                cancelButtonColor: '#9b0202',
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

export default imageItem;
