import Session from "../../models/session"
import User from "../../models/user";

const user = {
  oninit(vnode) {
    // this.currentUser = m.stream({ email: '' });
    //
    // this.getCurrentUser = _.once(() => {
    //   return User.getCurrent({
    //     background: true,
    //     initialValue: { data: { email: '' } }
    //   });
    // });

    this.logout = (event) => {
      event.preventDefault();
      Session.reset();
      m.route.set("/signin");
    };

    // this.getCurrentUser().then((response) => {
    //   this.currentUser(response.data);
    //   m.redraw();
    // });

  },
  view({state}) {
    return m(".dropdown", {
        class: "user-avatar clearfix",
        oncreate: (vnode) => {
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
          m("span", { class: "text-white" }, User.current().email),
          m("i", { class: "fa fa-caret-down text-white", "aria-hidden": true })
        ])
      ]),
      m("ul", { class: "dropdown-menu", "aria-labelledby": "dropdownMenu1" }, [
        m("li", [
          m("a", { class: "", href: "/userprofile", oncreate: m.route.link }, "Profile")
        ]),
        m("li", [
          m("a", { class: "", href: "#", onclick: this.logout }, "Logout")
        ])
      ])
    ])
  }
};

export default user;
