var searchForm = function() {
  return [
    m("form", { class: "navbar-form search-form", role: "search" }, [
      m(".input-group", [
        m("span", { class: "input-group-btn" }, [
          m("button", { class: "btn btn-default", type: "button" }, [
            m("i", { class: "fa fa-search" })
          ])
        ]),
        m("input", { type: "text", class: "form-control", placeholder: "Search for..." })
      ])
    ])
  ];
};

export default searchForm;
