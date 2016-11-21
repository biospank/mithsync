import Image from "../../../models/image";
import Project from "../../../models/project";
import Video from "../../../models/video";

var imageThumbItem = {
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
    return m(".col-xs-3", {
      'data-url': ctrl.image.thumb_url,
    }, [
      m("figure", { class: "img-thumbnail" }, [
        m("img", {
          src: ctrl.image.thumb_url,
          title: ctrl.image.name,
          class: "img-responsive",
          onmousedown: function() {
            var selectEvent = new CustomEvent("library:image:select", {
              detail: ctrl.image
            });
            document.body.dispatchEvent(selectEvent);
          }
        }),
        m("div", { class: "img-thumbnail__buttons" }, [
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
            class: "btn"
          }, [
            m("i", { class: "fa fa-times-circle", "aria-hidden": true })
          ])
        ])
      ])
    ]);
  }
}

export default imageThumbItem;
