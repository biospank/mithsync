import mixinLayout from "../layout/mixin_layout";
import textField from "../widgets/text_field";
import feedbackButton from "../widgets/feedback_button";
import Registration from "../../models/registration";

var signUp = (function() {
  var content = function(ctrl) {
    return [
      m("div", [
        m("figure", { class: "center-block display-table mboth-60" }, [
          m("a", { href:"/", config: m.route }, [
            m("img", { src: "/images/logo-zinkroo--white.png", width: "400", class:"img-responsive" }),
          ]),
          m("h4", { class: "text-right text-white weight-regular" }, "live media sync")
        ]),
        m("h1", { class: "mt-0 mb-60 text-center text-white" }, "Create your account: you can get it for free!"),
        m(".card-wrapper sign center-block p-all-side-75", [
          m("p", { class: "text-dark--grey mb-45" }, "Already a member. ", [
            m("a", { href: "/signin", config: m.route, class: "btn-link" }, "Login!")
          ]),
          m("form", { class: "" }, [
            m.component(textField, {
              type: 'email',
              //placeholder: 'Enter your Email',
              id: 'email',
              dataLabel: 'Email',
              oninput: m.withAttr("value", Registration.model.email),
              error: ctrl.errors()['email'],
              fieldType: "",
              icon: "fa fa-user",
              labelStyles: "text-dark--grey mb-15",
              inputSize: "input-lg reset-boxshadow reset-radius--2"
            }),
            m.component(textField, {
              type: 'password',
              //placeholder: 'Enter Password',
              id: 'password',
              dataLabel: 'Password',
              oninput: m.withAttr("value", Registration.model.password),
              error: ctrl.errors()['password'],
              fieldType: "",
              icon: "fa fa-unlock-alt",
              labelStyles: "text-dark--grey mb-15",
              inputSize: "input-lg reset-boxshadow reset-radius--2"
            }),
            m.component(textField, {
              type: 'password',
              //placeholder: 'Enter Password',
              id: 'password_confirmation',
              dataLabel: 'Confirm Password',
              oninput: m.withAttr("value", Registration.model.password_confirmation),
              error: ctrl.errors()['password_confirmation'],
              fieldType: "",
              icon: "fa fa-unlock-alt",
              labelStyles: "text-dark--grey mb-15",
              inputSize: "input-lg reset-boxshadow reset-radius--2"
            }),
            m("div", { class: "text-center mboth-30" }, [
              m.component(feedbackButton, {
                action: ctrl.createUser,
                label: 'Register',
                feedbackLabel: 'Signing up...',
                style: 'btn btn-primary btn-lg btn-block mt-60'
              })
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
