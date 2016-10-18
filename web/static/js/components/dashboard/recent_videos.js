import Video from "../../models/video";
import videoListItem from "./video_list_item";

var recentVideos = {
  controller: function() {
    var ctrl = this;

    ctrl.videos = m.prop([]);
    ctrl.errors = m.prop({});
    ctrl.pageInfo = {};

    ctrl.requestOptions = {
      unwrapSuccess: function(response) {
        if(response) {
          ctrl.pageInfo = {
            totalEntries: response.total_entries,
            totalPages: response.total_pages,
            pageNumber: response.page_number
          };
          return response.data;
        }
      },
      unwrapError: function(response) {
        return response.error;
      }
    };

    ctrl.getRecentVideos = function(args) {
      return Video.recent(args).then(function(videos) {
        ctrl.videos(videos);
      }, function(response) {
        ctrl.errors(response.errors);
      })
    };

    ctrl.showVideos = function() {
      return ctrl.videos().map(function(video) {
        return m(videoListItem, video);
      })
    };

    ctrl.getRecentVideos(ctrl.requestOptions);
  },
  view: function(ctrl) {
    return m("article", { class: "col-xs-5 col-sm-5 col-md-5" }, [
      m("div", { class: "box" }, [
        m("h4", { class: "box__title" }, "Video"),
        m("div", { class: "box__counter" }, [
          m("span", { class: "box__counter-number" }, ctrl.pageInfo.totalEntries || 0),
          m("p", { class: "box__counter-text" }, m.trust("You’ve got " + (ctrl.pageInfo.totalEntries || 0) + "<br>videos"))
        ])
      ]),
      m("ol", { class: "video-list list-unstyled" }, [
        _.isEmpty(ctrl.videos()) ? "" : ctrl.showVideos()
      ])
    ])
  }
};

export default recentVideos;
