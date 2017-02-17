var socialShare = {
  view: function() {
    return m("ul", { class: "list-unstyled social-share" }, [
      m("li", { class: "social-share__item" }, [
        m("a", { href: "http://www.facebook.com/share.php?u=http://www.zinkroo.com", class: "facebook", target: "_blank" }, [
          m("i", { class: "fa fa-facebook", "aria-hidden": "true" }),
          m("label", "Share it")
        ])
      ]),
      m("li", { class: "social-share__item" }, [
        m("a", { href: "http://twitter.com/share?text=The%20perfect%20way%20to%20sync%20and%20embed%20your%20video%20and%20images%2C%20everywhere!&url=http://www.zinkroo.com", class: "twitter", target: "_blank" }, [
          m("i", { class: "fa fa-twitter", "aria-hidden": "true" }),
          m("label", "Share it")
        ])
      ]),
      m("li", { class: "social-share__item" }, [
        m("a", { href: "https://plus.google.com/share?url=http://www.zinkroo.com", class: "googleplus", target: "_blank" }, [
          m("i", { class: "fa fa-google-plus", "aria-hidden": "true" }),
          m("label", "Share it")
        ])
      ])
    ])
  }
}

export default socialShare;
