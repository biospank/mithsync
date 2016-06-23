var textField = {
  view: function(ctrl, attrs) {
    return m(".form-group", { class: attrs.hasError ? "has-error" : "" }, [
            m("label", { class: "text-uppercase" }, attrs.dataLabel ),
            m("input", $.extend(attrs, {
              class: 'form-control',
            })),
            m("p", { class: "error-label hidden" }, "This field is required.")
          ]);
  }
};

export default textField;
