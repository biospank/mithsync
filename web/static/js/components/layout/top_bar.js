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
  showMenuTop: function() {
    if(/videos\/\d+\/edit/i.exec(m.route()) == null) {
      return m("nav", { class: "top-nav", id: "" }, [
        m("ul", { class: "nav nav-pills" }, [
          m("li", { role: "presentation", class: "active" }, [
            m("a", { href: "#", class: "text-uppercase" }, "Create new project")
          ]),
          m("li", { role: "presentation" }, [
            m("a", { href: "#", class: "text-uppercase" }, "My project")
          ])
        ])
      ])
    }
  },
  view: function(ctrl, args) {
    return m("nav", { class: "topbar " + (args.additionalClass ? args.additionalClass : "") }, [
      m(".clearfix", {}, [
        m(".pull-left", [
          m("a", {
            href: "/dashboard",
            config: m.route,
            class: "navbar-brand pull-left"
          }, [
            m("img", { src: "images/logo-zinkroo-azzurro.png", class: "img-responsive" })
          ]),
          this.showMenuButton()
        ]),
        m(".pull-left", [
          this.showMenuTop()
        ]),
        m(".pull-right", [
          m.component(user)
        ])
      ])
    ])
  }
}

export default topBar;
