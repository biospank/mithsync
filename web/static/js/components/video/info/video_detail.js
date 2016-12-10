import textField from "../../widgets/text_field";
import feedbackButton from "../../widgets/feedback_button";
import Video from "../../../models/video";
import Clippy from "../../../models/clippy";

var videoDetail = {
  controller: function() {
    Video.resetModel(Video.current());

    document.body.addEventListener("video:edit:reload", function(e) {
      Video.resetModel(Video.current());
      m.redraw();
    }, false);

    return {
      errors: m.prop({}),
      updateVideo: function(event) {
        event.preventDefault();
        swal({
          title: 'Saving...',
          width: '400px',
          allowOutsideClick: false,
          allowEscapeKey: false,
          showConfirmButton: false,
          onOpen: function(progress) {
            swal.showLoading();
            return Video.update(Video.current()).then(function() {
              swal.close();
              swal({
                type: 'success',
                title: 'Layout saved!',
                width: '400px',
                showConfirmButton: false,
                timer: 1000
              }).catch(swal.noop);
            }, function(response) {
              this.errors(response.errors);
              swal.close();
              // swal({
              //   type: 'error',
              //   title: 'Oops!! something went wrong',
              //   text: 'Please, try again later or let us know about that',
              //   showCloseButton: true,
              //   showConfirmButton: false
              // }).catch(swal.noop);
            });
          }
        }).catch(swal.noop);
      },
      initClipboard: function(element, isInit, context) {
        if(!isInit) {
          Clippy.init(element);
        }
      }
    };
  },
  view: function(ctrl) {
    return m("form", { class: "light-form" }, [
      m.component(textField, {
        type: 'text',
        placeholder: 'Name',
        id: 'video-name',
        dataLabel: 'Name',
        oninput: m.withAttr("value", Video.model.title),
        error: ctrl.errors()['title'],
        value: Video.model.title()
      }),
      m.component(textField, {
        field: 'textarea',
        rows: 5,
        placeholder: 'Description',
        id: 'description',
        dataLabel: 'Description',
        oninput: m.withAttr("value", Video.model.description),
        error: ctrl.errors()['description'],
        value: Video.model.description()
      }),
      m('.form-group', [
        m('label.text-uppercase', 'Export'),
        m('pre', { class: "zero-clipboard" }, [
          m("a", {
            href: "#",
            class: "btn btn-clipboard",
            config: ctrl.initClipboard,
            onclick: function(event) {
              event.preventDefault();
            }
          }, "copy"),
          m('code', { class: 'html' }, Video.export())
        ])
      ]),
      m.component(textField, {
        type: 'url',
        placeholder: 'Url',
        id: 'video-url',
        dataLabel: 'Url',
        disabled: true,
        value: Video.model.url()
      }),
      m.component(textField, {
        type: 'text',
        placeholder: 'Creation date',
        id: 'creation-date',
        dataLabel: 'Creation date',
        disabled: "disabled",
        value: moment(Video.model.inserted_at()).format('LLL')
      }),
      m("div", { class: "text-right mb-60" }, [
        m("div", { class: "text-right" }, [
          m("button[type=submit]", {
            onclick: ctrl.updateVideo,
            class: 'btn btn-success btn-md btn-rectangular btn-space--left-5 icon-inside--left',
            title: "Update"
          }, [
            m("i", { class: "fa fa-save" }),
            "Update"
          ])
        ])
      ])
    ])
  }
}

export default videoDetail;
