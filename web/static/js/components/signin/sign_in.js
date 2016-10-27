import mixinLayout from "../layout/mixin_layout";
import textField from "../widgets/text_field";
import feedbackButton from "../widgets/feedback_button";
import Session from "../../models/session";

var signIn = (function() {
  var content = function(ctrl) {
    return [
      // m("figure", { class: ".col-xs-7 .col-sm-7 .col-md-4 .col-lg-3 .center-block" }, [
      //   m("div", { class: "text-center", id: "logo" }, [
      //     m("img", { src: "/images/logo.png", alt: "Zinkroo" })
      //   ])
      // ]),
      m("header", { class: "header-text space-bottom" }, [
        m("hgroup", { class: "text-center" }, [
          m("h1", { class: "header-text__title no-margin-top" }, "Sign in to zinkroo.com"),
          m("h2", { class: "header-text__subtitle" }, m.trust("Enter your <b>email</b> address and <b>password</b>")),
          //m("hr", { class: "header-text__separator" })
        ])
      ]),
      m('.card-wrapper sign bordered center-block', [
        m("form", { class: "light-form" }, [
          m.component(textField, {
            type: 'email',
            placeholder: 'Enter your Email',
            id: 'email',
            dataLabel: 'Email',
            oninput: m.withAttr("value", Session.model.email),
            error: ctrl.errors()['email'],
            fieldType: "group",
            icon: "fa fa-user"
          }),
          m.component(textField, {
            type: 'password',
            placeholder: 'Enter Password',
            id: 'password',
            dataLabel: 'Password',
            oninput: m.withAttr("value", Session.model.password),
            error: ctrl.errors()['password'],
            fieldType: "group",
            icon: "fa fa-unlock-alt"
          }),
          m("p", [
            m("a", { href: "/password/request", config: m.route }, "Forgot password?")
          ]),
          // m(".checkbox", [
          //   m("label", [
          //     m("input", { type: "checkbox", checked: "checked" }),
          //     "Keep me signed in for 1 week"
          //   ])
          // ]),
          m("div", { class: "text-center mgv30" }, [
            m.component(feedbackButton, {
              action: ctrl.createSession,
              label: 'Login',
              feedbackLabel: 'Authenticating...',
              style: 'btn btn-primary btn-lg'
            })
          ]),
          m("p", { class: "text-center" }, "Haven't you got an account yet? ", [
            m("a", { href: "/signup", config: m.route }, "Click here")
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
