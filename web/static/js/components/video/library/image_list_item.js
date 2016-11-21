import Image from "../../../models/image";
import Project from "../../../models/project";
import Video from "../../../models/video";

var imageListItem = {
  controller: function(image, parent){
    var ctrl = this;

    ctrl.delete = function() {
      Image.delete(
        {
          projectId: Project.current().id,
          videoId: Video.current().id
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
        ).catch(swal.noop);
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
        m("h5", { class: "media-heading" }, _.truncate(ctrl.image.name, { length: 25 })),
        m("p", {
          class: "media-text"
        }, _.join(
          [
            _.toUpper(_.last(_.split(ctrl.image.name, '.'))),
            _.join([_.floor(Math.log(ctrl.image.size) / Math.log(1024), 3), 'KB'], ' '),
            moment(ctrl.image.last_modified).format('L')
          ], ' · ')
        ),
        m("button", {
          onclick: function() {
            swal({
              title: 'Are you sure?',
              text: "You won't be able to revert this!",
              type: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#75c4cb',
              cancelButtonColor: '#9b0202',
              confirmButtonText: 'Yes, delete it!',
              showLoaderOnConfirm: true,
              preConfirm: function() {
                return new Promise(function(resolve, reject) {
                  ctrl.delete();
                  resolve()
                })
              }
            }).catch(swal.noop);
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
