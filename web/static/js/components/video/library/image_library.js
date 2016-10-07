import Session from "../../../models/session";
import Dropper from "../../../models/dropper";
import Image from "../../../models/image";
import imageItem from "./image_item";
import searchForm from "../../widgets/search_form";
import pagination from "../../widgets/pagination";
import loader from "../../widgets/loader";
import recordNotFound from "../../widgets/404";

var imageLibrary = (function() {
  var paginate = function(ctrl) {
    // to use pagination component you need to provide the following params:
    // 1. pagination (the component)
    // 2. a json configuration options
    //   2a. totalPages: number of pages (mandatory)
    //   2b. pageNumber: current page number (mandatory)
    //   2c. xhr: callback to execute on user click (mandatory)
    //     ex. function(params) {
    //           ...
    //         }
    //   2d. defaultParams: additional params to include on xhr callback (optional)

    return m.component(pagination,
      _.assign(
        ctrl.pageInfo,
        {
          xhr: function(params) {
            ctrl.getImages(params, ctrl.requestOptions);
          },
          defaultParams: {
            filter: ctrl.filter()
          }
        }
      )
    )
  };

  var imageView = function(ctrl) {
    if(!ctrl.images()) {
      return m(loader);
    } else {
      return _.isEmpty(ctrl.images()) ? m(recordNotFound) : ctrl.images().map(function(image) {
        return m(imageItem, image, ctrl);
      });
    }
  };

  return {
    controller: function() {
      var ctrl = this;

      ctrl.images = m.prop(undefined);
      ctrl.errors = m.prop({});
      ctrl.filter = m.prop("");
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
      ctrl.pageInfo = {};

      if(Session.isExpired()) {
        m.route("/signin");
      }

      ctrl.initializeDropper = _.once(function() {
        Dropper.init("#dropper", {
          urlParams: {
            projectId: m.route.param('projectId'),
            videoId: m.route.param('videoId')
          },
          onQueueComplete: function() {
            ctrl.getImages(
              _.assign(
                ctrl.pageInfo.defaultParams || {},
                { page: ctrl.pageInfo.pageNumber }
              ),
              ctrl.requestOptions
            );
          }
        });
      });

      ctrl.getImages = function(params, args) {
        ctrl.images(undefined);

        return Image.all(
            {
              projectId: m.route.param('projectId'),
              videoId: m.route.param('videoId')
            },
            params,
            _.assign(args, { background: true })
        ).then(function(images) {
          ctrl.images(images);
          m.redraw();
        }, function(response) {
          // in case of 404 http status code
          // response is undefined: (cannot extract json data)
          ctrl.images([]);
          m.redraw();
        })
      };

      // ctrl.getImages(
      //   ctrl.pageInfo.defaultParams || {},
      //   ctrl.requestOptions
      // );
    },
    view: function(ctrl) {
      return m("div", {
        config: function(element, isInit, context) {
          if(!isInit) {
            ctrl.getImages(
              ctrl.pageInfo.defaultParams || {},
              ctrl.requestOptions
            );
          }
        }
      }, [
        // m(searchForm, {
        //   action: function(event) {
        //     event.preventDefault();
        //
        //     ctrl.getImages(
        //       _.assign(
        //         ctrl.pageInfo.defaultParams || {},
        //         { page: 1 }
        //       ), ctrl.requestOptions
        //     );
        //   },
        //   filter: ctrl.filter
        // }),
        m("div", {
          class: "dropzone needsclick dz-clickable",
          id: "dropper",
          config: ctrl.initializeDropper
        }),
        m("section", { class: "slidesheet" }, [
          m("div", { class: "row" }, [
            imageView(ctrl)
          ])
        ]),
        paginate(ctrl)
      ]);
    }
  };
})();

export default imageLibrary;
