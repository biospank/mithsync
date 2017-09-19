import mixinLayout from "../layout/mixin_layout";
import textField from "../widgets/text_field";
import feedbackButton from "../widgets/feedback_button";
import Password from "../../models/password";

var resetRequestPage = (() => {
  var content = ({state}) => {
    return m("div", [
      m("figure", { class: "center-block display-table mboth-60 intro-section__logo" }, [
        m("a", { href:"/", oncreate: m.route.link }, [
          m("img", { src: "/images/logo-zinkroo--white.png", width: "400", class:"img-responsive" }),
        ]),
        m("h4", { class: "text-right text-white weight-regular mb-0" }, "live media sync")
      ]),
      m("h2", { class: "mt-0 mb-60 text-center text-white" }, "Have you lost your password?"),
      m(".card-wrapper sign center-block p-all-side-75", [
        m("div", {
          class: "alert alert-warning " + (state.showMsg() ? "show" : "hidden"),
          role: "alert"
        }, "An email has just been sent to the address provided. Please follow the instructions to reset your password."),
        m("p", { class: "text-dark--grey mb-45" }, [
          m("a", { href: "/signin", oncreate: m.route.link, class: "btn-link" }, "Return to login"),
        ]),
        m("form", [
          m(textField, {
            type: 'email',
            //placeholder: 'Enter your Email',
            id: 'email',
            oninput: m.withAttr("value", Password.model.email),
            error: state.errors()['email'],
            dataLabel: 'Email',
            labelStyles: "text-dark--grey mb-15",
            inputSize: "input-lg reset-boxshadow reset-radius--2"
          }),
          m("div", { class: "mt-30" }, [
            m(feedbackButton, {
              action: state.passwordResetRequest,
              disabled: state.showMsg(),
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
    oninit(vnode) {
      this.errors = m.stream({});
      this.showMsg = m.stream(false);

      this.passwordResetRequest = function(args) {
        return Password.resetRequest(args).then(function(data) {
          this.showMsg(true)
        }, (e) => {
          vnode.state.errors(JSON.parse(e.message).errors);
        })
      };
    },
    view: mixinLayout(content, 'login')
  };
})();

export default resetRequestPage;
