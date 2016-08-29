import searchForm from "./search_form";

var topNav = {
  view: function(ctrl) {
    return m('nav', { class: 'top-navbar navbar navbar-default navbar-fixed-top' }, [
      m('.container-fluid', [
        m('.navbar-header', [
          m('button', {
            type: 'button',
            class: 'navbar-toggle collapsed',
            id: 'btn-mobile',
            'data-toggle': 'collapse',
            'data-target': '#sidebarNav', 'aria-expanded': 'false'},
            [
              m('span', { class: 'sr-only' }, 'Toggle navigation'),
              m('span', { class: 'fa fa-list' })
              // m('span', { class: 'icon-bar' }),
              // m('span', { class: 'icon-bar' })
            ]),
          m('a', { class: 'navbar-brand' }, "Sinkroo")
        ]),
        m('.collapse navbar-collapse navbar-right',
          m("a", { href: "/video/new", config: m.route, class: "btn btn-primary btn-md text-uppercase" }, "Create new")
        )
      ])
    ]);
  }
}

export default topNav;
