import mixinLayout from "../layout/mixin_layout";
import Session from "../../models/session";
import Video from "../../models/video";

var infoVideo = (function() {

  var content = function(ctrl, video) {
    return m("section", [
      m(".wrapper bordered", [
        m("div", [
          m("label", "Name"),
          m("p", "Principessa")
        ])
      ]),
      m("a", {
        //href: "/video/" + video.id + "/edit",
        class: "btn btn-primary btn-md text-uppercase",
        //class: "btn btn-primary icon-left",
        config: m.route }, "Back to project")
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
