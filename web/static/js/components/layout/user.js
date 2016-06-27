var user = function() {
  return [
    m(".user", [
      m("figure", { class: "user__avatar" }, [
        m("img", { src: "/images/avatar.png", alt: "Avatar" })
      ]),
      m(".user__info", [
        m("a", { href: "#collapseExample", class: "collapsed user__name", "aria-expanded": false, "data-toggle": "collapse" }, [
          m("span", "Ilaria Di Rosa"),
          m("i", { class: "caret" })
        ]),
        m("nav", { class: "collapse user__nav", id: "collapseExample", "aria-expanded": false }, [
          m("ul", { class: "nav" }, [
            m("li", [
              m("a", { href: "#" }, "My profile")
            ]),
            m("li", [
              m("a", { href: "/userprofile", config: m.route }, "Edit profile")
            ]),
            m("li", [
              m("a", { href: "#" }, "Setting")
            ]),
            m("li", [
              m("a", { href: "/logout" }, "Logout")
            ])
          ])
        ])
      ])
    ])
  ];
};

export default user;
