import mixinLayout from "../layout/mixin_layout";
import Session from "../../models/session";
import Slider from "../../models/slider";

var editVideo = (function() {

  var content = function(ctrl) {
    return [
      m("header", { class: "text-right" }, [
        m("a", { class: "btn btn-success" }, "Save"),
        m("a", { class: "btn btn-success" }, "Save and Exit")
      ]),
      m(".row", [
        m(".col-sm-6", [
          m("div", [
            m("img", { src: "/images/videoplaceholder.jpg", class: "img-responsive" })
          ])
        ]),
        m(".col-sm-6", [
          m("div", [
            m("img", { src: "/images/contentplaceholder.png", class: "img-responsive" })
          ])
        ])
      ]),
      m(".clearfix", [
        m("div", { id: "slider", config: ctrl.initializeSlider })
      ]),
      m("footer", { class: "text-right" }, [
        m("a", { class: "btn btn-success" }, "Add Contents")
      ])
    ];
  };

  return {
    controller: function() {
      var ctrl = this;

      if(Session.isExpired()) {
        m.route("/signin");
      }

      ctrl.initializeSlider = function() {
        Slider.init("slider");
      };

    },
    view: mixinLayout(content)
  };
})();

export default editVideo;
