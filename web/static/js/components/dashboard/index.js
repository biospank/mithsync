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
          m("article", { class: "col-xs-3 col-sm-3 col-md-3" }, [
            m("div", { class: "box" }, [
              m("h4", { class: "box__title" }, "Create new project"),
              m("div", { class: "text-center" }, [
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
                  class: "btn",
                  href: "#" }, [
                  m("img", { src: "/images/icons/add.png" })
                ])
              ])
            ])
          ]),
          m("article", { class: "col-xs-4 col-sm-4 col-md-4" }, [
            m("div", { class: "box" }, [
              m("h4", { class: "box__title" }, "Projects"),
              m("div", { class: "box__counter" }, [
                m("span", { class: "box__counter-number" }, ctrl.pageInfo.totalEntries || 0),
                m("p", { class: "box__counter-text" }, m.trust("You’ve " + (ctrl.pageInfo.totalEntries || 0) + "<br>projects created"))
              ])
            ]),
            m("ol", { class: "projects-list list-unstyled" }, [
              m("li", [
                m("a", { href: "#", class: "projects-list__row" }, [
                  m("h5", { class: "title" }, "Lorem ipsum dolore"),
                  m("p", { class: "creation-date" }, "5 Febbraio 2015"),
                  m("span", { class: "videos-number"}, "1 video")
                ])
              ]),
              m("li", [
                m("a", { href: "#", class: "projects-list__row" }, [
                  m("h5", { class: "title" }, "Lorem ipsum dolore"),
                  m("p", { class: "creation-date" }, "5 Febbraio 2015"),
                  m("span", { class: "videos-number"}, "1 video")
                ])
              ]),
              m("li", [
                m("a", { href: "#", class: "projects-list__row" }, [
                  m("h5", { class: "title" }, "Lorem ipsum dolore"),
                  m("p", { class: "creation-date" }, "5 Febbraio 2015"),
                  m("span", { class: "videos-number"}, "1 video")
                ])
              ]),
              m("li", [
                m("a", { href: "#", class: "projects-list__row" }, [
                  m("h5", { class: "title" }, "Lorem ipsum dolore"),
                  m("p", { class: "creation-date" }, "5 Febbraio 2015"),
                  m("span", { class: "videos-number"}, "1 video")
                ])
              ])
            ])
          ]),
          m("article", { class: "col-xs-5 col-sm-5 col-md-5" }, [
            m("div", { class: "box" }, [
              m("h4", { class: "box__title" }, "Video"),
              m("div", { class: "box__counter" }, [
                m("span", { class: "box__counter-number" }, ctrl.pageInfo.totalEntries || 0),
                m("p", { class: "box__counter-text" }, m.trust("You’ve " + (ctrl.pageInfo.totalEntries || 0) + "<br>video created"))
              ])
            ]),
            m("ol", { class: "video-list list-unstyled" }, [
              m("li", [
                m("a", { href: "#", class: "video-list__row media" }, [
                  m("figure", { class: "poster media-left" }, [
                    m("a", { href: "#" }, [
                      m("img", { src: "/images/thumb-clouderma.png", class: "media-object" })
                    ])
                  ]),
                  m("div", { class: "media-body" }, [
                    m("h5", { class: "title" }, "Lorem ipsum dolore"),
                    m("p", { class: "description" }, "Lorem ipsum"),
                    m("span", { class: "video-time"}, "02:30")
                  ])
                ])
              ]),
              m("li", [
                m("a", { href: "#", class: "video-list__row media" }, [
                  m("figure", { class: "poster media-left" }, [
                    m("a", { href: "#" }, [
                      m("img", { src: "/images/thumb-clouderma.png", class: "media-object" })
                    ])
                  ]),
                  m("div", { class: "media-body" }, [
                    m("h5", { class: "title" }, "Lorem ipsum dolore"),
                    m("p", { class: "description" }, "Lorem ipsum"),
                    m("span", { class: "video-time"}, "02:30")
                  ])
                ])
              ]),
              m("li", [
                m("a", { href: "#", class: "video-list__row media" }, [
                  m("figure", { class: "poster media-left" }, [
                    m("a", { href: "#" }, [
                      m("img", { src: "/images/thumb-clouderma.png", class: "media-object" })
                    ])
                  ]),
                  m("div", { class: "media-body" }, [
                    m("h5", { class: "title" }, "Lorem ipsum dolore"),
                    m("p", { class: "description" }, "Lorem ipsum"),
                    m("span", { class: "video-time"}, "02:30")
                  ])
                ])
              ]),
              m("li", [
                m("a", { href: "#", class: "video-list__row media" }, [
                  m("figure", { class: "poster media-left" }, [
                    m("a", { href: "#" }, [
                      m("img", { src: "/images/thumb-clouderma.png", class: "media-object" })
                    ])
                  ]),
                  m("div", { class: "media-body" }, [
                    m("h5", { class: "title" }, "Lorem ipsum dolore"),
                    m("p", { class: "description" }, "Lorem ipsum"),
                    m("span", { class: "video-time"}, "02:30")
                  ])
                ])
              ]),
              m("li", [
                m("a", { href: "#", class: "video-list__row media" }, [
                  m("figure", { class: "poster media-left" }, [
                    m("a", { href: "#" }, [
                      m("img", { src: "/images/thumb-clouderma.png", class: "media-object" })
                    ])
                  ]),
                  m("div", { class: "media-body" }, [
                    m("h5", { class: "title" }, "Lorem ipsum dolore"),
                    m("p", { class: "description" }, "Lorem ipsum"),
                    m("span", { class: "video-time"}, "02:30")
                  ])
                ])
              ])
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
