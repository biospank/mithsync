import mixinLayout from "../layout/mixin_layout";
import textField from "../widgets/text_field";
import feedbackButton from "../widgets/feedback_button";
import Activation from "../../models/activation";

var activationPage = (function() {
  var content = ({state}) => {
    return m("div", [
      m("figure", { class: "center-block display-table mboth-60 intro-section__logo" }, [
        m("a", { href:"/", oncreate: m.route.link }, [
          m("img", { src: "/images/logo-zinkroo--white.png", width: "400", class:"img-responsive" }),
        ]),
        m("h4", { class: "text-right text-white weight-regular mb-0" }, "live media sync")
      ]),
      m("header", { class: "mb-60" }, [
        m("hgroup", { class: "text-center" }, [
          m("h1", { class: "mt-0 mb-15 text-center text-white" }, m.trust("We've sent you an email with your activation code")),
          m("h2", { class: "text-white weight-light" }, "You need to insert it below to active the account"),
        ])
      ]),
      m(".card-wrapper sign center-block p-all-side-75", [
        m("div", {
          class: "alert alert-warning",
          role: "alert"
        }, "An email has just been sent with the instructions to follow. Please insert the code below to activate your account"),
        m("form", [
          m(textField, {
            type: 'text',
            placeholder: 'Enter your code',
            id: 'activation_code',
            oninput: m.withAttr("value", Activation.model.activation_code),
            error: state.errors()['activation_code'],
            labelStyles: "text-dark--grey mb-15",
            inputSize: "input-lg reset-boxshadow reset-radius--2"
          }),
          m("div", { class: "text-center mboth-30" }, [
            m(feedbackButton, {
              action: state.activateUser,
              label: 'Activate',
              feedbackLabel: 'Activating...',
              style: 'btn btn-primary btn-lg btn-block mt-60 contour'
            })
          ]),
          m("p", { class: "text-center text-dark--grey mb-0" }, [
            m("span", "I didn't get the activation code, "),
            m("a", { href: "/activate/resend", oncreate: m.route.link, class: "btn-link" }, "resend activation email")
          ])
        ])
      ])
    ])
  };

  return {
    oninit(vnode){
      this.errors = m.stream({});

      this.activateUser = (args) => {
        return Activation.confirm(args).then(() => {
          m.route.set("/dashboard");
        }, (e) => {
          this.errors(JSON.parse(e.message).errors);
        })
      };
    },
    view: mixinLayout(content, 'login')
  };
})();

export default activationPage;
