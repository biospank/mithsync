import textField from "../../widgets/text_field";
import feedbackButton from "../../widgets/feedback_button";
import Video from "../../../models/video";

var videoDetail = {
  controller: function() {
    var clipboard;

    Video.resetModel(Video.current());

    document.body.addEventListener("video:edit:reload", function(e) {
      Video.resetModel(Video.current());
      m.redraw();
    }, false);

    return {
      errors: m.prop({}),
      updateVideo: function() {
        return Video.update(Video.current()).then(function() {
          swal({
            type: 'success',
            title: 'Video saved!',
            showConfirmButton: false,
            timer: 1000
          }).catch(swal.noop);
        }, function(response) {
          this.errors(response.errors);
        })
      },
      initClipboard: function(element, isInit, context) {
        if(!isInit) {
          $(element).tooltip({
            placement: 'bottom',
            title: 'Copied!',
            trigger: 'manual'
          });

          clipboard = new Clipboard(element, {
            text: function(btn) {
              return Video.export();
            }
          });

          clipboard.on('success', function(e) {
            $(element).tooltip('show');

            setTimeout(function() {
              $(element).tooltip('hide');
            }, 1000)

          });

          clipboard.on('error', function(e) {
            // console.error('Action:', e.action);
            // console.error('Trigger:', e.trigger);
          });
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
            config: ctrl.initClipboard
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
        m.component(feedbackButton, {
          action: ctrl.updateVideo,
          label: 'Update',
          feedbackLabel: 'Updating...',
          style: 'btn btn-success btn-md btn-rectangular'
        })
      ])
    ])
  }
}

export default videoDetail;
