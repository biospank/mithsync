import Session from "../../models/session";

var landingpage = {
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
      m("section", { class: "bg-main pt-30 intro-section" }, [
        m(".container", [
          m("header", { class: "clearfix" }, [
            m(".navbar-header", { class: "hidden-xs" }, [
              m("a", { class: "navbar-brand pboth-0" }, [
                m("img", { src: "/images/logo-zinkroo--white.png", width: "170", class: "img-responsive" })
              ])
            ]),
            m(".pull-right intro-section__buttons", [
              m("a", { href: "/signin", config: m.route, class: "btn btn-link btn-lg text-white" }, "Login"),
              m("a", { href: "/signup", config: m.route, class: "btn btn-lg bg-white text-color--main" }, "Signup")
            ])
          ]),
          m("figure", { class: "center-block display-table mboth-60 intro-section__logo" }, [
            m("img", { src: "/images/logo-zinkroo--white.png", class: "img-responsive" }),
            m("h4", { class: "text-right text-white weight-regular" }, "live media sync")
          ]),
          m("h2", { class: "text-center text-white weight-light mb-60 pb-60" }, m.trust("The perfect way to sync and embed your video<br>and images, <span class='weight-strong'>everywhere!</span>")),
          m("figure", { class: "images-intro" }, [
            m("img", { src: "/images/intro-img.png", class: "img-responsive center-block" })
          ])
        ])
      ]),
      m("section", { class: "steps-section bg-white" }, [
        m(".container", [
          m("header", { class: "text-center mb-50" }, [
            m("h1", { class: "text-color--main weight-bold mt-0 mb-25 steps-section__title" }, "Just a while to be online!"),
            m("p", { class: "weight-light steps-section__description" }, m.trust("Create a project, add new video link from Youtube o Vimeo, upload your<br>image gallery, sync all, choose template and copy the embed code in<br>your post or website"))
          ]),
          m(".row", [
            m(".col-xs-12 col-sm-4 col-md-4 col-lg-4", [
              m("div", { class: "steps-section__item mb-50" }, [
                m("figure", { class: "steps-section__item--image block-relative mb-20" }, [
                  m("img", { src: "/images/step-1.jpg", class: "img-responsive" }),
                  m("span", { class: "widget-step text-center pt-5 weight-strong" }, "1")
                ]),
                m("h4", { class: "steps-section__item--title weight-strong text-color--main text-center mb-20" }, "Create new project"),
                m("p", { class: "text-center steps-section__item--description" }, "Log in and create a new project. A project means a group of related videos (event, collection, course). Creating a project helps you to get organized your synced videos")
              ])
            ]),
            m(".col-xs-12 col-sm-4 col-md-4 col-lg-4", [
              m("div", { class: "steps-section__item mb-50" }, [
                m("figure", { class: "steps-section__item--image block-relative mb-20" }, [
                  m("img", { src: "/images/thumbs-step.jpg", class: "img-responsive" }),
                  m("span", { class: "widget-step text-center pt-5 weight-strong" }, "2")
                ]),
                m("h4", { class: "steps-section__item--title weight-strong text-color--main text-center mb-20" }, "Grab video link"),
                m("p", { class: "text-center steps-section__item--description" }, "Copy the link to your video directly from Youtube or Vimeo and paste it into the Zinkroo video info tab")
              ])
            ]),
            m(".col-xs-12 col-sm-4 col-md-4 col-lg-4", [
              m("div", { class: "steps-section__item mb-50" }, [
                m("figure", { class: "steps-section__item--image block-relative mb-20" }, [
                  m("img", { src: "/images/step-3.jpg", class: "img-responsive" }),
                  m("span", { class: "widget-step text-center pt-5 weight-strong" }, "3")
                ]),
                m("h4", { class: "steps-section__item--title weight-strong text-color--main text-center mb-20" }, "Upload images"),
                m("p", { class: "text-center steps-section__item--description" }, "Prepare your images in the suggested format and drop them, up to 20 at once, into the Zinkroo Library tab")
              ])
            ]),
            m(".col-xs-12 col-sm-4 col-md-4 col-lg-4", [
              m("div", { class: "steps-section__item mb-50" }, [
                m("figure", { class: "steps-section__item--image block-relative mb-20" }, [
                  m("img", { src: "/images/step-4.jpg", class: "img-responsive" }),
                  m("span", { class: "widget-step text-center pt-5 weight-strong" }, "4")
                ]),
                m("h4", { class: "steps-section__item--title weight-strong text-color--main text-center mb-20" }, "Sync video and images"),
                m("p", { class: "text-center steps-section__item--description" }, "You’re now ready to start using zinkroo. Add all time marker desired by clicking on “Add new slide” button and adjust them using your keyboard")
              ])
            ]),
            m(".col-xs-12 col-sm-4 col-md-4 col-lg-4", [
              m("div", { class: "steps-section__item mb-50" }, [
                m("figure", { class: "steps-section__item--image block-relative mb-20" }, [
                  m("img", { src: "/images/thumbs-step.jpg", class: "img-responsive" }),
                  m("span", { class: "widget-step text-center pt-5 weight-strong" }, "5")
                ]),
                m("h4", { class: "steps-section__item--title weight-strong text-color--main text-center mb-20" }, "Choose template"),
                m("p", { class: "text-center steps-section__item--description" }, "Almost done. Choose “Layout” tab and select your preferred template. Click “Publish” to save it. For seeing a preview click “Show Preview” button")
              ])
            ]),
            m(".col-xs-12 col-sm-4 col-md-4 col-lg-4", [
              m("div", { class: "steps-section__item mb-50" }, [
                m("figure", { class: "steps-section__item--image block-relative mb-20" }, [
                  m("img", { src: "/images/step-6.jpg", class: "img-responsive" }),
                  m("span", { class: "widget-step text-center pt-5 weight-strong" }, "6")
                ]),
                m("h4", { class: "steps-section__item--title weight-strong text-color--main text-center mb-20" }, "Copy embed code in your post"),
                m("p", { class: "text-center steps-section__item--description" }, "You’re now ready to publish your ZInkroo everywhere. Choose “Info” tab, check title and description, copy embed code in your site or blog")
              ])
            ])
          ])
        ])
      ]),
      m("section", { class: "bg-main layouts-section" }, [
        m(".container", [
          m("header", { class: "text-center mb-100" }, [
            m("h1", { class: "text-white weight-strong mt-0 mb-25" }, "Templates ready to be used"),
            m("p", { class: "text-white weight-light layouts-section__description" }, m.trust("Zinkroo offers three different kinds of template. Choose your favourite<br>to personalize your own output"))
          ]),
          m(".row", [
            m(".col-xs-12 col-sm-4 col-md-4 col-lg-4", [
              m("figure", { class: "layout-thumb" }, [
                m("img", { class: "img-responsive", src: "images/layout-1.png" })
              ])
            ]),
            m(".col-xs-12 col-sm-4 col-md-4 col-lg-4", [
              m("figure", { class: "layout-thumb" }, [
                m("img", { class: "img-responsive", src: "images/layout-2.png" })
              ])
            ]),
            m(".col-xs-12 col-sm-4 col-md-4 col-lg-4", [
              m("figure", { class: "layout-thumb" }, [
                m("img", { class: "img-responsive", src: "images/layout-3.png" })
              ])
            ])
          ])
        ])
      ]),
      m("section", { class: "text-center pboth-100 start-now-section bg-white" }, [
        m(".container", [
          m("header", { class: "mb-100" }, [
            m("h1", { class: "text-color--main weight-bold mt-0 start-now-section__title mb-25" }, "Get started now"),
            m("p", { class: "start-now-section__description weight-light" }, m.trust("Zinkroo gives you an easier and faster solution. Change your way to<br>work. Try it and give us your opinion"))
          ]),
          m("a", { class: "btn btn-primary btn-lg btn-signup-now pboth-40", href: "/signup", config: m.route }, "SIGN UP FOR FREE")
        ])
      ]),
      m("footer", { class: "bg-main text-center pboth-40" }, [
        m("p", { class: "mb-0 text-white" }, m.trust("©2017 <strong>Axenso</strong> all Rights Reserved"))
      ])
    ])
  }
}

export default landingpage;
