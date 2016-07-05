import mixinLayout from "../layout/mixin_layout";
import textField from "../widgets/text_field";

var resetRequestPage = (function() {
  var content = function() {
    return [
      m("header", { class: "header-text row space-bottom" }, [
        m("hgroup", { class: "text-center col-md-8 col-md-offset-2" }, [
          m("h1", { class: "header-text__title" }, "We5! Il blog della guida HTML5"),
          m("h2", { class: "header-text__subtitle" }, "Approfittiamo dei vantaggi delle specifiche HTML5!"),
          m("hr", { class: "header-text__separator" })
        ])
      ]),
      m("div", { class: "col-sm-6 center-block" }, [
        m("form", { class: "light-form" }, [
          m.component(textField, { type: 'email', placeholder: 'Enter your Email', id: 'email' }),
          m("div", { class: "text-center mgv30" }, [
            m("button[type=submit]", {
              class: 'btn btn-success contour btn-lg'
            }, "Send instructions" )
          ])
        ])
      ])
		];
  };

  return {
    controller: function(){
      var ctrl = this;
      ctrl.errors = m.prop({});

      ctrl.createSession = function(args) {
        return Session.create(args).then(function(data) {
          m.route("/password/reset");
        }, function(response) {
          ctrl.errors(response.errors);
        })
      };
    },
    view: mixinLayout(content, 'login')
  };
})();

export default resetRequestPage;
