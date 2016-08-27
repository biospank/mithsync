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
    return m(".user", [
      m("figure", { class: "user__avatar" }, [
        m("img", { src: "/images/avatar.png", alt: "Avatar" })
      ]),
      m(".user__info", [
        m("span", "iladiro")
      ])
    ]);
  }
};

export default user;
