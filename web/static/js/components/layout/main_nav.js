import Session from "../../models/session";
import User from "../../models/user";

const mainNav = {
  oninit(vnode) {

    this.user = undefined;

    this.projectCount = () => {
      return 0;
      // return user().data.project_count;
    };

    this.logout = (event) => {
      event.preventDefault();
      Session.reset();
      m.route.set("/signin");
    };

    this.isActive = (path) => {
      if(_.isArray(path)) {
        return _.find(path, (p) => {
          return _.isEqual(p, m.route.get());
        });
      } else {
        return _.isEqual(path, m.route.get());
      }
    };
  },
  view({state}) {
    return m("nav", { class: "main-nav"}, [
      m("ul", { class: "nav nav-pills nav-stacked" }, [
        m("li", { class: (state.isActive("/dashboard") ? 'active main-nav__tab' : 'main-nav__tab') }, [
          m("a", { href: "dashboard", oncreate: m.route.link, class: "" }, [
            m("i", { class: "fa fa-dashboard main-nav__icon" }),
            m("span", { class: "main-nav__voice" }, "Dashboard")
          ])
        ]),
        m("li", {  class: (state.isActive("/projects") ? 'active main-nav__tab' : 'main-nav__tab') }, [
          m("a", { href: "/projects", oncreate: m.route.link, class: "" }, [
            m("i", { class: "fa fa-film main-nav__icon" }),
            m("span", { class: "main-nav__voice" }, "Projects"),
            m("span", {
              class: "badge radius"
            }, state.projectCount())
          ])
        ]),
        m("li", {  class: (state.isActive("/userprofile") ? 'active main-nav__tab' : 'main-nav__tab') }, [
          m("a", {
            href: "#collapseUserNav",
            class: "collapsed",
            "aria-expanded": false,
            "data-toggle": "collapse" }, [
            m("i", { class: "fa fa-cog main-nav__icon" }),
            m("span", { class: "main-nav__voice" }, "Account"),
            m("i", { class: "caret" })
            //m("i", { class: "fa fa-chevron-down main-nav__arrow" })
          ]),
          m("nav", { class: "collapse sub-nav", id: "collapseUserNav", "aria-expanded": false }, [
            m("ul", { class: "nav" }, [
              m("li", { class: (state.isActive("/userprofile") ? 'active sub-nav__tab' : 'sub-nav__tab') }, [
                m("a", {
                  href: "/userprofile",
                  oncreate: m.route.link,
                  class: "" }, "Profile")
              ]),
              m("li", { class: "sub-nav__tab" }, [
                m("a", {
                  href: "#",
                  onclick: this.logout,
                  class: "" }, "Logout")
              ])
            ])
          ])
        ])
      ])
    ]);
  }
}

// var mainNav = {
//   getCurrentUser: _.throttle(function() {
//     return User.getCurrent({
//       background: true,
//       initialValue: { data: { project_count: 0 } }
//     });
//   }, 10000),
//   controller: function() {
//     var user = mainNav.getCurrentUser();
//
//     user.then(m.redraw);
//
//     return {
//       projectCount: function() {
//         return user().data.project_count;
//       },
//       logout: function(event) {
//         event.preventDefault();
//         Session.reset();
//         m.route("/signin");
//       },
//       isActive: function(path) {
//         if(_.isArray(path)) {
//           return _.find(path, function(p) {
//             return _.isEqual(p, m.route());
//           });
//         } else {
//           return _.isEqual(path, m.route());
//         }
//       }
//     };
//   },
//   view: function(ctrl) {
//     return m("nav", { class: "main-nav"}, [
//       m("ul", { class: "nav nav-pills nav-stacked" }, [
//         m("li", { class: (ctrl.isActive("/dashboard") ? 'active main-nav__tab' : 'main-nav__tab') }, [
//           m("a", { href: "/dashboard", config: m.route, class: "" }, [
//             m("i", { class: "fa fa-dashboard main-nav__icon" }),
//             m("span", { class: "main-nav__voice" }, "Dashboard")
//           ])
//         ]),
//         m("li", {  class: (ctrl.isActive("/projects") ? 'active main-nav__tab' : 'main-nav__tab') }, [
//           m("a", { href: "/projects", config: m.route, class: "" }, [
//             m("i", { class: "fa fa-film main-nav__icon" }),
//             m("span", { class: "main-nav__voice" }, "Projects"),
//             m("span", {
//               class: "badge radius"
//             }, ctrl.projectCount())
//           ])
//         ]),
//         // m("li", { class: (ctrl.isActive("/faq") ? 'active' : '') }, [
//         //   m("a", { href: "/faq", config: m.route, class: "main-nav__tab" }, [
//         //     m("i", { class: "fa fa-question-circle-o main-nav__icon" }),
//         //     m("span", { class: "main-nav__voice" }, "Faq")
//         //   ])
//         // ]),
//         m("li", {  class: (ctrl.isActive("/userprofile") ? 'active main-nav__tab' : 'main-nav__tab') }, [
//           m("a", {
//             href: "#collapseUserNav",
//             class: "collapsed",
//             "aria-expanded": false,
//             "data-toggle": "collapse" }, [
//             m("i", { class: "fa fa-cog main-nav__icon" }),
//             m("span", { class: "main-nav__voice" }, "Account"),
//             m("i", { class: "caret" })
//             //m("i", { class: "fa fa-chevron-down main-nav__arrow" })
//           ]),
//           m("nav", { class: "collapse sub-nav", id: "collapseUserNav", "aria-expanded": false }, [
//             m("ul", { class: "nav" }, [
//               m("li", { class: (ctrl.isActive("/userprofile") ? 'active sub-nav__tab' : 'sub-nav__tab') }, [
//                 m("a", {
//                   href: "/userprofile",
//                   config: m.route,
//                   class: "" }, "Profile")
//               ]),
//               m("li", { class: "sub-nav__tab" }, [
//                 m("a", {
//                   href: "#",
//                   onclick: ctrl.logout,
//                   class: "" }, "Logout")
//               ])
//             ])
//           ])
//         ])
//       ])
//     ])
//   }
// };

export default mainNav;
