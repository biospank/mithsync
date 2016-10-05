import user from "./user";

var topBar = {
  view: function(ctrl) {
    return m("nav", { class: "topbar navbar-fixed-top" }, [
      m(".container", [
        m(".clearfix", {}, [
          m(".pull-left", [
            m("a", { href: "#", class: "navbar-brand" }, [
              m("img", { src: "/images/logo.jpg", alt: "Zinkroo" })
            ]),
            m("button", { class: "navbar-button" }, [
              m("i", { class: "fa fa-bars", "aria-hidden": true })
            ])
          ]),
          m(".pull-right", [
            m.component(user)
          ])
        ])
      ])
    ])
  }
}

export default topBar;
