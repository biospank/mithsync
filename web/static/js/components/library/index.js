import mixinLayout from "../layout/mixin_layout";
import Session from "../../models/session";
import Dropper from "../../models/dropper";
import Image from "../../models/image";
import thumbItem from "./thumb_item";
import searchForm from "../widgets/search_form";
import pagination from "../widgets/pagination";
import recordNotFound from "../widgets/404";

var library = (function() {
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

  var content = function(ctrl) {
    return [
      m(searchForm, {
        action: function(event) {
          event.preventDefault();

          ctrl.getImages(
            _.assign(
              ctrl.pageInfo.defaultParams || {},
              { page: 1 }
            ), ctrl.requestOptions
          );
        },
        filter: ctrl.filter
      }),
      m("div", {
        class: "dropzone needsclick dz-clickable",
        id: "dropper",
        config: ctrl.initializeDropper
      }),
      m("section", { class: "slidesheet" }, [
        m("div", { class: "row" }, [
          _.isEmpty(ctrl.images()) ? m(recordNotFound) : ctrl.images().map(function(image) {
            return m(thumbItem, image, ctrl);
          })
        ])
      ]),
      m("hr"),
      paginate(ctrl)
    ];
  };

  return {
    controller: function() {
      var ctrl = this;

      ctrl.images = m.prop([]);
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
        return Image.all(params, args).then(function(images) {
          ctrl.images(images);
        }, function(response) {
          ctrl.errors(response.errors);
        })
      };

      ctrl.getImages(
        ctrl.pageInfo.defaultParams || {},
        ctrl.requestOptions
      );
    },
    view: mixinLayout(content)
  };
})();

export default library;
