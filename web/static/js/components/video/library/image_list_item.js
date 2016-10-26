import Image from "../../../models/image";

var imageListItem = {
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
    return m(".media", {
      class: "list_libraryitem",
      'data-url': ctrl.image.thumb_url,
      onmousedown: function() {
        var selectEvent = new CustomEvent("library:image:select", {
          detail: ctrl.image
        });
        document.body.dispatchEvent(selectEvent);
      }
    }, [
      m("figure", { class: "media-left" }, [
        m("a", { href: "#" }, [
          m("img", {
            src: ctrl.image.thumb_url,
            class: "media-object"
          })
        ])
      ]),
      m(".media-body", [
        m("h5", { class: "media-heading" }, _.truncate(ctrl.image.name, 10)),
        m("p", { class: "media-text" }, "PNG · 309.04 KB · 1920 × 1080"),
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
          class: "btn btn-none media-button"
        }, [
          m("i", { class: "fa fa-remove" })
        ])
      ])
    ]);
  }
}

export default imageListItem;
