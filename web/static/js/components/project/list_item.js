import Project from "../../models/project";

var listItem = {
  controller: function(prj, parent) {
    return {
      project: m.prop(prj),
      editMode: m.prop(false),
      showItem: function() {
        if(this.editMode()) {
          return m("input.form-control", {
            type: 'text',
            placeholder: this.project().name,
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
            }
          })
        } else {
          return [
            m("a", {
              href: "/projects/" + this.project().id + "/videos",
              config: m.route
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
        m(".projects-list__body", [
          ctrl.showItem()
        ])
      ])
    ]);
  }
}

export default listItem;
