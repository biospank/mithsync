import mixinLayout from "../layout/mixin_layout";
import textField from "../widgets/text_field";
import recentVideo from "./recent_videos";
import Session from "../../models/session";
import Dropper from "../../models/dropper";
import Video from "../../models/video";

var dashboard = (function() {

  var content = function(ctrl) {
    return [
      m("main", { style: "padding: 20px;" }, [
        m("section", { class: "row" }, [
          m("article", { class: "col-xs-3" }, [
            m("div", { style: "background-color: pink" }, "column 1")
          ]),
          m("article", { class: "col-xs-3" }, [
            m("div", { style: "background-color: pink" }, "column 2")
          ]),
          m("article", { class: "col-xs-3" }, [
            m("div", { style: "background-color: pink" }, "column 3")
          ]),
          m("article", { class: "col-xs-3" }, [
            m("div", { style: "background-color: pink" }, "column 4")
          ])
        ]),
        m(".row", [
          m("section", { class: "col-xs-8" }, [
            m("ol", { style: "background-color: red" }, [
              m("li", [
                m("a", "Testo")
              ]),
              m("li", [
                m("a", "Testo")
              ]),m("li", [
                m("a", "Testo")
              ]),m("li", [
                m("a", "Testo")
              ])
            ])
          ]),
          m("div", { class: "col-xs-4" }, [
            m("div", { style: "background-color: violet" }, [
              m("h3", { class: "no-margin-top" }, "Titolo"),
              m("p", "Testo"),
              m("a", "Bottone")
            ])
          ])
        ])
      ])
    ];



    // return m(".row", [
    //   m(".col-md-4", {}, [
    //     m(".wrapper simple", [
    //       m("h3", { class: "no-margin-top" }, [
    //         "Projects ",
    //         m("span", { class: "badge" }, ctrl.pageInfo.totalEntries || 0)
    //       ]),
    //       m("p", "Lorem Ipsum è un testo segnaposto utilizzato nel settore della tipografia e della stampa. Lorem Ipsum è considerato il testo segnaposto standard sin dal sedicesimo secolo, quando un anonimo tipografo prese una cassetta di caratteri e li assemblò per preparare un testo campione."),
    //       m("a", { href: "/video", config: m.route, class: "btn btn-primary effect btn-lg" }, "Go to the projects list section")
    //     ])
    //   ]),
    //   m(".col-md-4", {}, [
    //     m(".wrapper simple", [
    //       m("h3", { class: "no-margin-top" }, [
    //         "Projects ",
    //         m("span", { class: "badge" }, ctrl.pageInfo.totalEntries || 0)
    //       ]),
    //       m("p", "Lorem Ipsum è un testo segnaposto utilizzato nel settore della tipografia e della stampa. Lorem Ipsum è considerato il testo segnaposto standard sin dal sedicesimo secolo, quando un anonimo tipografo prese una cassetta di caratteri e li assemblò per preparare un testo campione."),
    //       m("a", { href: "/video", config: m.route, class: "btn btn-primary effect btn-lg" }, "Go to the projects list section")
    //     ])
    //   ]),
    //   m(".col-md-4", {}, [
    //     m(".wrapper simple", [
    //       m("h3", { class: "no-margin-top" }, [
    //         "Projects ",
    //         m("span", { class: "badge" }, ctrl.pageInfo.totalEntries || 0)
    //       ]),
    //       m("p", "Lorem Ipsum è un testo segnaposto utilizzato nel settore della tipografia e della stampa. Lorem Ipsum è considerato il testo segnaposto standard sin dal sedicesimo secolo, quando un anonimo tipografo prese una cassetta di caratteri e li assemblò per preparare un testo campione."),
    //       m("a", { href: "/video", config: m.route, class: "btn btn-primary effect btn-lg" }, "Go to the projects list section")
    //     ])
    //   ])
    // ])
  };

  return {
    controller: function() {
      var ctrl = this;

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

      ctrl.initializeDropper = function() {
        Dropper.init("p#dropper");
      };

      ctrl.countVideos = function(params, args) {
        return Video.all(params, args);
      };

      // ctrl.countVideos({}, ctrl.requestOptions);

    },
    view: mixinLayout(content)
  };
})();

export default dashboard;
