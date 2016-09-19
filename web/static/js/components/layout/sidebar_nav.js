import Session from "../../models/session"

var sidebarNav = {
  controller: function(ctrl) {
    return {
      logout: function(event) {
        event.preventDefault();
        Session.reset();
        m.route("/signin");
      }
    };
  },
  view: function(ctrl) {
    return m("nav", { class: "main-nav"}, [
      m("ul", { class: "nav nav-pills nav-stacked" }, [
        m("li", { class: "" }, [
          m("a", { href: "/dashboard", config: m.route, class: "main-nav__tab" }, [
            m("i", { class: "fa fa-dashboard main-nav__icon" }),
            m("span", { class: "main-nav__voice" }, "Dashboard")
          ])
        ]),
        m("li", [
          m("a", { href: "/library", config: m.route, class: "main-nav__tab" }, [
            m("i", { class: "fa fa-picture-o main-nav__icon" }),
            m("span", { class: "main-nav__voice" }, "Library")
          ])
        ]),
        m("li", { class: "active" }, [
          m("a", { href: "#collapseProjectNav", class: "collapsed main-nav__tab", "aria-expanded": false, "data-toggle": "collapse", "data-parent": "#collapseProjectNav" }, [
            m("i", { class: "fa fa-film main-nav__icon" }),
            m("span", { class: "main-nav__voice" }, "Projects"),
            m("i", { class: "caret" })
          ]),
          m("nav", { class: "collapse", id: "collapseProjectNav", "aria-expanded": false }, [
            m("ul", { class: "nav" }, [
              m("li", { class: "" }, [
                m("a", { href: "/video", config: m.route, class: "main-nav__subtab" }, "List")
              ]),
              m("li", { class: "active" }, [
                m("a", { href: "/video/new", config: m.route, class: "main-nav__subtab" }, "New")
              ])
            ])
          ])
        ]),
        m("li", [
          m("a", { href: "/faq", config: m.route, class: "main-nav__tab" }, [
            m("i", { class: "fa fa-question-circle-o main-nav__icon" }),
            m("span", { class: "main-nav__voice" }, "Faq")
          ])
        ]),
        m("li", [
          m("a", { href: "#collapseUserNav", class: "collapsed main-nav__tab", "aria-expanded": false, "data-toggle": "collapse" }, [
            m("i", { class: "fa fa-cog main-nav__icon" }),
            m("span", { class: "main-nav__voice" }, "Account"),
            m("i", { class: "caret" })
          ]),
          m("nav", { class: "collapse", id: "collapseUserNav", "aria-expanded": false }, [
            m("ul", { class: "nav" }, [
              m("li", [
                m("a", { href: "/userprofile", config: m.route, class: "main-nav__subtab" }, "Edit profile")
              ]),
              m("li", [
                m("a", { href: "#", onclick: ctrl.logout, class: "main-nav__subtab" }, "Logout")
              ])
            ])
          ])
        ])
      ])
    ])
  }
};

export default sidebarNav;
