import mixinLayout from "../layout/mixin_layout";
import textField from "../widgets/text_field";
import feedbackButton from "../widgets/feedback_button";
import Session from "./session";

var signIn = (function() {
  var content = function(ctrl) {
    return [
      m('.col-xs-12 .col-sm-7 .col-md-4 .center-block .space-top', [
        m('.wrapper', [
          m("h2", { class: "header text-center mgv20" }, "Sign In"),
          m(".content", [
            m("form", { class: "light-form" }, [
              m.component(textField, {
                type: 'email',
                placeholder: 'Enter your Email',
                id: 'email',
                dataLabel: 'Email',
                oninput: m.withAttr("value", Session.model.email),
                error: ctrl.errors()['email']
              }),
              m.component(textField, {
                type: 'password',
                placeholder: 'Enter Password',
                id: 'password',
                dataLabel: 'Password',
                oninput: m.withAttr("value", Session.model.password),
                error: ctrl.errors()['password']
              }),
              m("p", [
                m("a", { href: "/retrievepsw", config: m.route }, "Forgot password?")
              ]),
              m("div", { class: "text-center mgv30" }, [
                m.component(feedbackButton, {
                  action: ctrl.createSession,
                  label: 'Login',
                  feedbackLabel: 'Authenticating...'
                })
              ]),
              m("p", { class: "text-center" }, "Haven't you got an account yet? ", [
                m("a", { href: "/signup" }, "Click here")
              ]),
              m("p", { class: "text-center" }, "Or" ),
              m("ul", { class: "list-inline socials-group text-center" }, [
                m("li", [
                  m("a", { href: "", class: "socials-group__item socials-group__item--facebook" }, [
                    m("i", { class: "fa fa-facebook", "aria-hidden": true })
                  ])
                ]),
                m("li", [
                  m("a", { href: "", class: "socials-group__item socials-group__item--twitter" }, [
                    m("i", { class: "fa fa-twitter", "aria-hidden": true })
                  ])
                ])
              ])
            ])
          ])
        ])
      ])
		];
  };

  return {
    controller: function(){
      var ctrl = this;
      ctrl.errors = m.prop({});

      ctrl.createSession = function(args) {
        return Session.create(args).then(function() {
          m.route("/signup");
        }, function(response) {
          ctrl.errors(response.errors);
        })
        // User.create().then(function() {
        //   update.bind(this);
        // })
      };
    },
    view: mixinLayout(content, 'login')
  };
})();

export default signIn;
