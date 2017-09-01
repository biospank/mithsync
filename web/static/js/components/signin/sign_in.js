import mixinLayout from "../layout/mixin_layout";
import textField from "../widgets/text_field";
import feedbackButton from "../widgets/feedback_button";
import Session from "../../models/session";

var signIn = (function() {
  var content = function({state}) {
    return [
      m("div", [
        m("figure", { class: "center-block display-table mboth-60 intro-section__logo" }, [
          m("a", { href:"/", oncreate: m.route.link }, [
            m("img", { src: "/images/logo-zinkroo--white.png", width: "400", class:"img-responsive" }),
          ]),
          m("h4", { class: "text-right text-white weight-regular" }, "live media sync")
        ]),
        m('.card-wrapper sign center-block p-all-side-75', [
          m("p", { class: "mb-40 text-dark--grey" }, [
            "Need a Zinkroo account? ",
            m("a", { href: "/signup", oncreate: m.route.link, class: "btn-link" }, "Create your account")
          ]),
          m("form", { class: "" }, [
            m(".mb-25", [
              m(textField, {
                type: 'email',
                //placeholder: 'Enter your Email',
                id: 'email',
                dataLabel: 'Email',
                oninput: m.withAttr("value", Session.model.email),
                error: state.errors()['email'],
                fieldType: "",
                icon: "fa fa-user",
                labelStyles: "text-dark--grey mb-15",
                inputSize: "input-lg reset-boxshadow reset-radius--2"
              })
            ]),
            m(textField, {
              type: 'password',
              //placeholder: 'Enter Password',
              id: 'password',
              dataLabel: 'Password',
              oninput: m.withAttr("value", Session.model.password),
              error: state.errors()['password'],
              fieldType: "",
              icon: "fa fa-unlock-alt",
              labelStyles: "text-dark--grey mb-15",
              inputSize: "input-lg reset-boxshadow reset-radius--2"
            }),
            m("div", { class: "text-center mboth-30" }, [
              m(feedbackButton, {
                action: state.createSession,
                label: 'Login',
                feedbackLabel: 'Authenticating...',
                style: 'btn btn-primary btn-lg btn-block mb-75 mt-60'
              })
            ]),
            m(".row", [
              m(".col-sm-6", [
                m(".magic-checkbox--big", [
                  m("input", {
                    class: "magic-checkbox",
                    type: "checkbox",
                    name: "layout",
                    onclick: m.withAttr("checked", Session.model.remember_me),
                    checked: Session.model.remember_me(),
                    id: "keep-signed"
                  }),
                  m("label", { for: "keep-signed", class: "weight-light" }, "Keep me signed in for 1 week")
                ])
              ]),
              m(".col-sm-6", [
                m("p", { class: "text-right mt-5" }, [
                  m("a", { href: "/password/request", oncreate: m.route.link, class: "btn-link" }, "Forgot your password?")
                ])
              ])
            ])
          ])
        ])
      ])
    ]
  };

  return {
    oninit(vnode){
      this.errors = m.stream({});

      this.createSession = (args) => {
        return Session.create(args).then((userData) => {
          let user = JSON.parse(userData);

          if(user.data.active)
            m.route.set("/dashboard");
          else
            m.route.set("/activate");
        }, (e) => {
          this.errors(JSON.parse(e.message).errors);
        })
        // User.create().then(function() {
        //   update();
        // }.bind(this));
      };
    },
    view: mixinLayout(content, 'login')
  };
})();

export default signIn;
