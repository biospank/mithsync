import Session from "../../models/session";

var terms = {
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
            m("h3", { class: "mt-0 mb-20 text-color--main" }, "Terms and Conditions"),
            m("h4", { class: "mt-30 text-color--main" }, "Introduction"),
            m("p.text-dark--grey", "These terms and conditions govern your use of this website; by using this website, you accept these terms and conditions in full. If you disagree with these terms and conditions or any part of these terms and conditions, you must not use this website."),
            m("p.text-dark--grey", "You must be at least 18 years of age to use this website. By using this website and by agreeing to these terms and conditions you warrant and represent that you are at least 18]years of age."),
            m("p.text-dark--grey", "This website uses cookies. By using this website and agreeing to these terms and conditions, you consent to our zinkroo's use of cookies in accordance with the terms of zinkroo's privacy policy / cookies policy."),
            m("h4", { class: "mt-30 text-color--main" }, "License to use website"),
            m("p.text-dark--grey", "Unless otherwise stated, zinkroo and/or its licensors own the intellectual property rights in the website and material on the website. Subject to the license below, all these intellectual property rights are reserved."),
            m("p.text-dark--grey", "You may view, download for caching purposes only, and print pages from the website for your own personal use, subject to the restrictions set out below and elsewhere in these terms and conditions."),
            m("p.text-dark--grey", "You must not:"),
            m("ul", { class: "list-unstyled" }, [
              m("li", "republish material from this website (including republication on another website);"),
              m("li", "sell, rent or sub-license material from the website;"),
              m("li", "show any material from the website in public;"),
              m("li", "reproduce, duplicate, copy or otherwise exploit material on this website for a commercial purpose;"),
              m("li", "edit or otherwise modify any material on the website;"),
              m("li", "redistribute material from this website [except for content specifically and expressly made available for redistribution].")
            ]),
            m("p.text-dark--grey", "Acceptable use"),
            m("p.text-dark--grey", "You must not use this website in any way that causes, or may cause, damage to the website or impairment of the availability or accessibility of the website; or in any way which is unlawful, illegal, fraudulent or harmful, or in connection with any unlawful, illegal, fraudulent or harmful purpose or activity."),
            m("p.text-dark--grey", "You must not use this website to copy, store, host, transmit, send, use, publish or distribute any material which is linked to any spyware, computer virus, Trojan horse, worm, keystroke logger, rootkit or other malicious computer software."),
            m("p.text-dark--grey", "You must not conduct any systematic or automated data collection activities (including without limitation scraping, data mining, data extraction and data harvesting) on or in relation to this website without zinkroo’s express written consent."),
            m("p.text-dark--grey", "You must not use this website to transmit or send unsolicited commercial communications."),
            m("p.text-dark--grey", "You must not use this website for any purposes related to marketing without zinkroo’s express written consent."),
            m("h4", { class: "mt-30 text-color--main" }, "User content"),
            m("p.text-dark--grey", "In these terms and conditions, “your user content” means material (including without limitation text, images, audio material, video material and audio-visual material) that you submit to this website, for whatever purpose."),
            m("p.text-dark--grey", "You grant to zinkroo a worldwide, irrevocable, non-exclusive, royalty-free license to use, reproduce, adapt, publish, translate and distribute your user content in any existing or future media. You also grant to zinkroo the right to sub-license these rights, and the right to bring an action for infringement of these rights."),
            m("p.text-dark--grey", "Your user content must not be illegal or unlawful, must not infringe any third party's legal rights, and must not be capable of giving rise to legal action whether against you or zinkroo or a third party (in each case under any applicable law)."),
            m("p.text-dark--grey", "You must not submit any user content to the website that is or has ever been the subject of any threatened or actual legal proceedings or other similar complaint."),
            m("p.text-dark--grey", "Zinkroo reserves the right to edit or remove any material submitted to this website, or stored on zinkroo servers, or hosted or published upon this website."),
            m("p.text-dark--grey", "Notwithstanding zinkroo’s rights under these terms and conditions in relation to user content, zinkroo does not undertake to monitor the submission of such content to, or the publication of such content on, this website."),
            m("h4", { class: "mt-30 text-color--main" }, "No warranties"),
            m("p.text-dark--grey", "This website is provided “as is” without any representations or warranties, express or implied. Zinkroo makes no representations or warranties in relation to this website or the information and materials provided on this website."),
            m("p.text-dark--grey", "Without prejudice to the generality of the foregoing paragraph, zinkroo does not warrant that:"),
            m("p.text-dark--grey", "this website will be constantly available, or available at all; or the information on this website is complete, true, accurate or non-misleading."),
            m("p.text-dark--grey", "Nothing on this website constitutes, or is meant to constitute, advice of any kind."),
            m("h4", { class: "mt-30 text-color--main" }, "Limitations of liability"),
            m("p.text-dark--grey", "Zinkroo will not be liable to you (whether under the law of contact, the law of torts or otherwise) in relation to the contents of, or use of, or otherwise in connection with, this website:"),
            m("p.text-dark--grey", "for any direct loss; for any indirect, special or consequential loss; or for any business losses, loss of revenue, income, profits or anticipated savings, loss of contracts or business relationships, loss of reputation or goodwill, or loss or corruption of information or data."),
            m("p.text-dark--grey", "These limitations of liability apply even if zinkroo has been expressly advised of the potential loss."),
            m("h4", { class: "mt-30 text-color--main" }, "Exceptions"),
            m("p.text-dark--grey", "Nothing in these terms and conditions will exclude or limit any warranty implied by law that it would be unlawful to exclude or limit; and nothing in the terms and conditions will exclude or limit zinkroo liability in respect of any:"),
            m("p.text-dark--grey", "death or personal injury caused by zinkroo’s negligence; fraud or fraudulent misrepresentation on the part of zinkroo; or matter which it would be illegal or unlawful for zinkroo to exclude or limit, or to attempt or purport to exclude or limit, its liability."),
            m("h4", { class: "mt-30 text-color--main" }, "Reasonableness"),
            m("p.text-dark--grey", "By using this website, you agree that the exclusions and limitations of liability set out in these terms and conditions are reasonable. If you do not think they are reasonable, you must not use this website."),
            m("h4", { class: "mt-30 text-color--main" }, "Other parties"),
            m("p.text-dark--grey", "Zinkroo has an interest in limiting the personal liability of its officers and employees. You agree that you will not bring any claim personally against zinkroo’s officers or employees in respect of any losses you suffer in connection with the website."),
            m("p.text-dark--grey", "You agree that the limitations of warranties and liability set out in this website disclaimer will protect zinkroo’s officers, employees, agents, subsidiaries, successors, assigns and sub-contractors as well as zinkroo."),
            m("h4", { class: "mt-30 text-color--main" }, "Unenforceable provisions"),
            m("p.text-dark--grey", "If any provision of this website disclaimer is, or is found to be, unenforceable under applicable law, that will not affect the enforceability of the other provisions of this website disclaimer."),
            m("h4", { class: "mt-30 text-color--main" }, "Indemnity"),
            m("p.text-dark--grey", "You hereby indemnify zinkroo and undertake to keep zinkroo indemnified against any losses, damages, costs, liabilities and expenses (including without limitation legal expenses and any amounts paid by zinkroo to a third party in settlement of a claim or dispute on the advice of zinkroo legal advisers) incurred or suffered by zinkroo arising out of any breach by you of any provision of these terms and conditions."),
            m("h4", { class: "mt-30 text-color--main" }, "Breaches of these terms and conditions"),
            m("p.text-dark--grey", "Without prejudice to zinkroo’s other rights under these terms and conditions, if you breach these terms and conditions in any way, zinkroo may take such action as zinkroo deems appropriate to deal with the breach, including suspending your access to the website, prohibiting you from accessing the website, blocking computers using your IP address from accessing the website, contacting your internet service provider to request that they block your access to the website and/or bringing court proceedings against you."),
            m("h4", { class: "mt-30 text-color--main" }, "Variation"),
            m("p.text-dark--grey", "Zinkroo may revise these terms and conditions from time-to-time. Revised terms and conditions will apply to the use of this website from the date of the publication of the revised terms and conditions on this website. Please check this page regularly to ensure you are familiar with the current version."),
            m("h4", { class: "mt-30 text-color--main" }, "Assignment"),
            m("p.text-dark--grey", "Zinkroo may transfer, sub-contract or otherwise deal with zinkroo’s rights and/or obligations under these terms and conditions without notifying you or obtaining your consent."),
            m("p.text-dark--grey", "You may not transfer, sub-contract or otherwise deal with your rights and/or obligations under these terms and conditions."),
            m("h4", { class: "mt-30 text-color--main" }, "Severability"),
            m("p.text-dark--grey", "If a provision of these terms and conditions is determined by any court or other competent authority to be unlawful and/or unenforceable, the other provisions will continue in effect. If any unlawful and/or unenforceable provision would be lawful or enforceable if part of it were deleted, that part will be deemed to be deleted, and the rest of the provision will continue in effect."),
            m("h4", { class: "mt-30 text-color--main" }, "Entire agreement"),
            m("p.text-dark--grey", "These terms and conditions constitute the entire agreement between you and zinkroo in relation to your use of this website, and supersede all previous agreements in respect of your use of this website."),
            m("h4", { class: "mt-30 text-color--main" }, "Law and jurisdiction"),
            m("p.text-dark--grey", "These terms and conditions will be governed by and construed in accordance with Italian law, and any disputes relating to these terms and conditions will be subject to the Milan jurisdiction."),
            m("h4", { class: "mt-30 text-color--main" }, "Registrations and authorisations"),
            m("p.text-dark--grey", "Zinkroo is registered with Axedyn srl, registered in Milan, via Walter Tobagi 8/A, Italy."),
            m("p.text-dark--grey", "You can contact zinkroo by email to customercare@zinkroo.com.")
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

export default terms;
