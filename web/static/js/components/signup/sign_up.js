import mixinLayout from "../layout/mixin_layout";
import textField from "../widgets/text_field";
import feedbackButton from "../widgets/feedback_button";
import Registration from "../../models/registration";

var signUp = (function() {
  var content = function(ctrl) {
    return [
      // m("figure", { class: ".col-xs-7 .col-sm-7 .col-md-4 .col-lg-3 .center-block" }, [
      //   m("div", { class: "text-center", id: "logo" }, [
      //     m("img", { src: "/images/logo.png", alt: "Zinkroo" })
      //   ])
      // ]),
      m("header", { class: "header-text space-bottom" }, [
        m("hgroup", { class: "text-center" }, [
          m("h1", { class: "header-text__title no-margin-top" }, "Create your account"),
          m("h2", { class: "header-text__subtitle" }, "You can get it for free!"),
          m("hr", { class: "header-text__separator" })
        ])
      ]),
      m(".col-xs-7 .col-sm-7 .col-md-4 .col-lg-3 .center-block", [
        m(".card-wrapper", [
          m("form", { class: "light-form" }, [
            m.component(textField, {
              type: 'email',
              placeholder: 'Enter your Email',
              id: 'email',
              dataLabel: 'Email',
              oninput: m.withAttr("value", Registration.model.email),
              error: ctrl.errors()['email'],
              typeForm: "group",
              icon: "fa fa-user"
            }),
            m.component(textField, {
              type: 'password',
              placeholder: 'Enter Password',
              id: 'password',
              dataLabel: 'Password',
              oninput: m.withAttr("value", Registration.model.password),
              error: ctrl.errors()['password'],
              typeForm: "group",
              icon: "fa fa-unlock-alt"
            }),
            m.component(textField, {
              type: 'password',
              placeholder: 'Enter Password',
              id: 'password_confirmation',
              dataLabel: 'Confirm Password',
              oninput: m.withAttr("value", Registration.model.password_confirmation),
              error: ctrl.errors()['password_confirmation'],
              typeForm: "group",
              icon: "fa fa-unlock-alt"
            }),
            m("div", { class: "text-center mgv30" }, [
              m.component(feedbackButton, {
                action: ctrl.createUser,
                label: 'Register',
                feedbackLabel: 'Signing up...',
                style: 'btn btn-success btn-lg'
              })
            ]),
            m("p", { class: "text-center" }, "Already a member. ", [
              m("a", { href: "/signin", config: m.route }, "Login!")
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

      ctrl.createUser = function(args) {
        return Registration.create(args).then(function() {
          m.route("/activate");
        }, function(response) {
          ctrl.errors(response.errors);
        })
      };
    },
    view: mixinLayout(content, 'login')
  };
})();

export default signUp;
