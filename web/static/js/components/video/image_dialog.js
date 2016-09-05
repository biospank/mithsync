import searchForm from "../widgets/search_form";
import pagination from "../widgets/pagination";
import Image from "../../models/image";
import imageItem from "./image_item";

var imageDialog = function() {
  var images = m.prop([]);
  var errors = m.prop({});
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
  var filter = m.prop("");

  var getImages = function(params, args) {
    return Image.all(params, args).then(function(ims) {
      images(ims);
    }, function(response) {
      errors(response.errors);
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

  return {
    show: function() {
      console.log("show");
      $("#imageDialog").fadeIn( "fast" );
      // $("#imageDialog").modal('show');
      // getImages(
      //   _.assign(
      //     pageInfo.defaultParams || {},
      //     { page: 1 }
      //   ), requestOptions
      // );
    },
    controller: function() {
      return {
      }
    },
    view: function(ctrl) {
      return m(".modal fade bs-example-modal-lg", {
        "tabindex": "-1",
        "role": "dialog",
        "id": "imageDialog"
      }, [
        m(".modal-dialog modal-lg", {role: "document"}, [
          m(".modal-content", [
            m(".modal-header", [
              m("button.close", {
                onclick: function() {
                  $("#imageDialog").hide();
                }
              }, [
                m("span", { "aria-hidden": "true" }, m.trust("&times"))
              ]),
              m("h4.modal-title", "Select slide")
            ]),
            m(".modal-body", [
              m(searchForm, {
                action: filterImages,
                filter: filter
              }),
              m("div", { class: "row" }, [
                images().map(function(image) {
                  return m(imageItem, image);
                })
              ]),
              m.component(pagination,
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
}

export default imageDialog;
