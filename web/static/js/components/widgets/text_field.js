const textField = {
  oninit(vnode) {
    this.showField = (attrs) => {
      if(attrs.fieldType === "group") {
        return m(".input-group", [
          m("span", { class: "input-group-addon" }, [
            m("i", { class: attrs.icon })
          ]),
          m(attrs.field || "input", _.assign(attrs, {
            class: 'form-control ' + attrs.inputSize
          }))
        ]);
      } else {
        return m(attrs.field || "input", _.assign(attrs, {
          class: 'form-control ' + attrs.inputSize
        }));
      }
    }
  },
  view({attrs}) {
    return m(".form-group", { class: attrs.error ? "has-error" : "" }, [
      m("label", { class: attrs.labelStyles }, attrs.dataLabel ),
      this.showField(attrs),
      m("p", {
        class: "error-label " + (attrs.error ? "show" : "hidden")
      }, attrs.error)
    ]);
  }
};

export default textField;
