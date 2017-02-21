import Session from "../../../models/session";
import Dropper from "../../../models/dropper";
import Image from "../../../models/image";
import Project from "../../../models/project";
import Video from "../../../models/video";
import imageThumbItem from "./image_thumb_item";
import imageListItem from "./image_list_item";
import searchForm from "../../widgets/search_form";
import Pagination from "../../widgets/pagination";
import loader from "../../widgets/loader";
import recordNotFound from "../../widgets/404";
import {} from "../../../util/polyfill_custom_event";

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

    return m.component(new Pagination(),
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
      if(_.isEmpty(ctrl.images())) {
         //return m(recordNotFound);
      } else {
        if(ctrl.asList()) {
          return ctrl.images().map(function(image) {
            return m(imageListItem, image, ctrl);
          });
        } else {
          return ctrl.images().map(function(image) {
            return m(imageThumbItem, image, ctrl);
          })
        }
      }
    }
  };

  return {
    controller: function() {
      var ctrl = this;

      ctrl.images = m.prop(undefined);
      ctrl.asList = m.prop(false);
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

      ctrl.initializeDropper = function(element, isInit, context) {
        if(!isInit) {
          Dropper.init("#dropper", {
            urlParams: {
              projectId: Project.current().id,
              videoId: Video.current().id
            },
            onQueueComplete: function() {
              ctrl.getImages(
                _.assign(
                  ctrl.pageInfo.defaultParams || {},
                  { page: ctrl.pageInfo.pageNumber }
                ),
                ctrl.requestOptions
              );

              var initDraggerEvent = new CustomEvent("library:image:initDragger");

              document.body.dispatchEvent(initDraggerEvent);

            }
          });
        }
      };

      ctrl.getImages = function(params, args) {
        ctrl.images(undefined);

        return Image.all(
            {
              projectId: Project.current().id,
              videoId: Video.current().id
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
        },
        class: "pb-90"
      }, [
        m("div", {
          class: "dropzone needsclick dz-clickable",
          id: "dropper",
          config: ctrl.initializeDropper
        }),
        m("section", { class: "library" }, [
          m("div", { class: "clearfix mb-25 library-fetuares" }, [
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
            m("div", { class: "show-items" }, [
              m("button", {
                class: ctrl.asList() ? 'btn btn-square btn-default' : 'btn btn-square btn-default active',
                onclick: function(event) {
                  ctrl.asList(false);
                }
              }, [
                m("i", { class: "fa fa-th-large" })
              ]),
              m("button", {
                class: ctrl.asList() ? 'btn btn-square btn-default btn-space--left-5 active' : 'btn btn-square btn-default btn-space--left-5',
                onclick: function(event) {
                  ctrl.asList(true);
                }
              }, [
                m("i", { class: "fa fa-th-list" })
              ])
            ])
          ]),
          m("div#image-library", {
            class: "row",
            config: function(element, isInit, context) {
              if( !isInit ) {
                var initDraggerEvent = new CustomEvent("library:image:initDragger");
                document.body.dispatchEvent(initDraggerEvent);
              }
            }
          }, [
            imageView(ctrl)
          ])
        ]),
        paginate(ctrl)
      ]);
    }
  };
})();

export default imageLibrary;
