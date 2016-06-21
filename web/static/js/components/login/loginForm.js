import mixinLayout from "../layout/mixinLayout";
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
    view: mixinLayout(content, 'standard')
  };
})();

export default loginForm;
