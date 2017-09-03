import Image from "../../../models/image";
import Project from "../../../models/project";
import Video from "../../../models/video";

var imageListItem = {
  oninit({attrs}){
    this.image = attrs.image;
    this.parent = attrs.parent;

    this.delete = () => {
      Image.delete(
        {
          projectId: Project.current().id,
          videoId: Video.current().id
        },
        this.image.name
      ).then(function() {
        this.parent.getImages(
          _.assign(
            this.parent.pageInfo.defaultParams || {},
            { page: this.parent.pageInfo.pageNumber }
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
    return m(".media", {
      class: "list_libraryitem",
      'data-url': state.image.thumb_url,
      onmousedown: function() {
        var selectEvent = new CustomEvent("library:image:select", {
          detail: state.image
        });
        document.body.dispatchEvent(selectEvent);
      }
    }, [
      m("figure", { class: "media-left" }, [
        m("a", { href: "#" }, [
          m("img", {
            src: state.image.thumb_url,
            class: "media-object img-responsive"
          })
        ])
      ]),
      m(".media-body", [
        m("h5", { class: "media-heading" }, _.truncate(state.image.name, { length: 25 })),
        m("p", {
          class: "media-text"
        }, _.join(
          [
            _.toUpper(_.last(_.split(state.image.name, '.'))),
            _.join([_.floor(Math.log(state.image.size) / Math.log(1024), 3), 'KB'], ' '),
            moment(state.image.last_modified).format('L')
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
                  state.delete();
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
