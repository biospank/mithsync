import mixinLayout from "../layout/mixin_layout";
import Session from "../../models/session";
import Dropper from "../../models/dropper";
import Image from "../../models/image";
import thumbItem from "./thumb_item";
import pagination from "../widgets/pagination";

var library = (function() {
  var paginate = function(ctrl) {
    console.log(ctrl.pageInfo);
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
            //archived: false
          }
        }
      )
    )
  };

  var content = function(ctrl) {
    return [
      m("div", {
        class: "dropzone needsclick dz-clickable",
        id: "dropper",
        config: ctrl.initializeDropper
      }),
      m("div", { class: "clearfix" }, [
        m("div", { class: "pull-left" }, [
          m("form", { class: "navbar-form search-form", role: "search" }, [
            m(".input-group", [
              m("span", { class: "input-group-btn" }, [
                m("button", { class: "btn btn-default", type: "button" }, [
                  m("i", { class: "fa fa-search" })
                ])
              ]),
              m("input", { type: "text", class: "form-control", placeholder: "Search for..." })
            ])
          ])
        ]),
        m("div", { class: "pull-right" }, [
          m("a", { class: "btn btn-success" }, "Create content")
        ])
      ]),
      m("div", { class: "row" }, [
        ctrl.images().map(function(image) {
          return m(thumbItem, image);
        })
      ]),
      paginate(ctrl)
    ];
  };

  return {
    controller: function() {
      var ctrl = this;

      ctrl.images = m.prop([]);
      ctrl.errors = m.prop({});
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

      if(!Session.token()) {
        m.route("/signin");
      }

      ctrl.initializeDropper = function() {
        Dropper.init("#dropper");
      };

      ctrl.getImages = function(params, args) {
        return Image.all(params, args).then(function(images) {
          ctrl.images(images);
        }, function(response) {
          ctrl.errors(response.errors);
        })
      };

      ctrl.getImages({}, ctrl.requestOptions);
    },
    view: mixinLayout(content)
  };
})();

export default library;
