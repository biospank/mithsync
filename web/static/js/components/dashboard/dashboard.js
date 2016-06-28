import mixinLayout from "../layout/mixin_layout";
import textField from "../widgets/text_field";
import projectsList from "./projects_list";
import Session from "../../models/session";

var dashboard = (function() {

  var content = function() {
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
          m.component(projectsList)
        ]),
        m(".col-md-4", {}, [
          // dashboardItems.map(dashboardBox)
        ])
      ])
    ];
  };

  return {
    controller: function() {
      if(!Session.token())
        m.route("/signin");
    },
    view: mixinLayout(content)
  };
})();

export default dashboard;
