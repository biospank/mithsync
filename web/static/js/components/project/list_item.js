import Project from "../../models/project";

var listItem = {
  controller: function(prj, parent) {
    return {
      project: m.prop(prj),
      editMode: m.prop(false),
      showItem: function() {
        if(this.editMode()) {
          return m(".list__contents", { class: "status" }, [
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
                }
              }),
              m("a", {
                onclick: function() {
                  this.editMode(false);
                }.bind(this),
                class: "input-group-addon",
                id: "change-text"
              }, [
                m("i", { class: "fa fa-close" })
              ])
            ])
          ])
        } else {
          return [
            m("a", {
              href: "",
              onclick: function(event) {
                event.preventDefault();
                Project.current(this.project());
                m.route("/projects/" + this.project().id + "/videos");
              }.bind(this),
              class: "list__contents"
            }, [
              m("figure", { class: "list__image media-left p-all-side-10 hidden-xs hidden-sm" }, [
                m("a", [
                  m("img", { src: "/images/icons/folder.svg", class: "media-object", width: "40", height: "40" })
                ])
              ]),
              m(".list__body media-body", [
                m("h5", { class: "list__body-title mboth-0 text-uppercase" }, [
                  this.project().name,
                ]),
                m("span", { class: "list__body-summary list__body-summary--space-right10 text-uppercase" }, moment(this.project().inserted_at).format('LLL')),
                m("span", {
                  class: "list__body-summary coloured text-uppercase"
                }, this.project().video_count + (_.gt(this.project().video_count, 1) ? " videos" : " video"))
              ])
            ]),
            m(".list__buttons list__buttons--32", [
              m("a", {
                class: "btn btn-default btn-square btn-square--32 btn-space--left-10",
                onclick: function() {
                  this.editMode(true);
                }.bind(this),
                title: "Change project name",
                "data-toggle": "tooltip",
                "data-placement": "top",
                config: function(element, isInit, context) {
                  if (!isInit)
                    $(element).tooltip()
                }
              }, [
                m("i", { class: "fa fa-pencil", "aria-hidden": true })
              ]),
              m("a", {
                class: "btn btn-default btn-square btn-square btn-square--32 btn-space--left-10",
                onclick: function() {
                  swal({
                    title: 'Are you sure?',
                    text: "All associated videos will be permanently removed.\nYou won't be able to revert this!",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#75c4cb',
                    cancelButtonColor: '#9b0202',
                    confirmButtonText: 'Yes, delete it!',
                    showLoaderOnConfirm: true,
                    preConfirm: function() {
                      return new Promise(function(resolve, reject) {
                        parent.deleteProject(this.project())
                        resolve()
                        // setTimeout(function() {
                        //   parent.deleteProject(this.project())
                        //   resolve()
                        // }.bind(this), 2000)
                      }.bind(this))
                    }.bind(this)
                  }).catch(swal.noop)
                }.bind(this)
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
      m("div", { class: "list media" }, [
        ctrl.showItem()
      ])
    ]);
  }
}

export default listItem;
