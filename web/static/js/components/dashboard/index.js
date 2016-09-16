import mixinLayout from "../layout/mixin_layout";
import textField from "../widgets/text_field";
import recentVideo from "./recent_videos";
import Session from "../../models/session";
import Dropper from "../../models/dropper";

var dashboard = (function() {

  var content = function(ctrl) {
    return [
      m(".row", [
        m(".col-md-6", {}, [
          m(".wrapper", [
            m("h3", { class: "no-margin-top" }, "Projects list"),
            m("p", "Lorem Ipsum è un testo segnaposto utilizzato nel settore della tipografia e della stampa. Lorem Ipsum è considerato il testo segnaposto standard sin dal sedicesimo secolo, quando un anonimo tipografo prese una cassetta di caratteri e li assemblò per preparare un testo campione."),
            m("a", { href: "/video", config: m.route, class: "btn btn-primary" }, "Go to the projects list section")
          ]),
          m(".wrapper", [
            m("h3", { class: "no-margin-top" }, "Titolo sezione"),
            m("p", "Lorem Ipsum è un testo segnaposto utilizzato nel settore della tipografia e della stampa."),
            m("a", { class: "btn btn-primary" }, "Link sezione")
          ]),
          m(".wrapper", [
            m("h3", { class: "no-margin-top" }, "Titolo sezione"),
            m("p", "Testo sezione"),
            m("a", { class: "btn btn-primary" }, "Link sezione")
          ])
          // m(".ibox", [
          //   m("h4", { class: "ibox__head" }, "Projects list" ),
          //   m("p", { class: "ibox__description" }, [
          //     m("small", "Here, You can get the last 4 projects")
          //   ]),
          //   m("div", { class: "ibox__body" }, [
          //     m.component(recentVideo)
          //   ]),
          //   m("footer", { class: "ibox__footer" }, [
          //     m("a", { href: "/video", class: "btn btn-success btn-md", role: "button", config: m.route }, "View all"),
          //     m("a", { href: "/video/new", class: "btn btn-primary btn-md", role: "button", config: m.route }, "Create NEW")
          //   ])
          // ])
        ]),
        m(".col-md-6", {}, [
          m(".wrapper", [
            m("h3", { class: "no-margin-top" }, "Library"),
            m("p", m.trust("Into the library section you can upload every image you need." +
            "<br>" +  "Before you can use  image in the project, you have to upload it here." + "<br><br>" +
            "You can start by section below as well!")),
            m("p", { class: "dropzone", id: "dropper", config: ctrl.initializeDropper}),
            m("a", { href: "/library", config: m.route, class: "btn btn-primary" }, "Go to the library section")
          ])
          // m(".ibox", [
          //   m("h4", { class: "ibox__head" }, "Library" ),
          //   m("p", { class: "ibox__description" }, [
          //     m("small", "Your Library Archive")
          //   ]),
          //   m("p", { class: "dropzone", id: "dropper", config: ctrl.initializeDropper}),
          //   m("div", { class: "ibox__footer" }, [
          //     m("a", { href: "/library", class: "btn btn-success", config: m.route }, "Go to the Library")
          //   ])
          // ])
        ])
      ])
    ];
  };

  return {
    controller: function() {
      var ctrl = this;

      if(Session.isExpired()) {
        m.route("/signin");
      }

      ctrl.initializeDropper = function() {
        Dropper.init("p#dropper");
      };

    },
    view: mixinLayout(content)
  };
})();

export default dashboard;
