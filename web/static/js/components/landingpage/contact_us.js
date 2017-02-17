import Session from "../../models/session";

var contactUs = {
  controller: function() {
    if(!Session.isExpired()) {
      m.route("/dashboard");
    }
  },
  view: function() {
    return m("div", {
        config: function(element, isInit) {
          if(!isInit) {
            ScrollReveal().reveal('.images-intro, .steps-section__item, .layout-thumb, .btn-signup-now');
          }
        }
      }, [
      m("div", [
        m("figure", { class: "center-block display-table mboth-60 intro-section__logo" }, [
          m("a", { href:"/", config: m.route }, [
            m("img", { src: "/images/logo-zinkroo--white.png", width: "400", class:"img-responsive" }),
          ]),
          m("h4", { class: "text-right text-white weight-regular" }, "live media sync")
        ])
      ]),
      m("section", [
        m(".container", [
          m(".col-sm-6 center-block contact-us mb-95", [
            m("h2", { class: "text-white text-center mb-55 mt-0" }, "Get In Touch"),
            m("p", { class: "text-white text-left mb-55 contact-us__description" }, "Zinkroo is still a Beta Tool and has to be improved. Let us know if you have some question, advice or anything that could help our improvement, or just to have a talk"),
            m(".row mb-25", [
              m(".col-sm-2", [
                m("label", { class: "text-white mb-0" }, "Call: ")
              ]),
              m(".col-sm-10", [
                m("p", { class: "text-white weight-bold mb-0" }, "+39 02 8135947")
              ])
            ]),
            m(".row mb-25", [
              m(".col-sm-2", [
                m("label", { class: "text-white mb-0" }, "Fax: ")
              ]),
              m(".col-sm-10", [
                m("p", { class: "text-white weight-bold mb-0" }, "+39 02 87382752")
              ])
            ]),
            m(".row mb-25", [
              m(".col-sm-2", [
                m("label", { class: "text-white mb-0" }, "Email: ")
              ]),
              m(".col-sm-10", [
                m("p", { class: "text-white weight-bold mb-0" }, "info@axenso.com")
              ])
            ]),
            m(".row", [
              m(".col-sm-2", [
                m("label", { class: "text-white mb-0" }, "Visit: ")
              ]),
              m(".col-sm-10", [
                m("p", { class: "text-white weight-bold mb-0" }, "Axenso Srl - Via Walter Tobagi 8/A 20143 Milano")
              ])
            ])
          ])
        ]),
        m("figure", [
          m("img", { src: "/images/maps.jpg", class: "img-responsive" })
        ])
      ]),
      m("footer", { class: "bg-main text-center pboth-40" }, [
        m("p", { class: "mb-0 text-white" }, [
          "©2017 ",
          m("a", { href: "http://axenso.com/", target: "_blank", class: "weight-strong text-white" }, "Axenso "),
          "all Rights Reserved. ",
          m("a", { href: "/privacy", class: "weight-strong text-white", config: m.route }, "Privacy"),
          " and ",
          m("a", { href: "/terms", class: "weight-strong text-white", config: m.route }, "Terms")
        ])
      ])
    ])
  }
}

export default contactUs;
