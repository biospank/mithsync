import mixinLayout from "../layout/mixin_layout";
import textField from "../widgets/text_field";
import feedbackButton from "../widgets/feedback_button";
import Activation from "../../models/activation";

var resendActivationPage = (function() {
  var content = function(ctrl) {
    return m("div", [
      m("figure", { class: "center-block display-table mboth-60" }, [
        m("a", { href:"/", config: m.route }, [
          m("img", { src: "/images/logo-zinkroo--white.png", width: "400", class:"img-responsive" }),
        ]),
        m("h4", { class: "text-right text-white weight-regular mb-0" }, "live media sync")
      ]),
      m("header", { class: "mb-60" }, [
        m("hgroup", { class: "text-center" }, [
          m("h1", { class: "mt-0 mb-15 text-center text-white" }, m.trust("Didn't you get the activation code?")),
          m("h2", { class: "text-white weight-light" }, "Insert your email below, you will receive an email with activation code.")
        ])
      ]),
      m(".card-wrapper sign center-block p-all-side-75", [
        m("form", [
          m.component(textField, {
            type: 'email',
            placeholder: 'Enter your Email',
            id: 'email',
            oninput: m.withAttr("value", Activation.model.email),
            error: ctrl.errors()['email'],
            dataLabel: 'Email',
            labelStyles: "text-dark--grey mb-15",
            inputSize: "input-lg reset-boxshadow reset-radius--2"
          }),
          m("div", { class: "text-center mboth-50" }, [
            m.component(feedbackButton, {
              action: ctrl.sendActivationCode,
              label: 'Send activation code',
              feedbackLabel: 'Sending...',
              style: 'btn btn-primary btn-lg btn-block mt-60 contour'
            })
          ]),
          m("p", { class: "text-center text-dark--grey mb-0" }, [
            m("a", { href: "/signin", config: m.route, class: "btn-link" }, "Return to login")
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
