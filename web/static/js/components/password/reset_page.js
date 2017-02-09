import mixinLayout from "../layout/mixin_layout";
import textField from "../widgets/text_field";
import feedbackButton from "../widgets/feedback_button";
import Password from "../../models/password";

var resetPage = (function() {
  var content = function(ctrl) {
    return m('.col-xs-7 .col-sm-7 .col-md-4 .col-lg-3 .center-block ', [
      m("figure", { class: "center-block display-table mboth-60" }, [
        m("a", { href:"/", config: m.route }, [
          m("img", { src: "/images/logo-zinkroo--white.png", width: "400", class:"img-responsive" }),
        ]),
        m("h4", { class: "text-right text-white weight-regular mb-0" }, "live media sync")
      ]),
      m("h2", { class: "mt-0 mb-60 text-center text-white" }, "Reset Password"),
      m('.card-wrapper sign center-block p-all-side-75', [
        m("form", [
          m.component(textField, {
            type: 'password',
            placeholder: 'Enter Password',
            id: 'password',
            dataLabel: 'Password',
            oninput: m.withAttr("value", Password.model.password),
            error: ctrl.errors()['password'],
            labelStyles: "text-dark--grey mb-15",
            inputSize: "input-lg reset-boxshadow reset-radius--2"
          }),
          m.component(textField, {
            type: 'password',
            placeholder: 'Enter Password',
            id: 'password_confirmation',
            dataLabel: 'Confirm Password',
            oninput: m.withAttr("value", Password.model.password_confirmation),
            error: ctrl.errors()['password_confirmation'],
            labelStyles: "text-dark--grey mb-15",
            inputSize: "input-lg reset-boxshadow reset-radius--2"
          }),
          m("div", { class: "text-center mboth-30" }, [
            m.component(feedbackButton, {
              action: ctrl.resetPassword,
              label: 'Reset',
              feedbackLabel: 'Executing...',
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
