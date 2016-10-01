import searchForm from "./search_form";

var topBar = {
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
    };
  },
  view: function(ctrl) {
    // return m('section', { class: 'top-bar' }, [
    return m('header', { class: "", style: "background-color: brown" }, [
      m('.container clearfix', [
        m('div', { class: "pull-left" }, [
          m("ol", { class: "breadcrumb" }, [
            m("li", [
              m("a", { href: "#" }, "Link")
            ]),
            m("li", [
              m("a", { href: "#" }, "Link")
            ]),
            m("li", { class: "active" }, [
              m("a", "Link")
            ])
          ])
        ]),
        m("div", { class: "pull-right" }, [
          // m("a", { href: "/video/new", config: m.route, class: "btn btn-primary effect btn-md text-uppercase icon-left" }, [
          m("a", { href: "/video/new", config: m.route, class: "btn btn-primary" }, [
            // m("i", { class: 'fa fa-plus' }),
            m("span", {}, "Create new")
          ])
        ])
      ])
    ])
  }
}

export default topBar;
