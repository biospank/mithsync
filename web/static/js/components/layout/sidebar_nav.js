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
    return m("nav", { class: "main-nav" }, [
      m("ul", { class: "nav nav-pills nav-stacked" }, [
        m("li", { class: "active" }, [
          m("a", { href: "/dashboard", config: m.route }, [
            m("i", { class: "fa fa-dashboard" }),
            m("span", {}, "Dashboard")
          ])
        ]),
        m("li", [
          m("a", { href: "/library", config: m.route }, [
            m("i", { class: "fa fa-picture-o" }),
            m("span", {}, "Library")
          ])
        ]),
        m("li", [
          m("a", { href: "#collapseProjectNav", class: "collapsed user__name", "aria-expanded": false, "data-toggle": "collapse" }, [
            m("i", { class: "fa fa-film" }),
            m("span", {}, "Projects"),
            m("i", { class: "caret" })
          ]),
          m("nav", { class: "collapse", id: "collapseProjectNav", "aria-expanded": false }, [
            m("ul", { class: "nav" }, [
              m("li", [
                m("a", { href: "/video", config: m.route }, "List")
              ]),
              m("li", [
                m("a", { href: "/video/new", config: m.route }, "New")
              ])
            ])
          ])
        ]),
        m("li", [
          m("a", { href: "#collapseUserNav", class: "collapsed user__name", "aria-expanded": false, "data-toggle": "collapse" }, [
            m("i", { class: "fa fa-cog" }),
            m("span", {}, "Account"),
            m("i", { class: "caret" })
          ]),
          m("nav", { class: "collapse user__nav", id: "collapseUserNav", "aria-expanded": false }, [
            m("ul", { class: "nav" }, [
              m("li", [
                m("a", { href: "/userprofile", config: m.route }, "Edit profile")
              ]),
              m("li", [
                m("a", { href: "#", onclick: ctrl.logout }, "Logout")
              ])
            ])
          ])
        ])
      ])
    ])
  }
};

export default sidebarNav;
