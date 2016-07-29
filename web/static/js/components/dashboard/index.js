import mixinLayout from "../layout/mixin_layout";
import textField from "../widgets/text_field";
import projects from "./projects";
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
          m.component(projects)
        ]),
        m(".col-md-4", {}, [
          m(".ibox", [
            m("h4", { class: "ibox__head" }, "Library" ),
            m("p", { class: "ibox__description" }, [
              m("small", "Your Library Archive")
            ]),
            m("p", { class: "dropzone", id: "dropper", config: ctrl.initializeDropper}),
            m("div", { class: "ibox__footer" }, [
              m("a", { class: "btn btn-success" }, "Go to the Library")
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
