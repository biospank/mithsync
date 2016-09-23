import topBar from "./top_bar";
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
      return [
        m("#wrapper", {
          config: function() {
            $("#menu-toggle").click(function(e) {
                e.preventDefault();
                $("#wrapper").toggleClass("toggled");
            });
          }
        }, [
          m.component(topBar),
          m('aside', { class: 'sidebar', id: 'sidebar-wrapper' }, [
            m.component(user),
            m.component(mainNav)
          ]),
          m('main', { id: "page-content-wrapper" }, [
            content
          ])
        ])
      ]
    }
  };

  return function(ctrl) {
    return layouts[(layout || "standard")](content(ctrl));
  };
};

export default mixinLayout;
