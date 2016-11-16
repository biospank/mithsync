import mixinLayout from "../layout/mixin_layout";
import textField from "../widgets/text_field";
import feedbackButton from "../widgets/feedback_button";
import Activation from "../../models/activation";

var resendActivationPage = (function() {
  var content = function(ctrl) {
    return m(".col-xs-12 .col-sm-7 .center-block", [
      m("header", { class: "header-text space-bottom" }, [
        m("hgroup", { class: "text-center" }, [
          m("h1", { class: "header-text__title no-margin-top" }, "Didn't you get the activation code?"),
          m("h2", { class: "header-text__subtitle" }, "Insert your email below, you will receive an email with activation code."),
          m("hr", { class: "header-text__separator" })
        ])
      ]),
      m("div", { class: "" }, [
        m("form", { class: "light-form" }, [
          m.component(textField, {
            type: 'email',
            placeholder: 'Enter your Email',
            id: 'email',
            oninput: m.withAttr("value", Activation.model.email),
            error: ctrl.errors()['email'],
            dataLabel: 'Email'
          }),
          m("div", { class: "text-center mgv30" }, [
            m.component(feedbackButton, {
              action: ctrl.sendActivationCode,
              label: 'Send activation code',
              feedbackLabel: 'Sending...',
              style: 'btn btn-primary contour btn-lg'
            }),
            m("a", { href: "/signin", config: m.route, class: "btn-link btn-md" }, "Return to login")
          ])
        ])
      ])
    ])
  };

  return {
    controller: function(){
      var ctrl = this;
      ctrl.errors = m.prop({});

      ctrl.sendActivationCode = function() {
        return Activation.resend().then(function(data) {
          m.route('/activate')
        }, function(response) {
          ctrl.errors(response.errors);
        })
      };
    },
    view: mixinLayout(content, 'login')
  };
})();

export default resendActivationPage;
