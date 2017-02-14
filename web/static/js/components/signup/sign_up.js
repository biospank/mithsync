import mixinLayout from "../layout/mixin_layout";
import textField from "../widgets/text_field";
import feedbackButton from "../widgets/feedback_button";
import Registration from "../../models/registration";

var signUp = (function() {
  var content = function(ctrl) {
    return [
      m(".pb-60", [
        m("figure", { class: "center-block display-table mboth-60" }, [
          m("a", { href:"/", config: m.route }, [
            m("img", { src: "/images/logo-zinkroo--white.png", width: "400", class:"img-responsive" }),
          ]),
          m("h4", { class: "text-right text-white weight-regular mb-0" }, "live media sync")
        ]),
        m("h2", { class: "mt-0 mb-60 text-center text-white" }, "Create your account: you can get it for free!"),
        m(".card-wrapper sign center-block p-all-side-75", [
          m("p", { class: "text-dark--grey mb-45" }, "Already a member. ", [
            m("a", { href: "/signin", config: m.route, class: "btn-link" }, "Login!")
          ]),
          m("form", { class: "" }, [
            m.component(textField, {
              type: 'email',
              //placeholder: 'Enter your Email',
              id: 'email',
              dataLabel: 'Email',
              oninput: m.withAttr("value", Registration.model.email),
              error: ctrl.errors()['email'],
              fieldType: "",
              icon: "fa fa-user",
              labelStyles: "text-dark--grey mb-15",
              inputSize: "input-lg reset-boxshadow reset-radius--2"
            }),
            m.component(textField, {
              type: 'password',
              //placeholder: 'Enter Password',
              id: 'password',
              dataLabel: 'Password',
              oninput: m.withAttr("value", Registration.model.password),
              error: ctrl.errors()['password'],
              fieldType: "",
              icon: "fa fa-unlock-alt",
              labelStyles: "text-dark--grey mb-15",
              inputSize: "input-lg reset-boxshadow reset-radius--2"
            }),
            m.component(textField, {
              type: 'password',
              //placeholder: 'Enter Password',
              id: 'password_confirmation',
              dataLabel: 'Confirm Password',
              oninput: m.withAttr("value", Registration.model.password_confirmation),
              error: ctrl.errors()['password_confirmation'],
              fieldType: "",
              icon: "fa fa-unlock-alt",
              labelStyles: "text-dark--grey mb-15",
              inputSize: "input-lg reset-boxshadow reset-radius--2"
            }),
            m(".magic-checkbox--big mt-55", [
              m("input", {
                id: "accept_terms_and_conditions",
                class: "magic-checkbox",
                type: "checkbox",
                name: "accept_terms_and_conditions",
                onclick: m.withAttr("checked", Registration.model.accept_terms_and_conditions),
                checked: Registration.model.accept_terms_and_conditions()
              }),
              m("label", { for: "accept_terms_and_conditions", class: "weight-light" }, [
                "I accept the Terms of Service. ",
                m("a", {
                  class: "btn-link",
                  onclick: function() {
                    swal({
                      width: '650px',
                      confirmButtonText: 'I got it!',
                      //title: 'Testo',
                      text: "<div class='text-left'>" +
                              "<label>TERMS AND CONDITIONS</label><br><br>" +
                              "Introduction<br><br>" +
                              "These terms and conditions govern your use of this website; by using this website, you accept these terms and conditions in full. If you disagree with these terms and conditions or any part of these terms and conditions, you must not use this website.<br><br>" +
                              "You must be at least 18 years of age to use this website. By using this website and by agreeing to these terms and conditions you warrant and represent that you are at least 18]years of age.<br><br>" +
                              "This website uses cookies. By using this website and agreeing to these terms and conditions, you consent to our zinkroo's use of cookies in accordance with the terms of zinkroo's privacy policy / cookies policy.<br><br>" +
                              "License to use website<br><br>" +
                              "Unless otherwise stated, zinkroo and/or its licensors own the intellectual property rights in the website and material on the website. Subject to the license below, all these intellectual property rights are reserved.<br><br>" +
                              "You may view, download for caching purposes only, and print pages from the website for your own personal use, subject to the restrictions set out below and elsewhere in these terms and conditions.<br><br>" +
                              "You must not:" +
                              "<ul class='list-unstyled'>" +
                                "<li>republish material from this website (including republication on another website);</li>" +
                                "<li>sell, rent or sub-license material from the website;</li>" +
                                "<li>show any material from the website in public;</li>" +
                                "<li>reproduce, duplicate, copy or otherwise exploit material on this website for a commercial purpose;</li>" +
                                "<li>edit or otherwise modify any material on the website;</li>" +
                                "<li>redistribute material from this website [except for content specifically and expressly made available for redistribution].</li>" +
                              "</ul>" +
                              "Acceptable use<br><br>" +
                              "You must not use this website in any way that causes, or may cause, damage to the website or impairment of the availability or accessibility of the website; or in any way which is unlawful, illegal, fraudulent or harmful, or in connection with any unlawful, illegal, fraudulent or harmful purpose or activity.<br><br>" +
                              "You must not use this website to copy, store, host, transmit, send, use, publish or distribute any material which is linked to any spyware, computer virus, Trojan horse, worm, keystroke logger, rootkit or other malicious computer software.<br><br>" +
                              "You must not conduct any systematic or automated data collection activities (including without limitation scraping, data mining, data extraction and data harvesting) on or in relation to this website without zinkroo’s express written consent.<br><br>" +
                              "You must not use this website to transmit or send unsolicited commercial communications.<br><br>" +
                              "You must not use this website for any purposes related to marketing without zinkroo’s express written consent.<br><br>" +
                              "User content<br><br>" +
                              "In these terms and conditions, “your user content” means material (including without limitation text, images, audio material, video material and audio-visual material) that you submit to this website, for whatever purpose.<br><br>" +
                              "You grant to zinkroo a worldwide, irrevocable, non-exclusive, royalty-free license to use, reproduce, adapt, publish, translate and distribute your user content in any existing or future media. You also grant to zinkroo the right to sub-license these rights, and the right to bring an action for infringement of these rights.<br><br>" +
                              "Your user content must not be illegal or unlawful, must not infringe any third party's legal rights, and must not be capable of giving rise to legal action whether against you or zinkroo or a third party (in each case under any applicable law).<br><br>" +
                              "You must not submit any user content to the website that is or has ever been the subject of any threatened or actual legal proceedings or other similar complaint.<br><br>" +
                              "Zinkroo reserves the right to edit or remove any material submitted to this website, or stored on zinkroo servers, or hosted or published upon this website.<br><br>" +
                              "Notwithstanding zinkroo’s rights under these terms and conditions in relation to user content, zinkroo does not undertake to monitor the submission of such content to, or the publication of such content on, this website.<br><br>" +
                              "No warranties<br><br>" +
                              "This website is provided “as is” without any representations or warranties, express or implied. Zinkroo makes no representations or warranties in relation to this website or the information and materials provided on this website.<br><br>" +
                              "Without prejudice to the generality of the foregoing paragraph, zinkroo does not warrant that:<br><br>" +
                              "this website will be constantly available, or available at all; or the information on this website is complete, true, accurate or non-misleading.<br><br>" +
                              "Nothing on this website constitutes, or is meant to constitute, advice of any kind.<br><br>" +
                              "Limitations of liability<br><br>" +
                              "Zinkroo will not be liable to you (whether under the law of contact, the law of torts or otherwise) in relation to the contents of, or use of, or otherwise in connection with, this website:" +
                              "<ul class='list-unstyled text-left'>" +
                                "<li>for any direct loss;</li>" +
                                "<li>for any indirect, special or consequential loss;</li>" +
                                "<li>or for any business losses, loss of revenue, income, profits or anticipated savings, loss of contracts or business relationships, loss of reputation or goodwill, or loss or corruption of information or data.</li>" +
                              "</ul>" +
                              "These limitations of liability apply even if zinkroo has been expressly advised of the potential loss.<br><br>" +
                              "Exceptions<br><br>" +
                              "Nothing in these terms and conditions will exclude or limit any warranty implied by law that it would be unlawful to exclude or limit; and nothing in the terms and conditions will exclude or limit zinkroo liability in respect of any:<br><br>" +
                              "<ul class='list-unstyled text-left'>" +
                                "<li>death or personal injury caused by zinkroo’s negligence;</li>" +
                                "<li>fraud or fraudulent misrepresentation on the part of zinkroo;</li>" +
                                "<li>or matter which it would be illegal or unlawful for zinkroo to exclude or limit, or to attempt or purport to exclude or limit, its liability.</li>" +
                              "</ul>" +
                              "Reasonableness<br><br>" +
                              "By using this website, you agree that the exclusions and limitations of liability set out in these terms and conditions are reasonable. If you do not think they are reasonable, you must not use this website.<br><br>" +
                              "Other parties<br><br>" +
                              "Zinkroo has an interest in limiting the personal liability of its officers and employees. You agree that you will not bring any claim personally against zinkroo’s officers or employees in respect of any losses you suffer in connection with the website.<br><br>" +
                              "You agree that the limitations of warranties and liability set out in this website disclaimer will protect zinkroo’s officers, employees, agents, subsidiaries, successors, assigns and sub-contractors as well as zinkroo.<br><br>" +
                              "Unenforceable provisions<br><br>" +
                              "If any provision of this website disclaimer is, or is found to be, unenforceable under applicable law, that will not affect the enforceability of the other provisions of this website disclaimer.<br><br>" +
                              "Indemnity<br><br>" +
                              "You hereby indemnify zinkroo and undertake to keep zinkroo indemnified against any losses, damages, costs, liabilities and expenses (including without limitation legal expenses and any amounts paid by zinkroo to a third party in settlement of a claim or dispute on the advice of zinkroo legal advisers) incurred or suffered by zinkroo arising out of any breach by you of any provision of these terms and conditions.<br><br>" +
                              "Breaches of these terms and conditions<br><br>" +
                              "Without prejudice to zinkroo’s other rights under these terms and conditions, if you breach these terms and conditions in any way, zinkroo may take such action as zinkroo deems appropriate to deal with the breach, including suspending your access to the website, prohibiting you from accessing the website, blocking computers using your IP address from accessing the website, contacting your internet service provider to request that they block your access to the website and/or bringing court proceedings against you.<br><br>" +
                              "Variation<br><br>" +
                              "Zinkroo may revise these terms and conditions from time-to-time. Revised terms and conditions will apply to the use of this website from the date of the publication of the revised terms and conditions on this website. Please check this page regularly to ensure you are familiar with the current version.<br><br>" +
                              "Assignment<br><br>" +
                              "Zinkroo may transfer, sub-contract or otherwise deal with zinkroo’s rights and/or obligations under these terms and conditions without notifying you or obtaining your consent.<br><br>" +
                              "You may not transfer, sub-contract or otherwise deal with your rights and/or obligations under these terms and conditions.<br><br>" +
                              "Severability<br><br>" +
                              "If a provision of these terms and conditions is determined by any court or other competent authority to be unlawful and/or unenforceable, the other provisions will continue in effect. If any unlawful and/or unenforceable provision would be lawful or enforceable if part of it were deleted, that part will be deemed to be deleted, and the rest of the provision will continue in effect.<br><br>" +
                              "Entire agreement<br><br>" +
                              "These terms and conditions constitute the entire agreement between you and zinkroo in relation to your use of this website, and supersede all previous agreements in respect of your use of this website.<br><br>" +
                              "Law and jurisdiction<br><br>" +
                              "These terms and conditions will be governed by and construed in accordance with Italian law, and any disputes relating to these terms and conditions will be subject to the Milan jurisdiction.<br><br>" +
                              "Registrations and authorisations<br><br>" +
                              "Zinkroo is registered with Axedyn srl, registered in Milan, via Walter Tobagi 8/A, Italy.<br><br>" +
                              "You can contact zinkroo by email to customercare@zinkroo.com." +
                            "</div>"
                    }).catch(swal.noop);
                  }
                }, "Read more"),
                m("p", {
                  class: "error-label " + (ctrl.errors()['accept_terms_and_conditions'] ? "show" : "hidden")
                }, ctrl.errors()['accept_terms_and_conditions'])
              ])
            ]),
            m("div", { class: "text-center" }, [
              m.component(feedbackButton, {
                action: ctrl.createUser,
                label: 'Register',
                feedbackLabel: 'Signing up...',
                style: 'btn btn-primary btn-lg btn-block mt-60'
              })
            ])
          ])
        ])
      ])
    ]
  };

  return {
    controller: function(){
      var ctrl = this;
      ctrl.errors = m.prop({});

      ctrl.createUser = function(args) {
        return Registration.create(args).then(function() {
          m.route("/activate");
        }, function(response) {
          ctrl.errors(response.errors);
        })
      };
    },
    view: mixinLayout(content, 'login')
  };
})();

export default signUp;
