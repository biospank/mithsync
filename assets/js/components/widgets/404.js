var recordNotFound = {
  view: function() {
    return m("", [
      m("figure", { class: "text-center" }, [
        m("img", { src: "images/no-list.svg", with: "80", height: "80" })
      ]),
      m("h3", { class: "text-center mgv20" }, "No images found"),
      m("p", { class: "text-center" }, "")
    ])
  }
}

export default recordNotFound;
