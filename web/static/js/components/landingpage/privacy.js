import Session from "../../models/session";

var privacyPolicy = {
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
      m("section", { class: "bg-main pboth-30 intro-section" }, [
        m(".container", [
          m("header", { class: "clearfix" }, [
            m(".navbar-header", { class: "hidden-xs" }, [
              m("a", { href: "/", class: "navbar-brand pboth-0", config: m.route }, [
                m("img", { src: "/images/logo-zinkroo--white.png", width: "170", class: "img-responsive" })
              ])
            ]),
            m(".pull-right intro-section__buttons", [
              m("a", { href: "/signin", config: m.route, class: "btn btn-link btn-lg text-white" }, "Login"),
              m("a", { href: "/signup", config: m.route, class: "btn btn-lg bg-white text-color--main" }, "Sign up")
            ])
          ])
        ])
      ]),
      m("section", { class: "bg-white pboth-50" }, [
        m(".container", [
          m(".col-xs-12", [
            m("h3", { class: "mt-0 mb-20 text-color--main" }, "Privacy Policy"),
            m("p.text-dark--grey", "We are committed to safeguarding the privacy of our website visitors; this policy sets out how we will treat your personal information."),
            m("p.text-dark--grey", "Our website uses cookies. By using our website and agreeing to this policy, you consent to our use of cookies in accordance with the terms of this policy."),
            m("h4", { class: "mt-30 text-color--main" }, { class: "mt-30" }, "(1) What information do we collect?"),
            m("p.text-dark--grey", "We may collect, store and use the following kinds of personal information:"),
            m("ul", { class: "list-unstyled" }, [
              m("li", "(a) information about your computer and about your visits to and use of this website (including your IP address, geographical location, browser type and version, operating system, referral source, length of visit, page views, website navigation);"),
              m("li", "(b) information relating to any transactions carried out between you and us on or in relation to this website, including information relating to any purchases you make of our goods or services);"),
              m("li", "(c) information that you provide to us for the purpose of registering with us;"),
              m("li", "(d) information that you provide to us for the purpose of subscribing to our website services, email notifications and/or newsletters;"),
              m("li", "(e) any other information that you choose to send to us;")
            ]),
            m("h4", { class: "mt-30 text-color--main" }, "(2) Cookies"),
            m("p.text-dark--grey", "A cookie consists of information sent by a web server to a web browser, and stored by the browser. The information is then sent back to the server each time the browser requests a page from the server. This enables the web server to identify and track the web browser."),
            m("p.text-dark--grey", "We may use “session” cookies and “persistent” cookies on the website. We will use the session cookies to: keep track of you whilst you navigate the website. We will use the persistent cookies to: enable our website to recognise you when you visit."),
            m("p.text-dark--grey", "Session cookies will be deleted from your computer when you close your browser. Persistent cookies will remain stored on your computer until deleted, or until they reach a specified expiry date."),
            m("p.text-dark--grey", "We use Google Analytics to analyse the use of this website. Google Analytics generates statistical and other information about website use by means of cookies, which are stored on users' computers. The information generated relating to our website is used to create reports about the use of the website. Google will store this information. Google's privacy policy is available at: http://www.google.com/privacypolicy.html."),
            m("p.text-dark--grey", "Most browsers allow you to reject all cookies, whilst some browsers allow you to reject just third party cookies. For example, in Internet Explorer you can refuse all cookies by clicking “Tools”, “Internet Options”, “Privacy”, and selecting “Block all cookies” using the sliding selector. Blocking all cookies will, however, have a negative impact upon the usability of many websites[, including this one].]"),
            m("h4", { class: "mt-30 text-color--main" }, "(3) Using your personal information"),
            m("p.text-dark--grey", "Personal information submitted to us via this website will be used for the purposes specified in this privacy policy or in relevant parts of the website."),
            m("p.text-dark--grey", "We may use your personal information to:"),
            m("ul", { class: "list-unstyled" }, [
              m("li", "(a) administer the website;"),
              m("li", "(b) improve your browsing experience by personalising the website;"),
              m("li", "(c) enable your use of the services available on the website;"),
              m("li", "(d) send to you goods purchased via the website, and supply to you services purchased via the website;"),
              m("li", "(e) send statements and invoices to you, and collect payments from you;"),
              m("li", "(f) send you general (non-marketing) commercial communications;"),
              m("li", "(g) send you email notifications which you have specifically requested;"),
              m("li", "(h) send to you our newsletter and other marketing communications relating to our business which we think may be of interest to you by post or, where you have specifically agreed to this, by email or similar technology (you can inform us at any time if you no longer require marketing communications);"),
              m("li", "(i) provide third parties with statistical information about our users – but this information will not be used to identify any individual user;]"),
              m("li", "(j) deal with enquiries and complaints made by or about you relating to the website; and]")
            ]),
            m("p.text-dark--grey", "We will not without your express consent provide your personal information to any third parties for the purpose of direct marketing."),
            m("h4", { class: "mt-30 text-color--main" }, "(4) Disclosures"),
            m("p.text-dark--grey", "We may disclose information about you to any of our employees, officers, agents, suppliers or subcontractors insofar as reasonably necessary for the purposes as set out in this privacy policy."),
            m("p.text-dark--grey", "In addition, we may disclose your personal information:"),
            m("ul", { class: "list-unstyled" }, [
              m("li", "(a) to the extent that we are required to do so by law;"),
              m("li", "(b) in connection with any legal proceedings or prospective legal proceedings;"),
              m("li", "(c) in order to establish, exercise or defend our legal rights (including providing information to others for the purposes of fraud prevention and reducing credit risk);")
            ]),
            m("p.text-dark--grey", "Except as provided in this privacy policy, we will not provide your information to third parties."),
            m("h4", { class: "mt-30 text-color--main" }, "(6) Security of your personal information"),
            m("p.text-dark--grey", "We will take reasonable technical and organisational precautions to prevent the loss, misuse or alteration of your personal information."),
            m("p.text-dark--grey", "Of course, data transmission over the internet is inherently insecure, and we cannot guarantee the security of data sent over the internet."),
            m("p.text-dark--grey", "You are responsible for keeping your password and user details confidential. We will not ask you for your password (except when you log in to the website)."),
            m("h4", { class: "mt-30 text-color--main" }, "(7) Policy amendments"),
            m("p.text-dark--grey", "We may update this privacy policy from time-to-time by posting a new version on our website. You should check this page occasionally to ensure you are happy with any changes."),
            m("p.text-dark--grey", "We may also notify you of changes to our privacy policy by email."),
            m("h4", { class: "mt-30 text-color--main" }, "(8) Your rights"),
            m("p.text-dark--grey", "You may instruct us not to process your personal information for marketing purposes by email at any time. In practice, you will usually either expressly agree in advance to our use of your personal information for marketing purposes, or we will provide you with an opportunity to opt-out of the use of your personal information for marketing purposes."),
            m("h4", { class: "mt-30 text-color--main" }, "(9) Third party websites"),
            m("p.text-dark--grey", "The website contains links to other websites. We are not responsible for the privacy policies or practices of third party websites."),
            m("h4", { class: "mt-30 text-color--main" }, "(10) Updating information"),
            m("p.text-dark--grey", "Please let us know if the personal information which we hold about you needs to be corrected or updated."),
            m("h4", { class: "mt-30 text-color--main" }, "(11) Contact"),
            m("p.text-dark--grey", "If you have any questions about this privacy policy or our treatment of your personal information, please write to us by email to privacy@axenso.com or by post to axenso, via W. Tobagi 8/A, 20143 Milan, Italy."),
            m("h4", { class: "mt-30 text-color--main" }, "(12) Data controller"),
            m("p.text-dark--grey", "The data controller responsible in respect of the information collected on this website is Axedyn srl.")
          ])
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

export default privacyPolicy;
