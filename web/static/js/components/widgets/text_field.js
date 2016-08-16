var textField = {
  view: function(ctrl, attrs) {
    return m(".form-group", { class: attrs.error ? "has-error" : "" }, [
      m("label", { class: "text-uppercase" }, attrs.dataLabel ),
      m(attrs.field || "input", _.assign(attrs, {
        class: 'form-control'
      })),
      m("p", {
        class: "error-label " + (attrs.error ? "show" : "hidden")
      }, attrs.error)
    ]);
  }
};

export default textField;
