var textField = {
  view: function(ctrl, attrs) {
    if(attrs.typeForm === "group") {
      return m(".form-group", { class: attrs.error ? "has-error" : "" }, [
        m("label", { class: "text-uppercase" }, attrs.dataLabel ),
        m(".input-group", [
          m("span", { class: "input-group-addon" }, [
            m("i", { class: attrs.icon })
          ]),
          m(attrs.field || "input", _.assign(attrs, {
            class: 'form-control'
          }))
        ]),
        m("p", {
          class: "error-label " + (attrs.error ? "show" : "hidden")
        }, attrs.error)
      ]);
    } else {
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
