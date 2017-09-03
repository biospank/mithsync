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

const imageLibrary = (() => {
  let paginate = (state) => {
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

    return m(new Pagination(),
      _.assign(
        state.pageInfo,
        {
          xhr: function(params) {
            state.getImages(params);
          },
          defaultParams: {
            filter: state.filter()
          }
        }
      )
    )
  };

  let imageView = (state) => {
    if(!state.images()) {
      return m(loader);
    } else {
      if(_.isEmpty(state.images())) {
         //return m(recordNotFound);
      } else {
        if(state.asList()) {
          return state.images().map((image) => {
            return m(imageListItem, {image: image, parent: state});
          });
        } else {
          return state.images().map((image) => {
            return m(imageThumbItem, {image: image, parent: state});
          })
        }
      }
    }
  };

  return {
    oninit(vnode) {
      this.images = m.stream(undefined);
      this.asList = m.stream(false);
      this.errors = m.stream({});
      this.filter = m.stream("");
      this.pageInfo = {};

      this.unwrapSuccess = (response) => {
        if(response) {
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

      this.initializeDropper = (vnode) => {
        Dropper.init("#dropper", {
          urlParams: {
            projectId: Project.current().id,
            videoId: Video.current().id
          },
          onQueueComplete: () => {
            this.getImages(
              _.assign(
                this.pageInfo.defaultParams || {},
                { page: this.pageInfo.pageNumber }
              )
            );

            var initDraggerEvent = new CustomEvent("library:image:initDragger");

            document.body.dispatchEvent(initDraggerEvent);

          }
        });
      };

      this.getImages = (params) => {
        this.images(undefined);
        // console.log(Project.current());
        // console.log(Video.current());
        return Image.all(
            {
              projectId: Project.current().id,
              videoId: Video.current().id
            },
            params,
            { background: true }
        ).then(this.unwrapSuccess).then((response) => {
          this.images(response.data);
          m.redraw();
        }, (response) => {
          // in case of 404 http status code
          // response is undefined: (cannot extract json data)
          this.images([]);
          m.redraw();
        })
      };

      // this.getImages(
      //   this.pageInfo.defaultParams || {},
      //   this.requestOptions
      // );
    },
    view({state}) {
      return m("div", {
        oncreate: (vnode) => {
          state.getImages(state.pageInfo.defaultParams || {});
        },
        class: "pb-90"
      }, [
        m("div", {
          class: "dropzone needsclick dz-clickable",
          id: "dropper",
          oncreate: state.initializeDropper
        }),
        m("section", { class: "library" }, [
          m("div", { class: "clearfix mb-25 library-fetuares" }, [
            m(searchForm, {
              action: function(event) {
                event.preventDefault();

                state.getImages(
                  _.assign(
                    state.pageInfo.defaultParams || {},
                    { page: 1 }
                  )
                );
              },
              filter: state.filter
            }),
            m("div", { class: "show-items" }, [
              m("button", {
                class: state.asList() ? 'btn btn-square btn-default' : 'btn btn-square btn-default active',
                onclick: function(event) {
                  state.asList(false);
                }
              }, [
                m("i", { class: "fa fa-th-large" })
              ]),
              m("button", {
                class: state.asList() ? 'btn btn-square btn-default btn-space--left-5 active' : 'btn btn-square btn-default btn-space--left-5',
                onclick: function(event) {
                  state.asList(true);
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
            imageView(state)
          ])
        ]),
        paginate(state)
      ]);
    }
  };
})();

export default imageLibrary;
