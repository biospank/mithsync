import searchForm from "../widgets/search_form";
import Pagination from "../widgets/pagination";
import loader from "../widgets/loader";
import recordNotFound from "../widgets/404";
import Image from "../../models/image";
import imageItem from "./image_item";
import Project from "../../models/project";
import Video from "../../models/video";

var imageDialog = (function() {
  var images = m.stream(undefined);
  var errors = m.stream({});
  var filter = m.stream("");
  var pageInfo = {};
  var requestOptions = {
    unwrapSuccess: function(response) {
      if(response) {
        pageInfo = {
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

  var getImages = function(params, args) {
    images(undefined);

    return Image.all(
      {
        projectId: Project.current().id,
        videoId: Video.current().id
      },
      _.assign(params, { page_size: 18 }),
      _.assign(args, { background: true })).then(function(ims) {
      images(ims);
      m.redraw();
    }, function(response) {
      // in case of 404 http status code
      // response is undefined: (cannot extract json data)
      images([]);
      m.redraw();
    })
  };

  var filterImages = function(event) {
    event.preventDefault();

    getImages(
      _.assign(
        pageInfo.defaultParams || {},
        { page: 1 }
      ), requestOptions
    );
  };

  var selectCallback = function() {};

  var imageView = function() {
    if(!images()) {
      return m(loader);
    } else {
      return _.isEmpty(images()) ? m(recordNotFound) : images().map(function(image) {
        return m(imageItem, image, selectCallback);
      });
    }
  };

  return {
    show: function(opts) {
      selectCallback = function(image) {
        if(opts['selectCallback'] !== undefined)
          opts['selectCallback'](image);

        $("#imageDialog").hide();
      }

      $("#imageDialog").fadeIn( "fast" );
      // $("#imageDialog").modal('show');
      getImages(
        _.assign(
          pageInfo.defaultParams || {},
          { page: 1 }
        ), requestOptions
      );
    },
    controller: function() {
      return {
      }
    },
    view: function(ctrl) {
      return m(".modal image-modal-lg", {
        "tabindex": "-1",
        "role": "dialog",
        "id": "imageDialog"
      }, [
        m(".modal-dialog modal-lg", {
          role: "document"
          // class: "bounceIn animated"
        }, [
          m(".modal-content", [
            m(".modal-header", [
              m("button.close", {
                onclick: function() {
                  $("#imageDialog").hide();
                }
              }, [
                m("span", { "aria-hidden": "true" }, m.trust("&times"))
              ]),
              m(searchForm, {
                action: filterImages,
                filter: filter
              })
            ]),
            m(".modal-body", [
              m("section", { class: "slidesheet slidesheet-height" }, [
                m("div", { class: "row" }, [
                  imageView()
                ])
              ]),
              m(new Pagination(),
                _.assign(
                  pageInfo,
                  {
                    xhr: function(params) {
                      getImages(params, requestOptions);
                    },
                    defaultParams: {
                      filter: filter()
                    }
                  }
                )
              )
            ])
          ])
        ])
      ])
    }
  }
})();

export default imageDialog;
