import mixinLayout from "../layout/mixin_layout";
import textField from "../widgets/text_field";
import Session from "../../models/session";

var userProfile = (function() {

  var content = function() {
    return [
      m('.col-md-8', [
        m('.wrapper', { class: "bordered" }, [
          m("h2", { class: "header space-bottom no-margin-top" }, "Edit Profile"),
          m(".content", [
            m("form", { class: "light-form" }, [
              m(".row", [
                m(".col-md-6", [
                  m.component(textField, { type: 'text', placeholder: 'Enter your First name', id: 'first_name', dataLabel: 'First Name' })
                ]),
                m(".col-md-6", [
                  m.component(textField, { type: 'text', placeholder: 'Enter your Last name', id: 'last_name', dataLabel: 'Last Name' })
                ]),
                m(".col-md-6", [
                  m.component(textField, { type: 'text', placeholder: 'Enter your Company name', id: 'company_name', dataLabel: 'Company' })
                ]),
                m(".col-md-6", [
                  m.component(textField, { type: 'text', placeholder: 'Enter your email', id: 'email', dataLabel: 'Email' })
                ]),
                m(".col-md-12", [
                  m.component(textField, { type: 'text', placeholder: 'Enter your address', id: 'address', dataLabel: 'Address' })
                ]),
                m(".col-md-4", [
                  m.component(textField, { type: 'text', placeholder: 'Enter your city', id: 'city', dataLabel: 'City' })
                ]),
                m(".col-md-4", [
                  m.component(textField, { type: 'text', placeholder: 'Enter your country', id: 'country', dataLabel: 'Country' })
                ]),
                m(".col-md-4", [
                  m.component(textField, { type: 'text', placeholder: 'Enter your post code', id: 'postcode', dataLabel: 'Post code' })
                ])
              ]),
              m("div", { class: "text-right mgv20" }, [
                m("button[type=submit]", {
                  class: 'btn btn-info btn-lg'
                }, "Update Profile" )
              ])
            ])
          ])
        ])
      ]),
      m(".col-md-4", [
        m('.wrapper', { class: "bordered" }, [
          m(".user .internal", [
            m("figure", { class: "user__avatar" }, [
              m("img", { src: "/images/avatar.png", alt: "Avatar" })
            ]),
            m(".user__info", [
              m("h4", { class: "user__name" }, "Ilaria Di Rosa"),
              m("p", { class: "user__lightext" }, "dirosa.ilaria@gmail.com")
            ])
          ])
        ])
      ])
		];
  };

  return {
    controller: function() {
      if(!Session.token())
        m.route("/signin");
    },
    view: mixinLayout(content)
  };
})();

export default userProfile;
