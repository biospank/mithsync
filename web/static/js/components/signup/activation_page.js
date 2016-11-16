import mixinLayout from "../layout/mixin_layout";
import textField from "../widgets/text_field";
import feedbackButton from "../widgets/feedback_button";
import Activation from "../../models/activation";

var activationPage = (function() {
  var content = function(ctrl) {
    return m(".col-xs-12 .col-sm-7 .center-block", [
      // m("figure", { class: "text-center", id: "logo" }, [
      //   m("img", { src: "/images/logo.png", alt: "Zinkroo" })
      // ]),
      m("header", { class: "header-text space-bottom" }, [
        m("hgroup", { class: "text-center" }, [
          m("h1", { class: "header-text__title" }, m.trust("We've sent you an email <br> with your activation code")),
          m("h2", { class: "header-text__subtitle" }, "You need to insert it below to active the account"),
          m("hr", { class: "header-text__separator" })
        ])
      ]),
      m("div", { class: "" }, [
        m("div", {
          class: "alert alert-warning",
          role: "alert"
        }, "An email has just been sent with the instructions to follow. Please insert the code below to activate your account"),
        m("form", { class: "light-form" }, [
          m.component(textField, {
            type: 'text',
            placeholder: 'Enter your code',
            id: 'activation_code',
            oninput: m.withAttr("value", Activation.model.activation_code),
            error: ctrl.errors()['activation_code']
          }),
          m("div", { class: "text-center mgv30" }, [
            m.component(feedbackButton, {
              action: ctrl.activateUser,
              label: 'Activate',
              feedbackLabel: 'Activating...',
              style: 'btn btn-primary contour btn-lg'
            })
          ]),
          m("p", { class: "text-center" }, [
            m("span", "I didn't get the activation code, "),
            m("a", { href: "/activate/resend", config: m.route }, "resend activation email")
          ])
        ])
      ])
    ])
  };

  return {
    controller: function(){
      var ctrl = this;
      ctrl.errors = m.prop({});

      ctrl.activateUser = function(args) {
        return Activation.confirm(args).then(function() {
          m.route("/dashboard");
        }, function(response) {
          ctrl.errors(response.errors);
        })
      };
    },
    view: mixinLayout(content, 'login')
  };
})();

export default activationPage;
