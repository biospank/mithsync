import mixinLayout from "../layout/mixin_layout";
import textField from "../widgets/text_field";
import feedbackButton from "../widgets/feedback_button";
import Video from "../../models/video";

var newVideo = (function() {

  var content = function(ctrl) {
    return [
      m(".row", [
        m(".col-sm-6", [
          m("form", { role: "form" }, [
            m.component(textField, {
              type: 'text',
              placeholder: 'Title',
              id: 'title',
              dataLabel: 'Title',
              oninput: m.withAttr("value", Video.model.title),
              error: ctrl.errors()['title']
            }),
            m.component(textField, {
              field: 'textarea',
              rows: 9,
              placeholder: 'Description',
              id: 'description',
              dataLabel: 'Description',
              oninput: m.withAttr("value", Video.model.description),
              error: ctrl.errors()['description']
            }),
            m.component(textField, {
              type: 'link',
              placeholder: 'link to video',
              id: 'url',
              dataLabel: 'Video Link',
              oninput: m.withAttr("value", Video.model.url),
              error: ctrl.errors()['url']
            }),
            m.component(feedbackButton, {
              action: ctrl.createVideo,
              label: 'Create',
              feedbackLabel: 'Creating...',
              style: 'btn btn-info'
            })
          ])
        ]),
        m(".col-sm-6", [])
      ])
    ];
  };

  return {
    controller: function(){
      var ctrl = this;
      ctrl.errors = m.prop({});

      ctrl.createVideo = function(args) {
        return Video.create(args).then(function() {
          m.route("/video/edit");
        }, function(response) {
          ctrl.errors(response.errors);
        })
      };
    },
    view: mixinLayout(content)
  };
})();

export default newVideo;
