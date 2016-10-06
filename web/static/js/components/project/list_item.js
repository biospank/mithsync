import Project from "../../models/project";

var listItem = {
  controller: function(prj, parent) {
    return {
      project: m.prop(prj),
      editMode: m.prop(false),
      showItem: function() {
        if(this.editMode()) {
          return m(".projects-list__body", [
            m(".input-group", [
              m("input", {
                type: "text",
                class: "form-control",
                placeholder: this.project().name,
                "aria-describedby": "change-text",
                oninput: m.withAttr("value", Project.model.name),
                onkeyup: function(e) {
                  if(e.keyCode === 13) {
                    parent.updateProject(this.project());
                    this.editMode(false);
                  }

                  if(e.keyCode === 27)
                    this.editMode(false);
                }.bind(this),
                config: function(element, isInit) {
                  if(!isInit)
                    $(element).focus()
                }}),
              m("a", { href: "#", class: "input-group-addon", id: "change-text" }, [
                m("i", { class: "fa fa-close" })
              ])
            ])
          ])
        } else {
          return [
            m("a", {
              href: "/projects/" + this.project().id + "/videos",
              config: m.route,
              class: "projects-list__body"
            }, [
              m("h5", { class: "title" }, [
                this.project().name,
              ]),
              m("p", { class: "creation-date" }, "5 febbraio 2016"),
              m("span", { class: "videos-number" }, "1 video")
            ]),
            m(".projects-list__buttons", [
              m("a", {
                class: "btn btn-primary btn-square",
                onclick: function() {
                  this.editMode(true);
                }.bind(this)
              }, [
                m("i", { class: "fa fa-pencil", "aria-hidden": true })
              ]),
              m("a", {
                class: "btn btn-danger btn-square",
                onclick: function() {
                  //this.editMode(true);
                }
              }, [
                m("i", { class: "fa fa-trash", "aria-hidden": true })
              ])
            ])
          ]
        }
      }
    }
  },
  view: function(ctrl, project){
    ctrl.project(project);

    return m("li", [
      m("div", { class: "projects-list__row" }, [
        ctrl.showItem()
      ])
    ]);
  }
}

export default listItem;
