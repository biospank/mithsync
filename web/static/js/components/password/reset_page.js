import mixinLayout from "../layout/mixin_layout";
import textField from "../widgets/text_field";
import feedbackButton from "../widgets/feedback_button";
import Password from "../../models/password";

var resetPage = (function() {
  var content = function(ctrl) {
    return m('.col-xs-12 .col-sm-7 .col-md-4 .center-block', [
      m("figure", { class: "text-center", id: "logo" }, [
        m("img", { src: "/images/logo.png", alt: "Zinkroo" })
      ]),
      m('.wrapper', [
        m("h2", { class: "header text-center mgv20" }, "Reset Password"),
        m(".content", [
          m("form", { class: "light-form" }, [
            m.component(textField, {
              type: 'password',
              placeholder: 'Enter Password',
              id: 'password',
              dataLabel: 'Password',
              oninput: m.withAttr("value", Password.model.password),
              error: ctrl.errors()['password']
            }),
            m.component(textField, {
              type: 'password',
              placeholder: 'Enter Password',
              id: 'password_confirmation',
              dataLabel: 'Confirm Password',
              oninput: m.withAttr("value", Password.model.password_confirmation),
              error: ctrl.errors()['password_confirmation']
            }),
            m("div", { class: "text-center mgv30" }, [
              m.component(feedbackButton, {
                action: ctrl.resetPassword,
                label: 'Reset',
                feedbackLabel: 'Executing...',
                style: 'btn btn-primary btn-lg'
              })
            ])
          ])
        ])
      ])
    ])
  };

  return {
    controller: function(){
      var ctrl = this;
      ctrl.errors = m.prop({});
      ctrl.resetCode = m.prop(m.route.param("code"));

      ctrl.resetPassword = function(args) {
        return Password.reset(
          _.assign(
            args,
            {resetCode: ctrl.resetCode()}
          )
        ).then(function(data) {
          m.route("/signin");
        }, function(response) {
          ctrl.errors(response.errors);
        })
      };
    },
    view: mixinLayout(content, 'login')
  };
})();

export default resetPage;
