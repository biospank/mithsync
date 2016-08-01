import mixinLayout from "../layout/mixin_layout";

var library = (function() {

  var content = function() {
    return [
      m("div", { class: "row" }, [
        m("h5", "Get file from your computer"),
        m("form", { class: "col-sm-7" }, [
          m("input", { type: "file" })
        ])
      ]),
      m("div", { class: "clearfix" }, [
        m("div", { class: "pull-left" }, [
          m("form", { class: "navbar-form search-form", role: "search" }, [
            m(".input-group", [
              m("span", { class: "input-group-btn" }, [
                m("button", { class: "btn btn-default", type: "button" }, [
                  m("i", { class: "fa fa-search" })
                ])
              ]),
              m("input", { type: "text", class: "form-control", placeholder: "Search for..." })
            ])
          ])
        ]),
        m("div", { class: "pull-right" }, [
          m("a", { class: "btn btn-success" }, "Create content")
        ])
      ]),
      m("div", { class: "row" }, [
        m(".col-xs-6 .col-sm-4 .col-md-3", [
          m("a", { href: "#" }, [
            m("img", { src: "/images/videoplaceholder.jpg", class: "img-responsive" }),
            m("div", { class: "btn-group", role: "group" }, [
              m("button", { type: "button", class: "btn btn-default" }, [
                m("i", { class: "fa fa-trash", "aria-hidden": true })
              ]),
              m("button", { type: "button", class: "btn btn-default" }, [
                m("i", { class: "fa fa-pencil-square-o", "aria-hidden": true })
              ]),
              m("button", { type: "button", class: "btn btn-default" }, [
                m("i", { class: "fa fa-check", "aria-hidden": true })
              ])
            ])
          ])
        ]),
        m(".col-xs-6 .col-sm-4 .col-md-3", [
          m("a", { href: "#" }, [
            m("img", { src: "/images/videoplaceholder.jpg", class: "img-responsive" }),
            m("div", { class: "btn-group", role: "group" }, [
              m("button", { type: "button", class: "btn btn-default" }, [
                m("i", { class: "fa fa-trash", "aria-hidden": true })
              ]),
              m("button", { type: "button", class: "btn btn-default" }, [
                m("i", { class: "fa fa-pencil-square-o", "aria-hidden": true })
              ]),
              m("button", { type: "button", class: "btn btn-default" }, [
                m("i", { class: "fa fa-check", "aria-hidden": true })
              ])
            ])
          ])
        ]),
        m(".col-xs-6 .col-sm-4 .col-md-3", [
          m("a", { href: "#" }, [
            m("img", { src: "/images/videoplaceholder.jpg", class: "img-responsive" }),
            m("div", { class: "btn-group", role: "group" }, [
              m("button", { type: "button", class: "btn btn-default" }, [
                m("i", { class: "fa fa-trash", "aria-hidden": true })
              ]),
              m("button", { type: "button", class: "btn btn-default" }, [
                m("i", { class: "fa fa-pencil-square-o", "aria-hidden": true })
              ]),
              m("button", { type: "button", class: "btn btn-default" }, [
                m("i", { class: "fa fa-check", "aria-hidden": true })
              ])
            ])
          ])
        ]),
        m(".col-xs-6 .col-sm-4 .col-md-3", [
          m("a", { href: "#" }, [
            m("img", { src: "/images/videoplaceholder.jpg", class: "img-responsive" }),
            m("div", { class: "btn-group", role: "group" }, [
              m("button", { type: "button", class: "btn btn-default" }, [
                m("i", { class: "fa fa-trash", "aria-hidden": true })
              ]),
              m("button", { type: "button", class: "btn btn-default" }, [
                m("i", { class: "fa fa-pencil-square-o", "aria-hidden": true })
              ]),
              m("button", { type: "button", class: "btn btn-default" }, [
                m("i", { class: "fa fa-check", "aria-hidden": true })
              ])
            ])
          ])
        ]),
        m(".col-xs-6 .col-sm-4 .col-md-3", [
          m("a", { href: "#" }, [
            m("img", { src: "/images/videoplaceholder.jpg", class: "img-responsive" }),
            m("div", { class: "btn-group", role: "group" }, [
              m("button", { type: "button", class: "btn btn-default" }, [
                m("i", { class: "fa fa-trash", "aria-hidden": true })
              ]),
              m("button", { type: "button", class: "btn btn-default" }, [
                m("i", { class: "fa fa-pencil-square-o", "aria-hidden": true })
              ]),
              m("button", { type: "button", class: "btn btn-default" }, [
                m("i", { class: "fa fa-check", "aria-hidden": true })
              ])
            ])
          ])
        ]),
        m(".col-xs-6 .col-sm-4 .col-md-3", [
          m("a", { href: "#" }, [
            m("img", { src: "/images/videoplaceholder.jpg", class: "img-responsive" }),
            m("div", { class: "btn-group", role: "group" }, [
              m("button", { type: "button", class: "btn btn-default" }, [
                m("i", { class: "fa fa-trash", "aria-hidden": true })
              ]),
              m("button", { type: "button", class: "btn btn-default" }, [
                m("i", { class: "fa fa-pencil-square-o", "aria-hidden": true })
              ]),
              m("button", { type: "button", class: "btn btn-default" }, [
                m("i", { class: "fa fa-check", "aria-hidden": true })
              ])
            ])
          ])
        ]),
        m(".col-xs-6 .col-sm-4 .col-md-3", [
          m("a", { href: "#" }, [
            m("img", { src: "/images/videoplaceholder.jpg", class: "img-responsive" }),
            m("div", { class: "btn-group", role: "group" }, [
              m("button", { type: "button", class: "btn btn-default" }, [
                m("i", { class: "fa fa-trash", "aria-hidden": true })
              ]),
              m("button", { type: "button", class: "btn btn-default" }, [
                m("i", { class: "fa fa-pencil-square-o", "aria-hidden": true })
              ]),
              m("button", { type: "button", class: "btn btn-default" }, [
                m("i", { class: "fa fa-check", "aria-hidden": true })
              ])
            ])
          ])
        ]),
        m(".col-xs-6 .col-sm-4 .col-md-3", [
          m("a", { href: "#" }, [
            m("img", { src: "/images/videoplaceholder.jpg", class: "img-responsive" }),
            m("div", { class: "btn-group", role: "group" }, [
              m("button", { type: "button", class: "btn btn-default" }, [
                m("i", { class: "fa fa-trash", "aria-hidden": true })
              ]),
              m("button", { type: "button", class: "btn btn-default" }, [
                m("i", { class: "fa fa-pencil-square-o", "aria-hidden": true })
              ]),
              m("button", { type: "button", class: "btn btn-default" }, [
                m("i", { class: "fa fa-check", "aria-hidden": true })
              ])
            ])
          ])
        ]),
        m(".col-xs-6 .col-sm-4 .col-md-3", [
          m("a", { href: "#" }, [
            m("img", { src: "/images/videoplaceholder.jpg", class: "img-responsive" }),
            m("div", { class: "btn-group", role: "group" }, [
              m("button", { type: "button", class: "btn btn-default" }, [
                m("i", { class: "fa fa-trash", "aria-hidden": true })
              ]),
              m("button", { type: "button", class: "btn btn-default" }, [
                m("i", { class: "fa fa-pencil-square-o", "aria-hidden": true })
              ]),
              m("button", { type: "button", class: "btn btn-default" }, [
                m("i", { class: "fa fa-check", "aria-hidden": true })
              ])
            ])
          ])
        ]),
        m(".col-xs-6 .col-sm-4 .col-md-3", [
          m("a", { href: "#" }, [
            m("img", { src: "/images/videoplaceholder.jpg", class: "img-responsive" }),
            m("div", { class: "btn-group", role: "group" }, [
              m("button", { type: "button", class: "btn btn-default" }, [
                m("i", { class: "fa fa-trash", "aria-hidden": true })
              ]),
              m("button", { type: "button", class: "btn btn-default" }, [
                m("i", { class: "fa fa-pencil-square-o", "aria-hidden": true })
              ]),
              m("button", { type: "button", class: "btn btn-default" }, [
                m("i", { class: "fa fa-check", "aria-hidden": true })
              ])
            ])
          ])
        ])
      ]),
      m("div", [
        m("a", { class: "btn btn-success" }, "Insert")
      ])
    ];
  };

  return {
    controller: function() {},
    view: mixinLayout(content)
  };
})();

export default library;
