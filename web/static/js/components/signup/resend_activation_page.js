import mixinLayout from "../layout/mixin_layout";
import textField from "../widgets/text_field";
import feedbackButton from "../widgets/feedback_button";
import Activation from "../../models/activation";

var resendActivationPage = (function() {
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
          m("h1", { class: "mt-0 mb-15 text-center text-white" }, m.trust("Didn't you get the activation code?")),
          m("h2", { class: "text-white weight-light" }, "Insert your email below, you will receive an email with activation code.")
        ])
      ]),
      m(".card-wrapper sign center-block p-all-side-75", [
        m("form", [
          m(textField, {
            type: 'email',
            placeholder: 'Enter your Email',
            id: 'email',
            oninput: m.withAttr("value", Activation.model.email),
            error: state.errors()['email'],
            dataLabel: 'Email',
            labelStyles: "text-dark--grey mb-15",
            inputSize: "input-lg reset-boxshadow reset-radius--2"
          }),
          m("div", { class: "text-center mboth-50" }, [
            m(feedbackButton, {
              action: state.sendActivationCode,
              label: 'Send activation code',
              feedbackLabel: 'Sending...',
              style: 'btn btn-primary btn-lg btn-block mt-60 contour'
            })
          ]),
          m("p", { class: "text-center text-dark--grey mb-0" }, [
            m("a", { href: "/signin", oncreate: m.route.link, class: "btn-link" }, "Return to login")
          ])
        ])
      ])
    ])
  };

  return {
    oninit(vnode){
      this.errors = m.stream({});

      this.sendActivationCode = () => {
        return Activation.resend().then((data) => {
          m.route.set('/activate')
        }, (e) => {
          this.errors(JSON.parse(e.message).errors);
        })
      };
    },
    view: mixinLayout(content, 'login')
  };
})();

export default resendActivationPage;
