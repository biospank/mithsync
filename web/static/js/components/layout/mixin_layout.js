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
            m("#navbar", {}, [
              m("form", { class: "navbar-form navbar-left" }, [
                m(".form-group", [
                  m("input", { type: "text", class: "form-control", placeholder: "Search" })
                ]),
                m("button", { type: "submit", class: "btn btn-default" }, "submit")
              ]),
              m("ul", { class: "nav navbar-nav navbar-right" }, [
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
            // m.component(user),
            m("figure", [
              m("img", { src: "" }, [])
            ]),
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
          m(".container", "Footer")
        ])
      ]
    }
  };

  return function(ctrl) {
    return layouts[(layout || "standard")](content(ctrl));
  };
};

export default mixinLayout;
