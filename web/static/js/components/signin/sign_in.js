import mixinLayout from "../layout/mixin_layout";
import textField from "../widgets/text_field";
import feedbackButton from "../widgets/feedback_button";
import Session from "../../models/session";

var signIn = (function() {
  var content = function(ctrl) {
    return [
      m(".align-vertical-block", [
        m("figure", { class: "center-block display-table mboth-60" }, [
          m("img", { src: "/images/logo-zinkroo--white.png", width: "400" }),
          m("h4", { class: "text-right text-white weight-regular" }, "live media sync")
        ]),
        m('.card-wrapper sign center-block p-all-side-75', [
          m("p", { class: "mb-40 text-dark--grey" }, [
            "Need a Zinkroo account? ",
            m("a", { href: "", class: "btn-link" }, "Create your account")
          ]),
          m("form", { class: "" }, [
            m(".mb-25", [
              m.component(textField, {
                type: 'email',
                //placeholder: 'Enter your Email',
                id: 'email',
                dataLabel: 'Email',
                oninput: m.withAttr("value", Session.model.email),
                error: ctrl.errors()['email'],
                fieldType: "",
                icon: "fa fa-user",
                labelStyles: "text-dark--grey mb-15",
                inputSize: "input-lg reset-boxshadow reset-radius--2"
              })
            ]),
            m.component(textField, {
              type: 'password',
              //placeholder: 'Enter Password',
              id: 'password',
              dataLabel: 'Password',
              oninput: m.withAttr("value", Session.model.password),
              error: ctrl.errors()['password'],
              fieldType: "",
              icon: "fa fa-unlock-alt",
              labelStyles: "text-dark--grey mb-15",
              inputSize: "input-lg reset-boxshadow reset-radius--2"
            }),
            m("div", { class: "text-center mboth-30" }, [
              m.component(feedbackButton, {
                action: ctrl.createSession,
                label: 'Login',
                feedbackLabel: 'Authenticating...',
                style: 'btn btn-primary btn-lg btn-block mb-75 mt-60'
              })
            ]),
            m(".row", [
              m(".col-sm-6", [
                m(".keep-signed", [
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
                  m("a", { href: "/password/request", config: m.route, class: "btn-link" }, "Forgot your password?")
                ])
              ])
            ])
          ])
        ])
      ])
    ]
  };

  return {
    controller: function(){
      var ctrl = this;
      ctrl.errors = m.prop({});

      ctrl.createSession = function(args) {
        return Session.create(args).then(function(user) {
          if(user.data.active)
            m.route("/dashboard");
          else
            m.route("/activate");
        }, function(response) {
          ctrl.errors(response.errors);
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
