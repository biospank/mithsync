import Session from "../../models/session"

var user = {
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

    // return m(".user-avatar", [
    //   m("i", { class: "fa fa-user", "aria-hidden": "true" })
    // ]);

    // return m(".user-avatar", [
    //   m("img", { src: "/images/avatar.jpg", alt: "Ilaria Di Rosa" }),
    //   m("span", { class: "user-avatar__name" }, "Ilaria Di Rosa")
    //   //m("b", { class: "caret" })
    // ])

    return m(".dropdown", {
        class: "user-avatar clearfix",
        config: function(element, isInit, context) {
          if(!isInit)
            $('.dropdown-toggle').dropdown();
        }
      }, [
      m("a", {
        class: "dropdown-toggle user-avatar__button clearfix",
        href: "#",
        id: "dropdownMenu1",
        "data-toggle": "dropdown",
        "aria-haspopup": true,
        "aria-expanded": false
      }, [
        m("figure", { class: "user-avatar__photo pull-right" }, [
          m("img", { src: "/images/icons/avatar.png", alt: "Ilaria Di Rosa" })
        ]),
        m("div", { class: "user-avatar__name pull-right" }, [
          //m("span", "Benvenuto "),
          m("span", { class: "text-black" }, "dirosa.ilaria@gmail.com"),
          m("i", { class: "fa fa-caret-down", "aria-hidden": true })
        ])
      ]),
      m("ul", { class: "dropdown-menu", "aria-labelledby": "dropdownMenu1" }, [
        m("li", [
          m("a", { class: "", href: "/userprofile", config: m.route }, "Mio Profilo")
        ]),
        // m("li", [
        //   m("a", { class: "", href: "#" }, "Logout")
        // ])
        m("li", [
          m("a", { class: "", href: "#" }, "Logout")
        ])
      ])
    ])
  }
};

export default user;
