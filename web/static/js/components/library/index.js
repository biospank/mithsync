import mixinLayout from "../layout/mixin_layout";
import Session from "../../models/session";
import Dropper from "../../models/dropper";

var library = (function() {

  var content = function(ctrl) {
    return [
      m("div", {
        class: "dropzone needsclick dz-clickable",
        id: "dropper",
        config: ctrl.initializeDropper
      }),
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
    controller: function() {
      var ctrl = this;
      ctrl.images = m.prop([]);
      ctrl.errors = m.prop({});

      if(!Session.token()) {
        m.route("/signin");
      }

      ctrl.initializeDropper = function() {
        Dropper.init("#dropper");
      };

      ctrl.getImages = function(params, args) {
        return Image.all(params, args).then(function(images) {
          ctrl.images = images;
        }, function(response) {
          ctrl.errors(response.errors);
        })
      };
    },
    view: mixinLayout(content)
  };
})();

export default library;
