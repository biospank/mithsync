import Video from "../../models/video";
import videoListItem from "./video_list_item";

var recentVideos = {
  oninit(vnode) {
    this.videos = m.stream([]);
    this.errors = m.stream({});
    this.pageInfo = {};

    this.requestOptions = {
      unwrapSuccess: (response) => {
        if(response) {
          ctrl.pageInfo = {
            totalEntries: response.total_entries,
            totalPages: response.total_pages,
            pageNumber: response.page_number
          };
          return response.data;
        }
      },
      unwrapError: (response) => {
        return response.error;
      }
    };

    this.getRecentVideos = (args) => {
      return Video.recent(args).then((response) => {
        this.videos(response.data);
      }, (e) => {
        vnode.state.errors(JSON.parse(e.message).errors);
      })
    };

    this.showVideos = () => {
      return this.videos().map((video) => {
        return m(videoListItem, {key: video.id, video: video});
      })
    };

    this.getRecentVideos(this.requestOptions);
  },
  view: function({state}) {
    return m("article", { class: "col-xs-5 col-sm-5 col-md-5" }, [
      m("div", { class: "box border radius" }, [
        m("h4", { class: "box__title" }, "Videos"),
        m("div", { class: "box__counter" }, [
          m("span", { class: "box__counter-number" }, state.pageInfo.totalEntries || 0),
          m("p", { class: "box__counter-text" }, m.trust("You’ve got " + (state.pageInfo.totalEntries || 0) + "<br>videos"))
        ])
      ]),
      m("ol", { class: "video-list list-unstyled" }, [
        _.isEmpty(state.videos()) ? "" : state.showVideos()
      ])
    ])
  }
};

export default recentVideos;
