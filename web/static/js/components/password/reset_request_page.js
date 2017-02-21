import mixinLayout from "../layout/mixin_layout";
import textField from "../widgets/text_field";
import feedbackButton from "../widgets/feedback_button";
import Password from "../../models/password";

var resetRequestPage = (function() {
  var content = function(ctrl) {
    return m("div", [
      m("figure", { class: "center-block display-table mboth-60 intro-section__logo" }, [
        m("a", { href:"/", config: m.route }, [
          m("img", { src: "/images/logo-zinkroo--white.png", width: "400", class:"img-responsive" }),
        ]),
        m("h4", { class: "text-right text-white weight-regular mb-0" }, "live media sync")
      ]),
      m("h2", { class: "mt-0 mb-60 text-center text-white" }, "Have you lost your password?"),
      m(".card-wrapper sign center-block p-all-side-75", [
        m("div", {
          class: "alert alert-warning " + (ctrl.showMsg() ? "show" : "hidden"),
          role: "alert"
        }, "An email has just been sent to the address provided. Please follow the instructions to reset your password."),
        m("p", { class: "text-dark--grey mb-45" }, [
          m("a", { href: "/signin", config: m.route, class: "btn-link" }, "Return to login"),
        ]),
        m("form", [
          m.component(textField, {
            type: 'email',
            //placeholder: 'Enter your Email',
            id: 'email',
            oninput: m.withAttr("value", Password.model.email),
            error: ctrl.errors()['email'],
            dataLabel: 'Email',
            labelStyles: "text-dark--grey mb-15",
            inputSize: "input-lg reset-boxshadow reset-radius--2"
          }),
          m("div", { class: "mt-30" }, [
            m.component(feedbackButton, {
              action: ctrl.passwordResetRequest,
              disabled: ctrl.showMsg(),
              label: 'Send instructions',
              feedbackLabel: 'Sending...',
              style: 'btn btn-primary btn-lg btn-block mt-60 contour'
            })
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
