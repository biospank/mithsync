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
        m("nav", { class: "topbar navbar-fixed-top" }, [
          m(".container", [
            m(".clearfix", {}, [
              m(".pull-left", [
                m("a", { href: "#", class: "navbar-brand" }, [
                  m("img", { src: "/images/logo.jpg", alt: "Zinkroo" })
                ]),
                m("button", { class: "navbar-button" }, [
                  m("i", { class: "fa fa-bars", "aria-hidden": true })
                ])
              ]),
              m(".pull-right", [
                // m.component(user),
                m(".dropdown", { class: "user-avatar" }, [
                  m("a", {
                    "data-toggle": "dropdown",
                    class: "dropdown-toggle",
                    href: "#",
                    "aria-expanded": false }, [
                      m("figure", { class: "user-avatar__photo" }, [
                        m("img", { src: "/images/avatar.jpg", alt: "Ilaria Di Rosa" })
                      ]),
                      m("div", { class: "user-avatar__name" }, [
                        m("span", "Ilaria Di Rosa"),
                        m("i", { class: "fa fa-caret-down", "aria-hidden": true })
                      ])
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
            m("form", { class: "navbar-form page-search-form" }, [
              m(".input-group", [
                m("input", { type: "text", class: "form-control", placeholder: "Search" }),
                m("span", { class: "input-group-btn" }, [
                  m("button", { type: "submit", class: "btn btn-default" }, [
                    //m("i", { class: "fa fa-search", "aria-hidden": true })
                    m("img", { src: "/images/icons/search.png" })
                  ])
                ])
              ])
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
