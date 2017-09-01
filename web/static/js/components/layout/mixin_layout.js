import breadcrumbBar from "./breadcrumb_bar";
import mainNav from "./main_nav";
import topBar from "./top_bar";
import imageLibrary from "../video/library/image_library";
import videoDetail from "../video/info/video_detail";
import videoLayout from "../video/layout/video_layout";
import Videosync from "../../videosync";

var mixinLayout = function(content, layout) {
  var loadFixedLayout = function() {
    var cssId = 'fixed-layout';
    if (!document.getElementById(cssId)) {
        var head  = document.getElementsByTagName('head')[0];
        var link  = document.createElement('link');
        link.id   = cssId;
        link.rel  = 'stylesheet';
        link.type = 'text/css';
        link.href = Videosync.domain + '/css/fixed-layout.css';
        link.media = 'all';
        head.appendChild(link);
    }
  };

  var unloadFixedLayout = function() {
    var cssId = 'fixed-layout';
    if (document.getElementById(cssId)) {
      var head  = document.getElementsByTagName('head')[0];
      var link  = document.getElementById(cssId);
      head.removeChild(link);
    }
  };

  var layouts = {
    login: function(content) {
      unloadFixedLayout();
      return [
        m('main', { class: 'main-container'}, [
          content
        ])
      ]
    },
    standard: function(content) {
      loadFixedLayout();
      return [
        m(topBar, { additionalClass: "navbar-fixed-top" }),
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
            m(mainNav)
          ]),
          m("section", { id: "page-content-wrapper" }, [
            m(breadcrumbBar),
            m("main", { class: "main-container" }, [
              content
            ])
          ])
        ])
        // m("footer", { id: "page-footer" }, [
        //   m("p", { class: "mb-0" }, "© Company 2016. All rights reserved. Terms of Service | Privacy Policy")
        // ])
      ]
    },
    edit: function(content) {
      loadFixedLayout();
      return m(".edit-layout", [
        m("header", { class: "navbar-fixed-top", id: "header-page" }, [
          m(topBar, {}),
          m(breadcrumbBar)
        ]),
        m("section", { class: "clearfix", id: "wrapper" }, [
          // m("aside", { id: "sidebar-wrapper" }, [
          //   m(mainNav)
          // ]),
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
        ])
        // m("footer", { id: "page-footer" }, [
        //   m(".container", "© Company 2016. All rights reserved. Terms of Service | Privacy Policy")
        // ])
      ])
    }
  };

  return function(ctrl) {
    return layouts[(layout || "standard")](content(ctrl));
  };
};

export default mixinLayout;
