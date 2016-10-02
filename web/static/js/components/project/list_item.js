import Project from "../../models/project";

var listItem = {
  controller: function(prj) {
    return {
      project: m.prop(prj),
      editMode: m.prop(false),
      updateItem: function(project) {
        Project.update(project().id).then(function(response) {
          console.log(response.data);
          return response.data;
        })
      },
      showItem: function() {
        if(this.editMode()) {
          return m("input.form-control", {
            type: 'text',
            // value: project().name,
            placeholder: this.project().name,
            oninput: m.withAttr("value", Project.model.name),
            onkeyup: function(e) {
              if(e.keyCode === 13) {
                this.project(this.updateItem(this.project));
                this.editMode(false);
                // m.redraw();
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
          return m("a", {
            href: "/projects/" + this.project().id + "/videos",
            config: m.route
          }, [
            m("h5", { class: "projects-list__title" }, [
              this.project().name,
              m("small", { class: "projects-list__date" }, "Created at: " + "16-05-2016")
            ])
          ]);
        }
      }
    }
  },
  view: function(ctrl, project){
    ctrl.project(project);

    return m("li", [
      m("div", { class: "projects-list__content" }, [
        m(".projects-list__body clearfix", [
          ctrl.showItem()
        ]),
        m("div", { class: "projects-list__buttons" }, [
          m("a", {
            class: "btn btn-primary icon-left",
            onclick: function() {
              ctrl.editMode(true);
            }
          }, [
            m("i", { class: "fa fa-pencil", "aria-hidden": true }),
            m("span", {}, "Edit")
          ])
        ])
      ])
    ]);
  }
}

export default listItem;
