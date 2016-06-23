var textField = {
  view: function(ctrl, attrs) {
    return m(".form-group", { class: attrs.error ? "has-error" : "" }, [
            m("label", { class: "text-uppercase" }, attrs.dataLabel ),
            m("input", $.extend(attrs, {
              class: 'form-control',
            })),
            m("p", {
              class: "error-label " + (attrs.error ? "show" : "hidden")
            }, attrs.error)
          ]);
  }
};

export default textField;
