import breadcrumbBar from "./breadcrumb_bar";
import mainNav from "./main_nav";
import topBar from "./top_bar";
import imageLibrary from "../video/library/image_library";
import videoDetail from "../video/info/video_detail";
import videoLayout from "../video/layout/video_layout";

var mixinLayout = function(content, layout) {

  var layouts = {
    login: function(content) {
      return [
        m('main', { class: 'main-container'}, [
          content
        ])
      ]
    },
    standard: function(content) {
      return [
        m.component(topBar),
        m("section", { class: "clearfix", id: "wrapper" }, [
          m("aside", { id: "sidebar-wrapper" }, [
            // m("form", { class: "navbar-form page-search-form" }, [
            //   m(".input-group", [
            //     m("input", { type: "text", class: "form-control", placeholder: "Search" }),
            //     m("span", { class: "input-group-btn" }, [
            //       m("button", { type: "submit", class: "btn btn-none" }, [
            //         m("img", { src: "/images/icons/search.png" })
            //       ])
            //     ])
            //   ])
            // ]),
            m.component(mainNav)
          ]),
          m("section", { id: "page-content-wrapper" }, [
            m.component(breadcrumbBar),
            m("main", { class: "main-container" }, [
              content
            ])
          ])
        ]),
        m("footer", { id: "page-footer" }, [
          m(".container", "© Company 2016. All rights reserved. Terms of Service | Privacy Policy")
        ])
      ]
    },
    edit: function(content) {
      return m(".edit-layout", [
        m.component(topBar),
        m.component(breadcrumbBar),
        m("section", { class: "clearfix", id: "wrapper" }, [
          m("aside", { id: "sidebar-wrapper" }, [
            // m("form", { class: "navbar-form page-search-form" }, [
            //   m(".input-group", [
            //     m("input", { type: "text", class: "form-control", placeholder: "Search" }),
            //     m("span", { class: "input-group-btn" }, [
            //       m("button", { type: "submit", class: "btn btn-none" }, [
            //         m("img", { src: "/images/icons/search.png" })
            //       ])
            //     ])
            //   ])
            // ]),
            m.component(mainNav)
          ]),
          m("section", { id: "page-content-wrapper" }, [
            content
          ]),
          m("aside", { id: "sidebar-video-edit", class: "col-xs-4" }, [
            m("ul", {  class: "nav nav-tabs", role: "tablist" }, [
              m("li", { class: "col-xs-4", role: "presentation" }, [
                m("a", {
                  href: "#info",
                  "aria-controls": "info",
                  role: "tab",
                  "data-toggle": "tab",
                  class: "info"
                }, "Info")
              ]),
              m("li", { class: "col-xs-4", role: "presentation" }, [
                m("a", {
                  href: "#layout",
                  "aria-controls": "layout",
                  role: "tab",
                  "data-toggle": "tab",
                  class: "layout"
                }, "Layout")
              ]),
              m("li", { class: "col-xs-4 active", role: "presentation" }, [
                m("a", {
                  href: "#library",
                  "aria-controls": "library",
                  role: "tab",
                  "data-toggle": "tab",
                  class: "library"
                }, "Library")
              ])
            ]),
            m(".tab-content", [
              m("section", { role: "tabpanel", class: "tab-pane", id: "info" }, [
                m(videoDetail)
              ]),
              m("section", { role: "tabpanel", class: "tab-pane", id: "layout" }, [
                m(videoLayout)
              ]),
              m("section", { role: "tabpanel", class: "tab-pane active", id: "library" }, [
                m(imageLibrary)
              ])
            ])
          ])
        ]),
        m("footer", { id: "page-footer" }, [
          m(".container", "© Company 2016. All rights reserved. Terms of Service | Privacy Policy")
        ])
      ])
    }
  };

  return function(ctrl) {
    return layouts[(layout || "standard")](content(ctrl));
  };
};

export default mixinLayout;
