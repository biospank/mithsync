import mixinLayout from "../layout/mixin_layout";

var newVideo = (function() {

  var content = function() {
    return [
      m(".row", [
        m(".col-sm-6", [
          m("form", { role: "form" }, [
            m(".form-group", [
              m("label", "Title"),
              m("input", { type: "text", placeholder: "Title", class: "form-control" } )
            ]),
            m(".form-group", [
              m("label", "Description"),
              m("textarea", { placeholder: "Description", rows: 9, class: "form-control" } ),
            ]),
            m(".form-group", [
              m("label", "Video Link"),
              m("input", { type: "link", placeholder: "Insert video link", class: "form-control" } )
            ]),
            m(".radio", [
              m("label", [
                m("input", { type: "radio", name: "video_type" }),
                m("span", "Public")
              ])
            ]),
            m(".radio", [
              m("label", [
                m("input", { type: "radio", name: "video_type" }),
                m("span", "Private")
              ])
            ]),
            m("button", { type: "submit", class: "btn btn-info" }, "Create")
          ])
        ]),
        m(".col-sm-6", [])
      ])
    ];
  };

  return {
    controller: function() {},
    view: mixinLayout(content)
  };
})();

export default newVideo;
