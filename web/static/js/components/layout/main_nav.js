import Session from "../../models/session"

var mainNav = {
  controller: function(ctrl) {
    return {
      logout: function(event) {
        event.preventDefault();
        Session.reset();
        m.route("/signin");
      },
      isActive: function(path) {
        return _.isEqual(path, m.route());
      },
      keepOpen: function(event, path) {
        console.log(event.target);
        event.preventDefault();
        $(event.target).closest(".sub-nav").addClass("in");
        m.route(path);
      }
    };
  },
  view: function(ctrl) {
    return m("nav", { class: "main-nav"}, [
      m("ul", { class: "nav nav-pills nav-stacked" }, [
        m("li", { class: (ctrl.isActive("/") ? 'active' : '') }, [
          m("a", { href: "/dashboard", config: m.route, class: "main-nav__tab" }, [
            m("i", { class: "fa fa-dashboard main-nav__icon" }),
            m("span", { class: "main-nav__voice" }, "Dashboard")
          ])
        ]),
        m("li", { class:  (ctrl.isActive("/library") ? 'active' : '')}, [
          m("a", { href: "/library", config: m.route, class: "main-nav__tab" }, [
            m("i", { class: "fa fa-picture-o main-nav__icon" }),
            m("span", { class: "main-nav__voice" }, "Library")
          ])
        ]),
        m("li", [
          m("a", { href: "#collapseProjectNav", class: "collapsed main-nav__tab", "aria-expanded": false, "data-toggle": "collapse" }, [
            m("i", { class: "fa fa-film main-nav__icon" }),
            m("span", { class: "main-nav__voice" }, "Projects"),
            m("i", { class: "caret" })
          ]),
          m("nav", {
              class: "collapse sub-nav",
              id: "collapseProjectNav",
              "aria-expanded": false
            }, [
            m("ul", { class: "nav" }, [
              m("li", { class: (ctrl.isActive("/video") ? 'active' : '') }, [
                m("a", {
                  href: "/video",
                  config: m.route,
                  class: "sub-nav__tab" }, [
                  m("i", { class: "fa fa-angle-right sub-nav__icon" }),
                  m("span", { class: "sub-nav__voice" }, "List")
                ])
              ]),
              m("li", { class: (ctrl.isActive("/video/new") ? 'active' : '') }, [
                m("a", { href: "/video/new", onclick: ctrl.keepOpen, class: "sub-nav__tab" }, [
                  m("i", { class: "fa fa-angle-right sub-nav__icon" }),
                  m("span", { class: "sub-nav__voice" }, "New")
                ])
              ])
            ])
          ])
        ]),
        m("li", { class: (ctrl.isActive("/faq") ? 'active' : '') }, [
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
          m("nav", { class: "collapse sub-nav", id: "collapseUserNav", "aria-expanded": false }, [
            m("ul", { class: "nav" }, [
              m("li", { class: (ctrl.isActive("/userprofile") ? 'active' : '') }, [
                m("a", { href: "/userprofile", config: m.route, class: "sub-nav__tab" }, [
                  m("i", { class: "fa fa-angle-right sub-nav__icon" }),
                  m("span", { class: "sub-nav__voice" }, "Edit profile")
                ])
              ]),
              m("li", [
                m("a", { href: "#", onclick: ctrl.logout, class: "sub-nav__tab" }, [
                  m("i", { class: "fa fa-angle-right sub-nav__icon" }),
                  m("span", { class: "sub-nav__voice" }, "Logout")
                ])
              ])
            ])
          ])
        ])
      ])
    ])
  }
};

export default mainNav;
