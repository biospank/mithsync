// import { mixinLayout, layout, topNav, sidebarNav, breadcrumbBar } from "../layout/layout";
import mixinLayout from "../layout/layout";
import layout from "../layout/layout";
import textField from "../widgets/textField";

var loginForm = (function() {
  var content = function() {
    return [
      m('.col-xs-12 .col-sm-7 .col-md-4 .center-block', [
        m('.wrapper', [
          m("h2", { class: "header text-center" }, "Login"),
          m(".content", [
            m("form", { class: 'text-center' }, [
              m.component(textField, { type: 'email', placeholder: 'Username', id: 'email' }),
              m.component(textField, { type: 'password', placeholder: 'Password', id: 'password' }),
              m("button[type=submit]", {
                class: 'btn btn-success btn-lg'
              }, "Login" )
            ])
          ])
        ])
      ])
		];
  };

  return {
    controller: function(){
      var ctrl = this;
    },
    // view: function() {
    //   return m("div", {}, "pippo")
    // }
    view: mixinLayout(layout, content)
    // view: mixinLayout()
  };
})();

export default loginForm;
