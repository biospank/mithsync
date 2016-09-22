import mixinLayout from "../layout/mixin_layout";
import Session from "../../models/session";
import Video from "../../models/video";

var infoVideo = (function() {

  var content = function(ctrl, video) {
    return m("section", [
      m("div", { class: "light-form" }, [
        m("div", { class: "row" }, [
          m(".col-md-6", [
            m("div", { class: "form-group" }, [
              m("label", { class: "text-uppercase" }, "Name"),
              m("input", { class: "form-control", value: "Principessa" })
            ])
          ]),
          m(".col-md-6", [
            m("div", { class: "form-group" }, [
              m("label", { class: "text-uppercase" }, "Create date"),
              m("p", { class: "form-control" }, "2016-09-15")
            ])
          ])
        ]),
        m("div", { class: "form-group" }, [
          m("label", { class: "text-uppercase" }, "Description"),
          m("textarea", { class: "form-control" }, "Lorem Ipsum è un testo segnaposto utilizzato nel settore della tipografia e della stampa. Lorem Ipsum è considerato il testo segnaposto standard sin dal sedicesimo secolo, quando un anonimo tipografo prese una cassetta di caratteri e li assemblò per preparare un testo campione.")
        ]),
        m("div", { class: "row" }, [
          m(".col-md-8", [
            m("div", { class: "form-group" }, [
              m("label", { class: "text-uppercase" }, "Url Youtube"),
              m("p", { class: "form-control" }, "https://www.youtube.com/watch?v=dBlIFzJIN2A")
            ])
          ]),
          m(".col-md-4", [
            m("div", { class: "form-group" }, [
              m("label", { class: "text-uppercase" }, "Video time"),
              m("p", { class: "form-control" }, "10min.")
            ])
          ])
        ])
      ]),
      m(".clearfix", [
        m("a", {
          //href: "/video/" + video.id + "/edit",
          class: "btn btn-primary effect btn-md icon-left text-uppercase mgt30 pull-left",
          config: m.route }, [
            m("i", { class: "fa fa-reply", "aria-hidden": true }),
            m("span", "Back to project")
          ]),
        m("button", { class: "btn btn-success effect btn-md text-uppercase mgt30 pull-right" }, "Save")
      ])
    ])
  };

  return {
    controller: function(video, parent){
      var ctrl = this;

      if(Session.isExpired()) {
        m.route("/signin");
      };
    },
    view: mixinLayout(content)
  };
})();

export default infoVideo;
