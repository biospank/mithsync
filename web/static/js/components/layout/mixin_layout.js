import topBar from "./top_bar";
import mainNav from "./main_nav";
import user from "./user";

var mixinLayout = function(content, layout) {

  var layouts = {
    login: function(content) {
      return [
        //m.component(topNav),
        m('main', { class: 'main-container'}, [
          m('.container', content)
        ])
      ]
    },
    standard: function(content) {
      return [
        m("nav", { class: "navbar navbar-default navbar-fixed-top" }, [
          m(".container", [
            m(".clearfix", {}, [
              m(".pull-left", [
                m("a", "Zinkroo"),
                m("button", [
                  m("i", { class: "fa fa-bars", "aria-hidden": true })
                ])
              ]),
              m(".pull-right", [
                // m.component(user),
                m(".dropdown", { id: "user-avatar" }, [
                  m("a", {
                    "data-toggle": "dropdown",
                    class: "dropdown-toggle",
                    href: "#",
                    "aria-expanded": false }, [
                      m("img", { src: "", alt: "" }),
                      m("span", "Ilaria Di Rosa"),
                      m("i", { class: "fa fa-angle-down", "aria-hidden": true })
                    ]),
                  m("ul", { class: "dropdown-menu list-unstyled" }, [
                    m("li", [
                      m("a", { class: "", href: "#" }, "link")
                    ]),
                    m("li", [
                      m("a", { class: "", href: "#" }, "link")
                    ])
                  ])
                ])
              ])
            ])
          ])
        ]),
        m("section", { class: "clearfix", id: "wrapper" }, {
          config: function() {
            $("#menu-toggle").click(function(e) {
                e.preventDefault();
                $("#wrapper").toggleClass("toggled");
            });
          }
        }, [
          m("aside", { id: "sidebar-wrapper" }, [
            m("form", { class: "navbar-form navbar-left" }, [
              m(".form-group", [
                m("input", { type: "text", class: "form-control", placeholder: "Search" })
              ]),
              m("button", { type: "submit", class: "btn btn-default" }, "submit")
            ]),
            m("nav", [
              m("ul", { class: "nav" }, [
                m("li", [
                  m("a", { href: "#" }, "Link")
                ]),
                m("li", [
                  m("a", { href: "#" }, "Link")
                ]),
                m("li", [
                  m("a", { href: "#" }, "Link")
                ])
              ])
            ])
          ]),
          m("section", { id: "page-content-wrapper" }, [
            m.component(topBar),
            content
          ])
          //m.component(topBar),
          // m('aside', { class: 'sidebar', id: 'sidebar-wrapper' }, [
          //   m.component(user),
          //   m.component(mainNav)
          // ]),
          // m('main', { id: "page-content-wrapper" }, [
          //   content
          // ])
        ]),
        m("footer", { id: "page-footer" }, [
          m(".container", "© Company 2016. All rights reserved. Terms of Service | Privacy Policy")
        ])
      ]
    }
  };

  return function(ctrl) {
    return layouts[(layout || "standard")](content(ctrl));
  };
};

export default mixinLayout;
