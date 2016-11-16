import Videosync from "../../videosync";
import Video from "../../models/video";

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

    ctrl.exportCode = function() {
      var code = '<div style="position: relative; padding-bottom: 56.25%; padding-top: 35px; height: 0; overflow: hidden;"> ' +
        '<iframe style="position: absolute; top: 0; left: 0; height: 100%; width: 100%; " id="ifrm" frameborder="0" width="1000" height="450" src="<%= domain %>/watch/<%= video.id %>">Your browser doesn\'t support iframes.</iframe>' +
      '</div>'

      return _.template(code)({
        domain: Videosync.domain,
        video: ctrl.video
      });
    }
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
            m.route("/projects/" + m.route.param('projectId') + "/videos/" + video.id + "/edit");
          },
          class: "video-list__body"
        }, [
          m("figure", { class: "poster media-left" }, [
            m("a", [
              m("img", {
                src: _.isEmpty(ctrl.video.slides) ? '/images/thumb-placeholder.png' : _.first(ctrl.video.slides).thumb_url,
                class: "media-object"
              })
            ])
          ]),
          m("div", { class: "media-body" }, [
            m("h5", { class: "title" }, _.truncate(video.title, { length: 30 })),
            m("p", { class: "description" }, _.truncate(video.description, { length: 50 })),
            m("span", {
              class: "video-slide"
            }, ctrl.video.slide_count + (_.gt(ctrl.video.slide_count, 1) ? " slides" : " slide")),
            m("span", { class: "creation-date" }, moment(video.inserted_at).format('LLL'))
          ])
        ]),
        m(".video-list__buttons", [
          m("a", {
            href: "",
            class: "btn btn-default btn-square",
            onclick: function() {
              event.preventDefault();
              swal({
                input: 'textarea',
                inputValue: ctrl.exportCode()
              }).catch(swal.noop)
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
            class: "btn btn-default btn-square"
          }, [
            m("i", { class: "fa fa-trash", "aria-hidden": true })
          ])
        ])
      ])
    ]);
  }
}

export default listItem;
