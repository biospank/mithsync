var searchForm = {
  view: function(ctrl, attrs) {
    return m("form", { class: "navbar-form search-form", role: "search" }, [
      m(".input-group", [
        m("span", { class: "input-group-btn" }, [
          m("button[type=submit]", {
            class: "btn btn-default",
            onclick: attrs.action
          }, [
            m("i", { class: "fa fa-search" })
          ])
        ]),
        m("input", {
          type: "text",
          class: "form-control",
          placeholder: "Search for...",
          oninput: m.withAttr("value", attrs.filter)
        })
      ])
    ]);
  }
}

export default searchForm;
