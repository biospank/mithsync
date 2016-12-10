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
      m("div", { class: "list media" }, [
        m("a", {
          href: "",
          onclick: function(event) {
            event.preventDefault();
            Video.current(video);
            m.route("/projects/" + Project.current().id + "/videos/" + video.id + "/edit");
          },
          class: "list__contents"
        }, [
          m("figure", { class: "list__image border-right media-left hidden-xs hidden-sm" }, [
            m("a", [
              m("img", {
                src: _.isEmpty(ctrl.video.slides) ? '/images/thumb-placeholder.png' : _.first(ctrl.video.slides).thumb_url,
                class: "media-object",
                width: "90"
              })
            ])
          ]),
          m("div", { class: "list__body media-body" }, [
            m("h5", { class: "list__body-title mboth-0 text-uppercase" }, _.truncate(video.title, { length: 50 })),
            m("p", { class: "list__body-description text-uppercase" }, _.truncate(video.description, { length: 70 })),
            m("span", { class: "list__body-summary list__body-summary--space-right10 text-uppercase" }, moment(video.inserted_at).format('LLL')),
            m("span", {
              class: "text-uppercase list__body-summary coloured"
            }, ctrl.video.slide_count + (_.gt(ctrl.video.slide_count, 1) ? " slides" : " slide"))
          ])
        ]),
        m(".list__buttons list__buttons--40", [
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
            href: "#",
            onclick: function(event) {
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
