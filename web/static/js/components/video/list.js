import Session from "../../models/session";
import Video from "../../models/video";
import listItem from "./list_item";
import searchForm from "../widgets/search_form";
import pagination from "../widgets/pagination";
import recordNotFound from "../widgets/404";

var paginate = function(ctrl) {
  return m.component(pagination,
    _.assign(
      ctrl.pageInfo,
      {
        xhr: function(params) {
          ctrl.getVideos(params, ctrl.requestOptions);
        },
        defaultParams: {
          filter: ctrl.filter()
        }
      }
    )
  );
}

var videoList = {
  controller: function() {
    var ctrl = this;

    ctrl.videos = m.prop([]);
    ctrl.errors = m.prop({});
    ctrl.filter = m.prop("");
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

    if(Session.isExpired()) {
      m.route("/signin");
    }

    ctrl.getVideos = function(params, args) {
      return Video.all(params, args).then(function(videos) {
        ctrl.videos(videos);
      }, function(response) {
        ctrl.errors(response.errors);
      })
    };

    ctrl.showVideos = function() {
      return ctrl.videos().map(function(video) {
        return m(listItem, video, ctrl);
      })
    };

    ctrl.getVideos(
      ctrl.pageInfo.defaultParams || {},
      ctrl.requestOptions
    );

  },
  view: function(ctrl) {
    return m("div", [
      m("div", { class: "clearfix" }, [
        m("div", { class: "pull-left" }, [
          m(searchForm, {
            action: function(event) {
              event.preventDefault();

              ctrl.getVideos(
                _.assign(
                  ctrl.pageInfo.defaultParams || {},
                  { page: 1 }
                ), ctrl.requestOptions
              );
            },
            filter: ctrl.filter
          })
        ])
        // m("div", { class: "pull-right" }, [
        //   m("button", { class: "btn btn-warning btn-lg text-uppercase" }, "Delete selected")
        // ])
      ]),
      m("ul", { class: "list-unstyled projects-list" }, [
        _.isEmpty(ctrl.videos()) ? m("li", {}, [
          m(recordNotFound)
        ]) : ctrl.showVideos()
      ]),
      m("div", { class: "clearfix" }, [
        m("div", { class: "pull-left" }, [
          paginate(ctrl)
        ]),
        this.deleteSelectedButton(ctrl)
      ])
    ]);
  },
  deleteSelectedButton: function(ctrl) {
    if(!_.isEmpty(ctrl.videos())) {
      return m("div", { class: "pull-right" }, [
        // m("button", { href: "/video/new", config: m.route, class: "btn btn-warning btn-lg text-uppercase mgv20 icon-left" }, [
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
