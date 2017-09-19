import mixinLayout from "../layout/mixin_layout";
import textField from "../widgets/text_field";
import Session from "../../models/session";
import User from "../../models/user";
import feedbackButton from "../widgets/feedback_button";

var profile = (function() {

  var content = ({state}) => {
    return m(".row", [
      m(".col-sm-8", [
        m(".row", [
          m('.col-xs-7 col-lg-9', [
            m("form", { class: "light-form" }, [
              m(".row", [
                m(".col-md-12", [
                  m(textField, {
                    type: 'email',
                    placeholder: 'Enter your Email',
                    id: 'email',
                    dataLabel: 'Email',
                    disabled: 'disabled',
                    value: User.model.email()
                  })
                ]),
                m(".col-md-6", [
                  m(textField, {
                    type: 'password',
                    placeholder: 'Enter New Password',
                    id: 'password',
                    dataLabel: 'New Password',
                    oninput: m.withAttr("value", User.model.password),
                    error: state.errors()['password']
                  })
                ]),
                m(".col-md-6", [
                  m(textField, {
                    type: 'password',
                    placeholder: 'Reenter New Password',
                    id: 'password_confirmation',
                    dataLabel: 'Confirm New Password',
                    oninput: m.withAttr("value", User.model.password_confirmation),
                    error: state.errors()['password_confirmation']
                  })
                ]),
              ]),
              m("div", { class: "text-center mboth-30" }, [
                m(feedbackButton, {
                  action: state.changePassword,
                  label: 'Change Password',
                  feedbackLabel: 'Changing...',
                  style: 'btn btn-primary btn-lg'
                })
              ]),
            ])
          ])
          // m(".col-xs-5 col-lg-3", [
          //   m('.card-wrapper bordered mboth-25', [
          //     m(".profile-card", [
          //       m("figure", { class: "profile-card__photo" }, [
          //         m("img", { src: "/images/icons/avatar-no-photo.png", alt: "Avatar", class: "img-responsive center-block" })
          //       ])
          //       // m(".profile-card__info", [
          //       //   m("h4", { class: "name mboth-0" }, "Paolo Branco"),
          //       //   m("p", { class: "email mboth-0" }, "paolo.branco@gmail.com")
          //       // ])
          //     ])
          //   ])
          // ])
        ])
      ])
    ])
  };

  return {
    oninit() {
      this.errors = m.stream({});

      if(Session.isExpired())
        m.route.set("/signin");

      this.changePassword = () => {
        return User.update().then((response) => {
          m.route.set("/dashboard");
        }, (e) => {
          this.errors(JSON.parse(e.message).errors);
        })
      };

      if(_.isEmpty(User.current())) {
        User.getCurrent().then((response) => {
          User.resetModel(response.data);
          User.current(response.data);
        });
      } else {
        User.resetModel(User.current());
      }

      // User.getCurrent().then((response) => {
      //   User.resetModel(response.data);
      // });
    },
    view: mixinLayout(content)
  };
})();

export default profile;
