import searchForm from "./search_form";
import breadcrumb from "./breadcrumb";

var topBar = {
  view: function(ctrl) {
    return m('section', { class: 'top-bar navbar navbar-default navbar-fixed-top' }, [
      m('.container-fluid', [
        m('.navbar-header', [
          m('a', {
            href: '#menu-toggle',
            class: 'navbar-toggle',
            id: "menu-toggle"
          },
          [
            m('span', { class: 'sr-only' }, 'Toggle navigation'),
            m('span', { class: 'fa fa-list' })
          ]),
          m(breadcrumb)
        ]),
        m('.collapse navbar-collapse navbar-right',
          m("a", { href: "/video/new", config: m.route, class: "btn btn-primary effect btn-md text-uppercase icon-left" }, [
            m("i", { class: 'fa fa-plus' }),
            m("span", {}, "Create new")
          ])
        )
      ])
    ])
  }
}

export default topBar;
