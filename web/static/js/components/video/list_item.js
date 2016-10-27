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
          // m("a", {
          //   href: "/projects/" + m.route.param('projectId') + "/videos/" + video.id + "/edit",
          //   class: "btn btn-primary btn-square",
          //   config: m.route
          // }, [
          //   m("i", { class: "fa fa-pencil", "aria-hidden": true })
          // ]),
          m("button", {
            onclick: "",
            type: "button",
            class: "btn btn-default btn-square"
          }, [
            m("i", { class: "fa fa-download", "aria-hidden": true })
          ]),
          m("button", {
            onclick: function() {
              swal({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
              }).then(function() {
                ctrl.delete();
              })
            },
            type: "button",
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
