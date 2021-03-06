import Session from "../../models/session";
import textField from "../widgets/text_field";
import Contact from "../../models/contact";
import feedbackButton from "../widgets/feedback_button";

var contactUs = {
  oninit({state}) {
    state.errors = m.stream({});
    state.showMsg = m.stream(false);

    state.sendMessage = (args) => {
      return Contact.create(args).then(() => {
        state.showMsg(true);
        Contact.resetModel();
        state.errors({})
      }, (e) => {
        state.errors(JSON.parse(e.message).errors);
      })
    };

    if(!Session.isExpired()) {
      m.route.set("/dashboard");
    }
  },
  view: function({state}) {
    return m("div", {
        oncreate(vnode) {
          ScrollReveal().reveal('.images-intro, .steps-section__item, .layout-thumb, .btn-signup-now');
        }
      }, [
      m("div", [
        m("figure", { class: "center-block display-table mboth-60 intro-section__logo" }, [
          m("a", { href:"/", oncreate: m.route.link }, [
            m("img", { src: "/images/logo-zinkroo--white.png", width: "400", class:"img-responsive" }),
          ]),
          m("h4", { class: "text-right text-white weight-regular" }, "live media sync")
        ])
      ]),
      m("section", [
        m(".container", [
          m(".col-sm-6 center-block contact-us mb-95", [
            m("h2", { class: "text-white text-center mb-55 mt-0" }, "Get In Touch"),
            m("p", { class: "text-white text-left mb-55 contact-us__description" }, "Zinkroo is still a Beta Tool and has to be improved. Let us know if you have some question, advice or anything that could help our improvement, or just to have a talk")
            // m(".row mb-25", [
            //   m(".col-sm-2", [
            //     m("label", { class: "text-white mb-0" }, "Call: ")
            //   ]),
            //   m(".col-sm-10", [
            //     m("p", { class: "text-white weight-bold mb-0" }, "+39 02 8135947")
            //   ])
            // ]),
            // m(".row mb-25", [
            //   m(".col-sm-2", [
            //     m("label", { class: "text-white mb-0" }, "Fax: ")
            //   ]),
            //   m(".col-sm-10", [
            //     m("p", { class: "text-white weight-bold mb-0" }, "+39 02 87382752")
            //   ])
            // ]),
            // m(".row mb-25", [
            //   m(".col-sm-2", [
            //     m("label", { class: "text-white mb-0" }, "Email: ")
            //   ]),
            //   m(".col-sm-10", [
            //     m("p", { class: "text-white weight-bold mb-0" }, "info@axenso.com")
            //   ])
            // ]),
            // m(".row", [
            //   m(".col-sm-2", [
            //     m("label", { class: "text-white mb-0" }, "Visit: ")
            //   ]),
            //   m(".col-sm-10", [
            //     m("p", { class: "text-white weight-bold mb-0" }, "Axenso Srl - Via Walter Tobagi 8/A 20143 Milano")
            //   ])
            // ])
          ])
        ])
        // m("figure", [
        //   m("img", { src: "/images/maps.jpg", class: "img-responsive" })
        // ])
      ]),
      m("section", { class: "bg-white pb-80 pt-80" }, [
        m(".container", [
          m("div", {
            class: "alert alert-success " + (state.showMsg() ? "show" : "hidden"),
            role: "alert"
          }, "Thanks for contacting us. We'll reply as soon as possible."),
          m("form", { id: "contact-form" }, [
            m(".row", [
              m(".col-sm-6", [
                m(textField, {
                  type: 'text',
                  class: 'form-control',
                  placeholder: 'Name',
                  id: 'name',
                  oninput: m.withAttr("value", Contact.model.name),
                  value: Contact.model.name(),
                  error: state.errors()['name']
                })
              ]),
              m(".col-sm-6", [
                m(textField, {
                  type: 'email',
                  class: 'form-control',
                  placeholder: 'Email',
                  id: 'email',
                  oninput: m.withAttr("value", Contact.model.email),
                  value: Contact.model.email(),
                  error: state.errors()['email']
                })
              ])
            ]),
            m(textField, {
              field: 'textarea',
              class: 'form-control mb-80',
              rows: '4',
              placeholder: 'Message',
              id: 'message',
              oninput: m.withAttr("value", Contact.model.message),
              value: Contact.model.message(),
              error: state.errors()['message']
            }),
            m(".text-center mt-40", [
              m(feedbackButton, {
                action: state.sendMessage,
                label: 'Send message',
                feedbackLabel: 'Sending...',
                disabled: state.showMsg(),
                style: 'btn btn-primary btn-lg text-uppercase'
              })
            ])
          ])
        ])
      ]),
      m("footer", { class: "bg-main text-center pboth-40" }, [
        m("p", { class: "mb-0 text-white" }, [
          "©2017 ",
          m("a", { href: "http://axenso.com/", target: "_blank", class: "weight-strong text-white" }, "Axenso "),
          "all Rights Reserved. ",
          m("a", { href: "/privacy", class: "weight-strong text-white", oncreate: m.route.link }, "Privacy"),
          " and ",
          m("a", { href: "/terms", class: "weight-strong text-white", oncreate: m.route.link }, "Terms")
        ])
      ])
    ])
  }
}

export default contactUs;
