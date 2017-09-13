import Session from "../../models/session"
import User from "../../models/user";
import Video from "../../models/video";

const user = {
  oninit(vnode) {
    this.onunload = (e, requestedUrl, logout=false) => {
      e.preventDefault();

      if (Video.unsaved()) {
        swal({
          type: 'warning',
          title: 'Unsaved changes',
          text: "Some changes has not been saved.\nDo you want to leave this page anyway?",
          confirmButtonText: "Yes, leave this page!", // "Don't save!"
          showCancelButton: true,
          focusCancel: true
        }).then(() => {
          Video.unsaved(false);

          if(logout)
            Session.reset();

          m.route.set(requestedUrl);
        }).catch(swal.noop)
      } else {
        if(logout)
          Session.reset();

        m.route.set(requestedUrl);
      }
    }

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
          m("a", {
            class: "",
            href: "/userprofile",
            onclick: (e) => {
              this.onunload(e, "/userprofile")
            }
          }, "Profile")
        ]),
        m("li", [
          m("a", {
            class: "",
            href: "#",
            onclick: (e) => {
              this.onunload(e, "/signin", true)
            }
          }, "Logout")
        ])
      ])
    ])
  }
};

export default user;
