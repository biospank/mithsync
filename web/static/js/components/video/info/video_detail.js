import textField from "../../widgets/text_field";
import feedbackButton from "../../widgets/feedback_button";
import Video from "../../../models/video";

var videoDetail = {
  controller: function() {
    Video.model.title(Video.current().title);
    Video.model.description(Video.current().description);
    Video.model.url(Video.current().url);

    return {
      errors: m.prop({}),
      updateVideo: function() {
        return Video.update(Video.current()).then(function() {
          swal({
            type: 'success',
            title: 'Video saved!',
            timer: 1500
          });
        }, function(response) {
          this.errors(response.errors);
        })
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
        error: ctrl.errors()['password'],
        value: Video.model.title()
      }),
      m.component(textField, {
        field: 'textarea',
        rows: 9,
        placeholder: 'Description',
        id: 'description',
        dataLabel: 'Description',
        oninput: m.withAttr("value", Video.model.description),
        error: ctrl.errors()['description'],
        value: Video.model.description()
      }),
      m.component(textField, {
        type: 'url',
        placeholder: 'Url',
        id: 'video-url',
        dataLabel: 'Url',
        disabled: true,
        value: Video.current().url
      }),
      m.component(textField, {
        type: 'text',
        placeholder: 'Creation date',
        id: 'creation-date',
        dataLabel: 'Creation date',
        disabled: "disabled",
        value: moment(Video.current().inserted_at).format('LLL')
      }),
      m("div", { class: "text-right" }, [
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
