var searchForm = {
  oninit({attrs}) {
    this.filter = attrs.filter;
    this.action = attrs.action;
  },
  view({state}) {
    return m("form", { class: "navbar-form search-form", role: "search" }, [
      m(".input-group .input-group--big", [
        m("input", {
          type: "text",
          class: "form-control",
          placeholder: "Search for...",
          oninput: m.withAttr("value", state.filter)
        }),
        m("span", { class: "input-group-btn" }, [
          m("button[type=submit]", {
            class: "btn btn-none",
            onclick: state.action
          }, [
            m("i", { class: "fa fa-search" })
          ])
        ])
      ])
    ]);
  }
}

export default searchForm;
