import mixinLayout from "../layout/mixin_layout";
import textField from "../widgets/text_field";
import recentVideo from "./recent_videos";
import Session from "../../models/session";
import Dropper from "../../models/dropper";

var dashboard = (function() {

  var content = function(ctrl) {
    return [
      m(".row", [
        m(".col-md-4", {}, [
          m(".row", [
            m("div", { class: "col-sm-6" }, [
              m("div", { class: "text-center" }, [
                m("h3", { class: "no-margin-top" }, "1"),
                m("p", { class: "no-margin-bottom" }, "OPEN PROJECTS")
              ])
            ]),
            m("div", { class: "col-sm-6" }, [
              m("div", { class: "text-center" }, [
                m("h3", { class: "no-margin-top" }, "0"),
                m("p", { class: "no-margin-bottom" }, "PROJECTS COMPLETED")
              ])
            ])
          ])
        ]),
        m(".col-md-4", {}, [
          m(".ibox", [
            m("h4", { class: "ibox__head" }, "Projects list" ),
            m("p", { class: "ibox__description" }, [
              m("small", "Here, You can get the last 4 projects")
            ]),
            m("div", { class: "ibox__body" }, [
              m.component(recentVideo)
            ]),
            m("footer", { class: "ibox__footer" }, [
              m("a", { href: "/video", class: "btn btn-success", role: "button", config: m.route }, "View all"),
              m("a", { href: "/video/new", class: "btn btn-primary", role: "button", config: m.route }, "Create NEW")
            ])
          ])
        ]),
        m(".col-md-4", {}, [
          m(".ibox", [
            m("h4", { class: "ibox__head" }, "Library" ),
            m("p", { class: "ibox__description" }, [
              m("small", "Your Library Archive")
            ]),
            m("p", { class: "dropzone", id: "dropper", config: ctrl.initializeDropper}),
            m("div", { class: "ibox__footer" }, [
              m("a", { href: "/library", class: "btn btn-success", config: m.route }, "Go to the Library")
            ])
          ])
        ])
      ])
    ];
  };

  return {
    controller: function() {
      var ctrl = this;

      if(!Session.token()) {
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
