import mixinLayout from "../layout/mixin_layout";
import textField from "../widgets/text_field";

var retrievePsw = (function() {
  var content = function() {
    return [
      m("header", { class: "header-text row space-bottom" }, [
        m("hgroup", { class: "text-center col-md-8 col-md-offset-2" }, [
          m("h1", { class: "header-text__title" }, "We've send you an email with your activation code"),
          m("h2", { class: "header-text__subtitle" }, "You need to insert it below to active the account"),
          m("hr", { class: "header-text__separator" })
        ])
      ]),
      m("div", { class: "col-sm-6 center-block" }, [
        m("form", { class: "light-form" }, [
          m.component(textField, { type: 'text', placeholder: 'Enter your code', id: 'activation_code' }),
          m("div", { class: "text-center mgv30" }, [
            m("button[type=submit]", {
              class: 'btn btn-success contour btn-lg'
            }, "Send" )
          ])
        ])
      ])
		];
  };

  return {
    view: mixinLayout(content, 'login')
  };
})();

export default retrievePsw;
