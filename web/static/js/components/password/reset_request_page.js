import mixinLayout from "../layout/mixin_layout";
import textField from "../widgets/text_field";
import feedbackButton from "../widgets/feedback_button";
import Password from "../../models/password";

var resetRequestPage = (function() {
  var content = function(ctrl) {
    return m(".col-xs-12 .col-sm-7 .center-block", [
      m("figure", { class: "text-center", id: "logo" }, [
        m("img", { src: "/images/logo.png", alt: "Zinkroo" })
      ]),
      m("header", { class: "header-text space-bottom" }, [
        m("hgroup", { class: "text-center" }, [
          m("h1", { class: "header-text__title no-margin-top" }, "Have you lost your password?"),
          m("h2", { class: "header-text__subtitle" }, "Insert your email below, you will receive an email by us to reset it."),
          m("hr", { class: "header-text__separator" })
        ])
      ]),
      m("div", { class: "" }, [
        m("div", {
          class: "alert alert-warning " + (ctrl.showMsg() ? "show" : "hidden"),
          role: "alert"
        }, "An email has just been sent to the address provided. Please follow the instructions to reset your password."),
        m("form", { class: "light-form" }, [
          m.component(textField, {
            type: 'email',
            placeholder: 'Enter your Email',
            id: 'email',
            oninput: m.withAttr("value", Password.model.email),
            error: ctrl.errors()['email'],
            dataLabel: 'Email'
          }),
          m("div", { class: "mgt30" }, [
            m.component(feedbackButton, {
              action: ctrl.passwordResetRequest,
              label: 'Send instructions',
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
      ctrl.showMsg = m.prop(false);

      ctrl.passwordResetRequest = function(args) {
        return Password.resetRequest(args).then(function(data) {
          ctrl.showMsg(true)
        }, function(response) {
          ctrl.errors(response.errors);
        })
      };
    },
    view: mixinLayout(content, 'login')
  };
})();

export default resetRequestPage;
