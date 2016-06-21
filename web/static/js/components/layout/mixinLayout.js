import topNav from "./topNav";

var mixinLayout = function(content, layout) {

  var layouts = {
    login: function(content) {
      return [
        m.component(topNav),
        m('main', { class: 'main-container top'}, [
          m('.container', content)
        ])
      ]
    },
    standard: function(content) {
      return [
        m.component(topNav),
        m('aside', { class: 'sidebar', id: 'sidebarNav' }, [
          m('nav', sidebarNav())
        ]),
        m('main', { class: 'main-container centered'}, [
          m("section", { class: "breadcrumb-bar" }, [
            m(".container-fluid", breadcrumbBar())
          ]),
          m("section", [
            m('.container', content)
          ])
        ])
      ]
    }
  }

  var sidebarNav = function() {
    return [];
  };

  var breadcrumbBar = function() {
    return [];
  }

  return function(ctrl) {
    return layouts[(layout || "standard")](content(ctrl));
  };
};

export default mixinLayout;
