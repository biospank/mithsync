var textField = {
  view: function(ctrl, attrs) {
    return m(".form-group", [
            m("label", $.extend(attrs.placeholder) ),
            m("input", $.extend(attrs, {
              class: 'form-control',
            }))
          ]);
  }
};

export default textField;
