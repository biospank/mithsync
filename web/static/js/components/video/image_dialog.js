import searchForm from "../widgets/search_form";
import Pagination from "../widgets/pagination";
import loader from "../widgets/loader";
import recordNotFound from "../widgets/404";
import Image from "../../models/image";
import imageItem from "./image_item";
import Project from "../../models/project";
import Video from "../../models/video";

const imageDialog = (() => {
  let images = m.stream(undefined);
  let errors = m.stream({});
  let filter = m.stream("");
  let pageInfo = {};
  let unwrapSuccess = (response) => {
    if(response) {
      this.pageInfo = {
        totalEntries: response.total_entries,
        totalPages: response.total_pages,
        pageNumber: response.page_number
      };

      return response;
    }
  }

  let getImages = (params) => {
    images(undefined);

    return Image.all(
      {
        projectId: Project.current().id,
        videoId: Video.current().id
      },
      _.assign(params, { page_size: 18 }),
      { background: true }
    ).then(unwrapSuccess).then((response) => {
      images(response.data);
      m.redraw();
    }, (response) => {
      // in case of 404 http status code
      // response is undefined: (cannot extract json data)
      images([]);
      m.redraw();
    })
  };

  let filterImages = (event) => {
    event.preventDefault();

    getImages(
      _.assign(
        pageInfo.defaultParams || {},
        { page: 1 }
      )
    );
  };

  let selectCallback = () => {};

  let imageView = () => {
    if(!images()) {
      return m(loader);
    } else {
      return _.isEmpty(images()) ? m(recordNotFound) : images().map((image) => {
        return m(imageItem, {key: image.id, image: image, callback: selectCallback});
      });
    }
  };

  return {
    show(opts) {
      selectCallback = (image) => {
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
        )
      );
    },
    view(vnode) {
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
                onclick: () => {
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
                    xhr: (params) => {
                      getImages(params);
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
