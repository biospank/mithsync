import mixinLayout from "../layout/mixin_layout";
import textField from "../widgets/text_field";
import feedbackButton from "../widgets/feedback_button";
import Session from "../../models/session";

var resetPage = (function() {
  var content = function(ctrl) {
    return [
      m('.col-xs-12 .col-sm-7 .col-md-4 .center-block .space-top', [
        m('.wrapper', [
          m("h2", { class: "header text-center mgv20" }, "Change Password"),
          m(".content", [
            m("form", { class: "light-form" }, [
              m.component(textField, {
                type: 'password',
                placeholder: 'Enter Password',
                id: 'password',
                dataLabel: 'Password',
                oninput: m.withAttr("value", ""),
                error: ctrl.errors()['password']
              }),
              m.component(textField, {
                type: 'password',
                placeholder: 'Enter Password',
                id: 'password_confirmation',
                dataLabel: 'Confirm Password',
                oninput: m.withAttr("value", ""),
                error: ctrl.errors()['password_confirmation']
              }),
              m("div", { class: "text-center mgv30" }, [
                m.component(feedbackButton, {
                  action: function() {},
                  label: 'Reset',
                  feedbackLabel: 'Authenticating...',
                  style: 'btn btn-success btn-lg'
                })
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
    },
    view: mixinLayout(content, 'login')
  };
})();

export default resetPage;
