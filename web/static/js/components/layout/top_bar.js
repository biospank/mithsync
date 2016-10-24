import user from "./user";

var topBar = {
  showMenuButton: function() {
    if(/videos\/\d+\/edit/i.exec(m.route())) {
      return m("a", {
        href: "#",
        class: "navbar-button",
        id: "menu-toggle",
        config: function(element, isInit, context) {
          if(!isInit) {
            $(element).click(function(e) {
                e.preventDefault();
                $("#wrapper").toggleClass("toggled");
            });
          }
        }
      }, [
        m("i", { class: "fa fa-bars", "aria-hidden": true })
      ])
    } else {
      return "";
    }
  },
  view: function(ctrl) {
    return m("nav", { class: "topbar navbar-fixed-top" }, [
      m(".clearfix", {}, [
        m(".pull-left", [
          // m("a", { href: "#", class: "navbar-brand" }, [
          //   m("img", { src: "/images/logo.jpg", alt: "Zinkroo" })
          // ]),
          m("a", { href: "#", class: "navbar-brand" }, "Zinkroo"),
          this.showMenuButton()
        ]),
        m(".pull-right", [
          m.component(user)
        ])
      ])
    ])
  }
}

export default topBar;
