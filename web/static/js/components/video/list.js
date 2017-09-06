import Session from "../../models/session";
import Project from "../../models/project";
import Video from "../../models/video";
import listItem from "./list_item";
import loader from "../widgets/loader";
import searchForm from "../widgets/search_form";
import Pagination from "../widgets/pagination";
import recordNotFound from "../widgets/404";

var paginate = function(state) {
  return m(new Pagination(),
    _.assign(
      state.pageInfo,
      {
        xhr: function(params) {
          state.getVideos(params);
        },
        defaultParams: {
          filter: state.filter()
        }
      }
    )
  );
}

var videoList = {
  oninit(vnode) {
    this.videos = m.stream(undefined);
    this.errors = m.stream({});
    this.filter = m.stream("");
    this.pageInfo = {};

    this.unwrapSuccess = (response) => {
      if(response) {
        // console.log(response);
        this.pageInfo = {
          totalEntries: response.total_entries,
          totalPages: response.total_pages,
          pageNumber: response.page_number
        };

        return response;
      }
    };

    if(Session.isExpired()) {
      m.route.set("/signin");
    }

    this.getVideos = function(params) {
      return Video.all(m.route.param("projectId"), params).then(this.unwrapSuccess).then((response) => {
        Project.current(response.data.project);
        this.videos(response.data.videos);
        // needed to update data in breadcrumb
        // since it is rendered before loading video list
        var reloadEvent = new CustomEvent("video:list:reload");
        document.body.dispatchEvent(reloadEvent);
      }, (e) => {
        this.errors(JSON.parse(e.message).errors);
      })
    };

    this.showVideos = function() {
      if(!this.videos()) {
        return m(loader);
      } else {
        if(_.isEmpty(this.videos())) {
           //return m(recordNotFound);
        } else {
          return this.videos().map(function(video) {
            return m(listItem, {key: video.id, video: video, parent: vnode.state});
          })
        }
      }
    };

    this.getVideos(this.pageInfo.defaultParams || {});

  },
  view({state}) {
    return m("div", [
      m("div", { class: "clearfix mb-25" }, [
        m("div", { class: "pull-left" }, [
          m(searchForm, {
            action: function(event) {
              event.preventDefault();

              state.getVideos(
                _.assign(
                  state.pageInfo.defaultParams || {},
                  { page: 1 }
                )
              );
            },
            filter: state.filter
          })
        ]),
        m("div", { class: "pull-right" }, [
          m("a", {
            href: m.route.get() + '/new',
            oncreate: m.route.link,
            class: "btn btn-success btn-md"
          }, "New video")
        ])
      ]),
      m("ul", { class: "video-list list-unstyled" }, [
        state.showVideos()
      ]),
      m("div", { class: "clearfix" }, [
        m("div", { class: "pull-left" }, [
          paginate(state)
        ]),
        this.deleteSelectedButton(state)
      ])
    ]);
  },
  deleteSelectedButton(state) {
    if(!_.isEmpty(state.videos())) {
      return m("div", { class: "pull-right" }, [
        // m("button", { href: "/video/new", oncreate: m.route.link, class: "btn btn-warning btn-lg text-uppercase mgv20 icon-left" }, [
        //   m("i", { class: 'fa fa-trash' }),
        //   m("span", {}, "Delete selected")
        // ])
        // m("button", { class: "btn btn-warning btn-lg text-uppercase mgv20" }, "Delete selected")
      ])
    } else {
      return m("")
    }
  }
}

export default videoList;
