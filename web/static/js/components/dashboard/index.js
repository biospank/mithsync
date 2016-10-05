import mixinLayout from "../layout/mixin_layout";
import textField from "../widgets/text_field";
import recentVideo from "./recent_videos";
import Session from "../../models/session";
import Dropper from "../../models/dropper";
import Video from "../../models/video";
import Project from "../../models/project";

var dashboard = (function() {

  var content = function(ctrl) {
    return [
      m("main", { class: "main-container" }, [
        m("section", { class: "row" }, [
          m("article", { class: "col-xs-3" }, [
            m("div", { class: "box" }, [
              m("h4", { class: "box__title" }, "Create new project"),
              m("a", {
                onclick: function() {
                  swal({
                    title: 'Project name',
                    input: 'text',
                    showCancelButton: true,
                    confirmButtonText: 'Create',
                    inputValidator: function(value) {
                      return new Promise(function(resolve, reject) {
                        if (value) {
                          resolve();
                        } else {
                          reject('You need to write something!');
                        }
                      });
                    },
                  }).then(function(value) {
                    Project.model.name(value);
                    Project.create().then(function(data) {
                      m.route("/projects");
                    })
                  }, function(dismiss) {

                  })
                },
                class: "text-center",
                href: "#" }, [
                m("img", { src: "/images/icons/add.png" })
              ])
            ])
          ]),
          m("article", { class: "col-xs-3" }, [
            m("div", { style: "background-color: pink" }, "column 2"),
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
          m("article", { class: "col-xs-3" }, [
            m("div", { style: "background-color: pink" }, "column 3"),
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
          m("article", { class: "col-xs-3" }, [
            m("div", { style: "background-color: pink" }, "column 4")
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
