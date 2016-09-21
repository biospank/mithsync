import searchForm from "./search_form";

var topNav = {
  controller: function(){
    var ctrl = this;
    var humanMap = {
      "/": "Dashboard",
      "/signup": "Sign Up",

      //"/activate": activationPage,

      //"/password/request": resetRequestPage,

      //"/password/reset/:code": resetPage,

      "/userprofile": "Account Settings",

      "/video": "Video",

      "/video/new": "Video",

      "/video/:videoId/edit": "Video",

      "/video/:videoId/info": "Information",

      "/video/view": "Video",

      "/library": "Library",

      "/faq": "Questions"
    };

    ctrl.humanPath = function() {
      return humanMap[m.route()] || "";
    }
  },
  view: function(ctrl) {
    return m('nav', { class: 'top-navbar navbar navbar-default navbar-fixed-top' }, [
      m('.container-fluid', [
        m('.navbar-header', [
          m('a', {
            href: '#menu-toggle',
            class: 'navbar-toggle',
            id: "menu-toggle",
            //class: "btn btn-default"
            //'data-toggle': 'collapse'
            // 'data-target': '#mainNav'
          },
          [
            m('span', { class: 'sr-only' }, 'Toggle navigation'),
            m('span', { class: 'fa fa-list' }),
            // m('span', { class: 'icon-bar' }),
            // m('span', { class: 'icon-bar' }),
            // m('span', { class: 'icon-bar' })
          ]),
          m('h2', { class: 'navbar-brand' }, ctrl.humanPath())
        ]),
        m('.collapse navbar-collapse navbar-right',
          m("a", { href: "/video/new", config: m.route, class: "btn btn-primary effect btn-md text-uppercase icon-left" }, [
            m("i", { class: 'fa fa-plus' }),
            m("span", {}, "Create new")
          ])
        )
      ])
    ]);
  }
}

export default topNav;
