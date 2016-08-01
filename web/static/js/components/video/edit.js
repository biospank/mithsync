import mixinLayout from "../layout/mixin_layout";

var editVideo = (function() {

  var content = function() {
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
      m("footer", { class: "text-right" }, [
        m("a", { class: "btn btn-success" }, "Add Contents")
      ])
    ];
  };

  return {
    controller: function() {},
    view: mixinLayout(content)
  };
})();

export default editVideo;
