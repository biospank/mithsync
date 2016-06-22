var textField = {
  view: function(ctrl, attrs) {
    return m(".form-group", [
            m("label", { class: "text-uppercase" }, attrs.dataLabel ),
            m("input", $.extend(attrs, {
              class: 'form-control',
            }))
          ]);
  }
};

export default textField;
