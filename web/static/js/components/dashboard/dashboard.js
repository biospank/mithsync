import mixinLayout from "../layout/mixin_layout";
import textField from "../widgets/text_field";

var dashboard = (function() {
  var content = function() {
    return [
      m('.col-xs-12 .col-sm-7 .col-md-4 .center-block', [
        m('.wrapper', [
          m("h2", { class: "header text-center mgv20" }, "Sign In"),
          m(".content", [
            m("form", { class: "light-form" }, [
              m.component(textField, { type: 'email', placeholder: 'Enter your Email', id: 'email', dataLabel: 'Email' }),
              m.component(textField, { type: 'password', placeholder: 'Enter Password', id: 'password', dataLabel: 'Password' }),
              // m("p", "Have you forgot yuor password?"),
              // m("p", "Don't worry ", [
              //   m("a", { href: "/retrievepsw", config: m.route }, "Click here!"),
              // ]),
              m("div", { class: "text-center mgv30" }, [
                m("button[type=submit]", {
                  class: 'btn btn-success btn-lg'
                }, "Login" )
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
        ])
      ])
		];
  };

  return {
    view: mixinLayout(content)
  };
})();

export default dashboard;
