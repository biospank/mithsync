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
    return m(".user-avatar", [
      m("img", { src: "/images/avatar.jpg", alt: "Ilaria Di Rosa" }),
      m("span", { class: "user-avatar__name" }, "Ilaria Di Rosa")
      //m("b", { class: "caret" })
    ])
    // return m(".dropdown", { class: "user-avatar" }, [
    //   m("a", {
    //     "data-toggle": "dropdown",
    //     class: "dropdown-toggle",
    //     href: "#",
    //     "aria-expanded": false }, [
    //       m("figure", { class: "user-avatar__photo" }, [
    //         m("img", { src: "/images/avatar.jpg", alt: "Ilaria Di Rosa" })
    //       ]),
    //       m("div", { class: "user-avatar__name" }, [
    //         m("span", "Ilaria Di Rosa"),
    //         m("i", { class: "fa fa-caret-down", "aria-hidden": true })
    //       ])
    //     ]),
    //   m("ul", { class: "dropdown-menu list-unstyled" }, [
    //     m("li", [
    //       m("a", { class: "", href: "#" }, "link")
    //     ]),
    //     m("li", [
    //       m("a", { class: "", href: "#" }, "link")
    //     ])
    //   ])
    // ])
  }
};

export default user;
