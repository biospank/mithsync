var sidebarNav = function() {
  return [
    m("nav", { class: "main-nav" }, [
      m("ul", { class: "nav nav-pills nav-stacked" }, [
        m("li", { class: "active" }, [
          m("a", { href: "/dashboard", config: m.route() }, "Dashboard")
        ]),
        m("li", [
          m("a", { href: "/library", config: m.route() }, "Library")
        ]),
        m("li", [
          m("a", { href: "" }, "Test")
        ]),
        m("li", [
          m("a", { href: "" }, "Test")
        ]),
        m("li", [
          m("a", { href: "" }, "Test")
        ])
      ])
    ])
  ];
};

export default sidebarNav;
