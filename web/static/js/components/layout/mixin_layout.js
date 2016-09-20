import topNav from "./top_nav";
import mainNav from "./main_nav";
import user from "./user";

var mixinLayout = function(content, layout) {

  var layouts = {
    login: function(content) {
      return [
        //m.component(topNav),
        m('main', { class: 'main-container'}, [
          m('.container', content)
        ])
      ]
    },
    standard: function(content) {
      return m("#wrapper", {
        config: function() {
          $("#menu-toggle").click(function(e) {
              e.preventDefault();
              $("#wrapper").toggleClass("toggled");
          });
        }
      }, [
        m.component(topNav),
        m('aside', { class: 'sidebar', id: 'sidebar-wrapper' }, [
          m.component(user),
          m.component(mainNav)
        ]),
        m('main', { id: "page-content-wrapper" }, [
          // m("section", { class: "breadcrumb-bar" }, [
          //   m(".container-fluid", breadcrumbBar())
          // ]),
          // m("section", [
          //   m("div", content)
          // ])
          content
        ])
      ])
    }
  };

  return function(ctrl) {
    return layouts[(layout || "standard")](content(ctrl));
  };
};

export default mixinLayout;
