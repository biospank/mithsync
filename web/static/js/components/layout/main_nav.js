import Session from "../../models/session";
import User from "../../models/user";

var mainNav = {
  getCurrentUser: _.throttle(function() {
    return User.getCurrent({
      background: true,
      initialValue: { data: { project_count: 0 } }
    });
  }, 10000),
  controller: function() {
    var user = mainNav.getCurrentUser();

    user.then(m.redraw);

    return {
      projectCount: function() {
        return user().data.project_count;
      },
      logout: function(event) {
        event.preventDefault();
        Session.reset();
        m.route("/signin");
      },
      isActive: function(path) {
        if(_.isArray(path)) {
          return _.find(path, function(p) {
            return _.isEqual(p, m.route());
          });
        } else {
          return _.isEqual(path, m.route());
        }
      }
    };
  },
  view: function(ctrl) {
    return m("nav", { class: "main-nav"}, [
      m("ul", { class: "nav nav-pills nav-stacked" }, [
        m("li", { class: (ctrl.isActive("/") ? 'active' : '') }, [
          m("a", { href: "/", config: m.route, class: "main-nav__tab" }, [
            m("i", { class: "fa fa-dashboard main-nav__icon" }),
            m("span", { class: "main-nav__voice" }, "Dashboard")
          ])
        ]),
        m("li", {  class: (ctrl.isActive("/projects") ? 'active' : '') }, [
          m("a", { href: "/projects", config: m.route, class: "main-nav__tab" }, [
            m("i", { class: "fa fa-film main-nav__icon" }),
            m("span", { class: "main-nav__voice" }, "Projects"),
            m("span", {
              class: "badge"
            }, ctrl.projectCount())
          ])
        ]),
        // m("li", { class: (ctrl.isActive("/faq") ? 'active' : '') }, [
        //   m("a", { href: "/faq", config: m.route, class: "main-nav__tab" }, [
        //     m("i", { class: "fa fa-question-circle-o main-nav__icon" }),
        //     m("span", { class: "main-nav__voice" }, "Faq")
        //   ])
        // ]),
        m("li", {  class: (ctrl.isActive("/userprofile") ? 'active' : '') }, [
          m("a", {
            href: "#collapseUserNav",
            class: "collapsed main-nav__tab",
            "aria-expanded": false,
            "data-toggle": "collapse" }, [
            m("i", { class: "fa fa-cog main-nav__icon" }),
            m("span", { class: "main-nav__voice" }, "Account"),
            m("i", { class: "caret" })
            //m("i", { class: "fa fa-chevron-down main-nav__arrow" })
          ]),
          m("nav", { class: "collapse sub-nav", id: "collapseUserNav", "aria-expanded": false }, [
            m("ul", { class: "nav" }, [
              // m("li", { class: (ctrl.isActive("/userprofile") ? 'active' : '') }, [
              //   m("a", {
              //     href: "/userprofile",
              //     config: m.route,
              //     class: "sub-nav__tab" }, "Edit profile")
              // ]),
              m("li", [
                m("a", {
                  href: "#",
                  onclick: ctrl.logout,
                  class: "sub-nav__tab" }, "Logout")
              ])
            ])
          ])
        ])
      ])
    ])
  }
};

export default mainNav;
