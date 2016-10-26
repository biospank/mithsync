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
    return m("p", {
      'data-url': ctrl.image.thumb_url,
      onmousedown: function() {
        var selectEvent = new CustomEvent("library:image:select", {
          detail: ctrl.image
        });
        document.body.dispatchEvent(selectEvent);
      }
    }, [
      m("label", _.truncate(ctrl.image.name, 10)),
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
      })
    ]);
  }
}

export default imageListItem;
