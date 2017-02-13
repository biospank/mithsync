import Session from "../../models/session"
import User from "../../models/user";

var user = (function() {
  var currentUser = m.prop({ email: '' });
  var getCurrentUser = _.once(function() {
    return User.getCurrent({
      background: true,
      initialValue: { data: { email: '' } }
    });
  });

  return {
    controller: function(ctrl) {
      getCurrentUser().then(function(response) {
        currentUser(response.data);
        m.redraw();
      });

      return {
        logout: function(event) {
          event.preventDefault();
          Session.reset();
          m.route("/signin");
        }
      };
    },
    view: function(ctrl) {

      return m(".dropdown", {
          class: "user-avatar clearfix",
          config: function(element, isInit, context) {
            if(!isInit)
              $('.dropdown-toggle').dropdown();
          }
        }, [
        // m("a", {
        //   class: "dropdown-toggle user-avatar__button clearfix",
        //   href: "#",
        //   id: "dropdownMenu1",
        //   "data-toggle": "dropdown",
        //   "aria-haspopup": true,
        //   "aria-expanded": false
        // }, [
        //   m("figure", { class: "user-avatar__photo pull-right" }, [
        //     m("img", { src: "/images/icons/avatar.png", alt: currentUser().email })
        //   ]),
        //   m("div", { class: "user-avatar__name pull-right" }, [
        //     m("span", { class: "text-black" }, currentUser().email),
        //     m("i", { class: "fa fa-caret-down", "aria-hidden": true })
        //   ])
        // ]),
        m("a", {
          class: "dropdown-toggle user-avatar__button clearfix",
          href: "#",
          id: "dropdownMenu1",
          "data-toggle": "dropdown",
          "aria-haspopup": true,
          "aria-expanded": false
        }, [
          m("div", { class: "user-avatar__name" }, [
            m("span", { class: "text-white" }, currentUser().email),
            m("i", { class: "fa fa-caret-down text-white", "aria-hidden": true })
          ])
        ]),
        m("ul", { class: "dropdown-menu", "aria-labelledby": "dropdownMenu1" }, [
          m("li", [
            m("a", { class: "", href: "/userprofile", config: m.route }, "Profile")
          ]),
          m("li", [
            m("a", { class: "", href: "#", onclick: ctrl.logout }, "Logout")
          ])
        ])
      ])
    }
  };
})();

export default user;
