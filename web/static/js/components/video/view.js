import mixinLayout from "../layout/mixin_layout";

var viewVideo = (function() {

  var content = function() {
    return [
      m("header", { class: "text-right" }, [
        m("a", { href:"/video/edit", config: m.route, class: "btn btn-success" }, "Edit"),
        m("a", { href:"/library", config: m.route, class: "btn btn-success" }, "Create Contents")
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
      ])
    ];
  };

  return {
    controller: function() {},
    view: mixinLayout(content)
  };
})();

export default viewVideo;
