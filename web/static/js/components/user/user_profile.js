import mixinLayout from "../layout/mixin_layout";
import textField from "../widgets/text_field";
import Session from "../../models/session";

var userProfile = (function() {

  var content = function() {
    return m(".row", [
      m('.col-xs-7 col-lg-9', [
        m("form", { class: "light-form" }, [
          m(".row", [
            m(".col-md-6", [
              m.component(textField, {
                type: 'text',
                placeholder: 'Enter your First name',
                id: 'first_name',
                dataLabel: 'First Name',
                fieldType: "group",
                icon: "fa fa-user"
              })
            ]),
            m(".col-md-6", [
              m.component(textField, {
                type: 'text',
                placeholder: 'Enter your Last name',
                id: 'last_name',
                dataLabel: 'Last Name' ,
                fieldType: "group",
                icon: "fa fa-user"
              })
            ]),
            m(".col-md-6", [
              m.component(textField, { type: 'text', placeholder: 'Enter your Company name', id: 'company_name', dataLabel: 'Company' })
            ]),
            m(".col-md-6", [
              m.component(textField, { type: 'text', placeholder: 'Enter your email', id: 'email', dataLabel: 'Email' })
            ]),
            m(".col-md-12", [
              m.component(textField, {
                type: 'text',
                placeholder: 'Enter your address',
                id: 'address',
                dataLabel: 'Address',
                fieldType: "group",
                icon: "fa fa-map-marker"
              })
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
          m("div", { class: "text-right mboth-20" }, [
            m("button[type=submit]", {
              class: 'btn btn-primary btn-lg'
            }, "Update Profile" )
          ])
        ])
      ]),
      m(".col-xs-5 col-lg-3", [
        m('.card-wrapper bordered mboth-25', [
          m(".profile-card", [
            m("figure", { class: "profile-card__photo" }, [
              m("img", { src: "/images/avatar.jpg", alt: "Avatar", class: "img-responsive" })
            ]),
            m(".profile-card__info", [
              m("h4", { class: "name" }, "Paolo Branco"),
              m("p", { class: "email" }, "paolo.branco@gmail.com")
            ])
          ])
        ])
      ])
    ])
  };

  return {
    controller: function() {
      if(Session.isExpired())
        m.route("/signin");
    },
    view: mixinLayout(content)
  };
})();

export default userProfile;
