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
                m.component(user)
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
                    m("img", { src: "/images/icons/search.png" })
                  ])
                ])
              ])
            ]),
            m.component(mainNav)
          ]),
          m("section", { id: "page-content-wrapper" }, [
            m.component(topBar),
            content
          ])
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
