import mixinLayout from "../layout/mixin_layout";
import textField from "../widgets/text_field";
import feedbackButton from "../widgets/feedback_button";
import Password from "../../models/password";

var resetPage = (function() {
  var content = function(ctrl) {
    return m('div', [
      m("figure", { class: "center-block display-table mboth-60 intro-section__logo" }, [
        m("a", { href:"/", oncreate: m.route.link }, [
          m("img", { src: "/images/logo-zinkroo--white.png", width: "400", class:"img-responsive" }),
        ]),
        m("h4", { class: "text-right text-white weight-regular mb-0" }, "live media sync")
      ]),
      m("h2", { class: "mt-0 mb-60 text-center text-white" }, "Reset Password"),
      m('.card-wrapper sign center-block p-all-side-75', [
        m("form", [
          m(textField, {
            type: 'password',
            placeholder: 'Enter Password',
            id: 'password',
            dataLabel: 'Password',
            oninput: m.withAttr("value", Password.model.password),
            error: ctrl.errors()['password'],
            labelStyles: "text-dark--grey mb-15",
            inputSize: "input-lg reset-boxshadow reset-radius--2"
          }),
          m(textField, {
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
            m(feedbackButton, {
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
    oninit(vnode) {
      this.errors = m.stream({});
      this.resetCode = m.stream(m.route.param("code"));

      this.resetPassword = (args) => {
        return Password.reset(
          _.assign(
            args,
            {resetCode: this.resetCode()}
          )
        ).then((data) => {
          m.route.set("/signin");
        }, (e) => {
          vnode.state.errors(JSON.parse(e.message).errors);
        })
      };
    },
    view: mixinLayout(content, 'login')
  };
})();

export default resetPage;
