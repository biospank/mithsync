import Image from "../../../models/image";
import Project from "../../../models/project";
import Video from "../../../models/video";

var imageThumbItem = {
  oninit({attrs}){
    this.image = attrs.image;
    this.parent = attrs.parent;

    this.delete = function() {
      Image.delete(
        {
          projectId: Project.current().id,
          videoId: Video.current().id
        },
        this.image.name
      ).then(() => {
        parent.getImages(
          _.assign(
            parent.pageInfo.defaultParams || {},
            { page: parent.pageInfo.pageNumber }
          )
        );
      }, (e) => {
        swal(
          'Delete error',
          // TO TEST
          JSON.parse(e.message).errors.reason,
          'error'
        ).catch(swal.noop);
      });
    };
  },
  view({state}) {
    return m(".col-xs-3", {
      'data-url': state.image.thumb_url,
    }, [
      m("figure", { class: "img-thumbnail" }, [
        m("img", {
          src: state.image.thumb_url,
          title: state.image.name,
          class: "img-responsive",
          onmousedown: function() {
            var selectEvent = new CustomEvent("library:image:select", {
              detail: state.image
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
                    state.delete();
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
