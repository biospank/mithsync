import mixinLayout from "../layout/mixin_layout";

var faq = (() => {

  var content = (vnode) => {
    return m(".panel-group", { id: "accordion", role: "tablist", "aria-multiselectable": true }, [
      m(".panel panel-default", [
        m(".panel-heading", { role: "tab", id: "headingOne" }, [
          m("h4", { class: "panel-title" }, [
            m("a", {
              role: "button",
              "data-toggle": "collapse",
              "data-parent": "#accordion",
              href: "#collapseOne",
              "aria-expanded": true,
              "aria-controls": "collapseOne"
            }, "Collapsible Group Item #1")
          ])
        ]),
        m(".panel-collapse collapse in", {
          id: "collapseOne",
          role: "tabpanel",
          "aria-labelledby": "headingOne"
        }, [
          m(".panel-body",
          "Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.")
        ])
      ]),
      m(".panel panel-default", [
        m(".panel-heading", { role: "tab", id: "headingTwo" }, [
          m("h4", { class: "panel-title" }, [
            m("a", {
              role: "button",
              "data-toggle": "collapse",
              "data-parent": "#accordion",
              href: "#collapseTwo",
              "aria-expanded": true,
              "aria-controls": "collapseTwo"
            }, "Collapsible Group Item #1")
          ])
        ]),
        m(".panel-collapse collapse", {
          id: "collapseTwo",
          role: "tabpanel",
          "aria-labelledby": "headingTwo"
        }, [
          m(".panel-body",
          "Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.")
        ])
      ]),
      m(".panel panel-default", [
        m(".panel-heading", { role: "tab", id: "headingThree" }, [
          m("h4", { class: "panel-title" }, [
            m("a", {
              role: "button",
              "data-toggle": "collapse",
              "data-parent": "#accordion",
              href: "#collapseThree",
              "aria-expanded": true,
              "aria-controls": "collapseThree"
            }, "Collapsible Group Item #1")
          ])
        ]),
        m(".panel-collapse collapse", {
          id: "collapseThree",
          role: "tabpanel",
          "aria-labelledby": "headingThree"
        }, [
          m(".panel-body",
          "Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.")
        ])
      ])
    ])
  }

  return {
    view: mixinLayout(content)
  };
})();

export default faq;
