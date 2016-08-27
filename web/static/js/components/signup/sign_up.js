import mixinLayout from "../layout/mixin_layout";
import textField from "../widgets/text_field";
import feedbackButton from "../widgets/feedback_button";
import Registration from "../../models/registration";

var signUp = (function() {
  var content = function(ctrl) {
    return [
      m("header", { class: "header-text row space-bottom" }, [
        m("hgroup", { class: "text-center col-md-8 col-md-offset-2" }, [
          m("h1", { class: "header-text__title" }, "We5! Il blog della guida HTML5"),
          m("h2", { class: "header-text__subtitle" }, "Approfittiamo dei vantaggi delle specifiche HTML5!"),
          m("hr", { class: "header-text__separator" })
        ])
      ]),
      m("section", { class: "row" }, [
        m("div", { class: "col-md-4 col-md-offset-2 plus-list" }, [
          m(".media", { class: "space-bottom" }, [
            m(".media-left", [
              // m("i", { class: "fa fa-user", "aria-hidden": true })
              m("img", { class: "media-object", src: "/images/icons/user.png", alt: "" })
            ]),
            m(".media-body", [
              m("h4", { class: "no-margin-top plus-list__title" }, "Free Account"),
              m("p", { class: "plus-list__description" }, "Here you can write a feature description for your dashboard, let the users know what is the value that you give them.")
            ])
          ]),
          m(".media", { class: "space-bottom" }, [
            m(".media-left", [
              m("img", { class: "media-object", src: "/images/icons/graphs.png", alt: "" })
            ]),
            m(".media-body", [
              m("h4", { class: "no-margin-top plus-list__title" }, "Awesome Performances"),
              m("p", { class: "plus-list__description" }, "Here you can write a feature description for your dashboard, let the users know what is the value that you give them.")
            ])
          ]),
          m(".media", { class: "space-bottom" }, [
            m(".media-left", [
              m("img", { class: "media-object", src: "/images/icons/support.png", alt: "" })
            ]),
            m(".media-body", [
              m("h4", { class: "no-margin-top plus-list__title" }, "Global Support"),
              m("p", { class: "plus-list__description" }, "Here you can write a feature description for your dashboard, let the users know what is the value that you give them.")
            ])
          ])
        ]),
        m("div", { class: "col-md-4 col-md-offset-s1" }, [
          m('.wrapper', [
            //m("h2", { class: "header text-center mgv20" }, "Sign Up"),
            m(".content", [
              m("form", { class: "light-form" }, [
                m.component(textField, {
                  type: 'email',
                  placeholder: 'Enter your Email',
                  id: 'email',
                  dataLabel: 'Email',
                  oninput: m.withAttr("value", Registration.model.email),
                  error: ctrl.errors()['email']
                }),
                m.component(textField, {
                  type: 'password',
                  placeholder: 'Enter Password',
                  id: 'password',
                  dataLabel: 'Password',
                  oninput: m.withAttr("value", Registration.model.password),
                  error: ctrl.errors()['password']
                }),
                m.component(textField, {
                  type: 'password',
                  placeholder: 'Enter Password',
                  id: 'password_confirmation',
                  dataLabel: 'Confirm Password',
                  oninput: m.withAttr("value", Registration.model.password_confirmation),
                  error: ctrl.errors()['password_confirmation']
                }),
                m("div", { class: "text-center mgv30" }, [
                  m.component(feedbackButton, {
                    action: ctrl.createUser,
                    label: 'Register',
                    feedbackLabel: 'Signing up...',
                    style: 'btn btn-primary btn-lg'
                  })
                ]),
                m("p", { class: "text-center" }, "Already a member. ", [
                  m("a", { href: "/signin", config: m.route }, "Login!")
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
