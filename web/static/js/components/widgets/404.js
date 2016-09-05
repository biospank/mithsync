var recordNotFound = {
  view: function() {
    return m("", [
      m("figure", { class: "text-center" }, [
        m("img", { src: "images/no-list.svg", with: "100", height: "100" })
      ]),
      m("h3", { class: "text-center mgv20" }, "No records found"),
      m("p", { class: "text-center" }, "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis.")
    ])
  }
}

export default recordNotFound;
