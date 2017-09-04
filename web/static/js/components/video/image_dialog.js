import searchForm from "../widgets/search_form";
import Pagination from "../widgets/pagination";
import loader from "../widgets/loader";
import recordNotFound from "../widgets/404";
import Image from "../../models/image";
import imageItem from "./image_item";
import Project from "../../models/project";
import Video from "../../models/video";

const imageDialog = {
  oninit(vnode) {
    this.images = m.stream(undefined);
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

    this.filterImages = (event) => {
      event.preventDefault();

      this.getImages(
        _.assign(
          this.pageInfo.defaultParams || {},
          { page: 1 }
        )
      );
    };

    this.imageView = () => {
      if(!this.images()) {
        return m(loader);
      } else {
        return _.isEmpty(this.images()) ? m(recordNotFound) : this.images().map((image) => {
          return m(imageItem, {key: image.id, image: image, callback: () => {}});
        });
      }
    };

  },
  show(opts) {
    $("#imageDialog").fadeIn( "fast" );
    // $("#imageDialog").modal('show');
    getImages(
      _.assign(
        {},
        { page: 1 }
      )
    );
  },
  view({state}) {
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
              action: state.filterImages,
              filter: state.filter
            })
          ]),
          m(".modal-body", [
            m("section", { class: "slidesheet slidesheet-height" }, [
              m("div", { class: "row" }, [
                state.imageView()
              ])
            ]),
            m(new Pagination(),
              _.assign(
                state.pageInfo,
                {
                  xhr: (params) => {
                    state.getImages(params);
                  },
                  defaultParams: {
                    filter: state.filter()
                  }
                }
              )
            )
          ])
        ])
      ])
    ])
  }
};

export default imageDialog;
