var textField = (function() {
  var showField = function(attrs) {
    if(attrs.fieldType === "group") {
      return m(".input-group", [
        m("span", { class: "input-group-addon" }, [
          m("i", { class: attrs.icon })
        ]),
        m(attrs.field || "input", _.assign(attrs, {
          class: 'form-control'
        }))
      ]);
    } else {
      return m(attrs.field || "input", _.assign(attrs, {
        class: 'form-control'
      }));
    }
  }

  return {
    view: function(ctrl, attrs) {
      return m(".form-group", { class: attrs.error ? "has-error" : "" }, [
        m("label", { class: "text-uppercase" }, attrs.dataLabel ),
        showField(attrs),
        m("p", {
          class: "error-label " + (attrs.error ? "show" : "hidden")
        }, attrs.error)
      ]);
    }
  }
})();

export default textField;
