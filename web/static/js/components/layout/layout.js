var topNav = function() {
  return {
    controller: function() {},
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
                m('span', { class: 'icon-bar' }),
                m('span', { class: 'icon-bar' }),
                m('span', { class: 'icon-bar' })
              ]),
            m('a', { class: 'navbar-brand', href: '#' }, [
              m('img', { src: '/assets/images/logo.png' })
            ])
          ])
          // m('.collapse navbar-collapse navbar-right',
          //   m.component(avatar)
          // )
        ])
      ]);
    }
  }
};

var sidebarNav = function() {
  return [];
};

var breadcrumbBar = function() {
  return [];
};

// var layout = function(topNav, sidebarNav, breadcrumbBar, content) {
//   return [
//     m.component(topNav),
//     m('main', { class: 'main-container top'}, [
//       m('.container', content)
//     ])
//   ]
// };

var layout = function(content) {
  return [
    m('main', { class: 'main-container top'}, [
      m('.container', content)
    ])
  ]
};

var layout2 = function(topNav, sidebarNav, breadcrumbBar, content) {
  return [
    m.component(topNav),
    m('aside', { class: 'sidebar', id: 'sidebarNav' }, [
      m('nav', sidebarNav)
    ]),
    m('main', { class: 'main-container centered'}, [
      m("section", { class: "breadcrumb-bar" }, [
        m(".container-fluid", breadcrumbBar)
      ]),
      m("section", [
        m('.container', content)
      ])
    ])
  ]
};

// var mixinLayout = function(layout, topNav, sidebarNav, breadcrumbBar, content) {
//   return function(ctrl) {
//     return layout(topNav(), sidebarNav(), breadcrumbBar(), content(ctrl));
//   };
// };

var mixinLayout = function(layout, content) {
  return function(ctrl) {
    return layout(content(ctrl));
  };
};

export default mixinLayout;
export default layout;
