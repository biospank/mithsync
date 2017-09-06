import user from "./user";

var topBar = {
  showMenuButton() {
    if(/videos\/\d+\/edit/i.exec(m.route.get())) {
      return m("a", {
        href: "#",
        class: "navbar-button",
        id: "menu-toggle",
        oncreate: ({dom}) => {
          $(dom).click((e) => {
              e.preventDefault();
              $("#wrapper").toggleClass("toggled");
          });
        }
      }, [
        m("i", { class: "fa fa-bars", "aria-hidden": true })
      ])
    } else {
      return "";
    }
  },
  showMenuTop() {
    if(/videos\/\d+\/edit/i.exec(m.route.get()) == null) {
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
    } else {
      return "";
    }
  },
  oninit(vnode) {
    this.additionalClass = vnode.attrs.additionalClass;
  },
  view({state}) {
    return m("nav", { class: "topbar " + (state.additionalClass ? state.additionalClass : "") }, [
      m(".clearfix", {}, [
        m(".pull-left", [
          m("a", {
            href: "/dashboard",
            oncreate: m.route.link,
            class: "navbar-brand pull-left"
          }, [
            m("img", { src: "images/logo-zinkroo--white.png", class: "img-responsive" })
          ]),
          // this.showMenuButton()
        ]),
        // m(".pull-left", [
        //   this.showMenuTop()
        // ]),
        m(".pull-right", [
          m(user)
        ])
      ])
    ])
  }
}

export default topBar;
