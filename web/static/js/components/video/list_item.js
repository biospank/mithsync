import Videosync from "../../videosync";
import Project from "../../models/project";
import Video from "../../models/video";
import Clippy from "../../models/clippy";

var listItem = {
  controller: function(video, parent){
    var ctrl = this;

    ctrl.delete = function() {
      Video.delete(ctrl.video).then(function() {
        parent.getVideos(
          _.assign(
            parent.pageInfo.defaultParams || {},
            { page: parent.pageInfo.pageNumber }
          ),
          parent.requestOptions
        );
      });
    };

    ctrl.initClipboard = function(element, isInit, context) {
      if(!isInit) {
        Clippy.init(element);
      }
    };
  },
  view: function(ctrl, video){
    ctrl.video = video;

    return m("li", [
      m("div", { class: "video-list__row media" }, [
        m("a", {
          href: "",
          onclick: function(event) {
            event.preventDefault();
            Video.current(video);
            m.route("/projects/" + Project.current().id + "/videos/" + video.id + "/edit");
          },
          class: "video-list__body"
        }, [
          m("figure", { class: "poster media-left" }, [
            m("a", [
              m("img", {
                src: _.isEmpty(ctrl.video.slides) ? '/images/thumb-placeholder.png' : _.first(ctrl.video.slides).thumb_url,
                class: "media-object",
                width: "80"
              })
            ])
          ]),
          m("div", { class: "media-body" }, [
            m("h5", { class: "title" }, _.truncate(video.title, { length: 30 })),
            m("p", { class: "description" }, _.truncate(video.description, { length: 50 })),
            m("span", { class: "creation-date" }, moment(video.inserted_at).format('LLL')),
            m("span", {
              class: "video-slide"
            }, ctrl.video.slide_count + (_.gt(ctrl.video.slide_count, 1) ? " slides" : " slide"))
          ])
        ]),
        m(".video-list__buttons", [
          m("a", {
            href: "#",
            class: "btn btn-default btn-square",
            config: ctrl.initClipboard,
            onclick: function(e) {
              e.preventDefault();
            }
          }, [
            m("i", {
              class: "fa fa-code",
              "aria-hidden": true
            })
          ]),
          m("a", {
            href: "",
            onclick: function() {
              event.preventDefault();
              swal({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
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
            // type: "button",
            class: "btn btn-default btn-square btn-space--left-10"
          }, [
            m("i", { class: "fa fa-trash", "aria-hidden": true })
          ])
        ])
      ])
    ]);
  }
}

export default listItem;
