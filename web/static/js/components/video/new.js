import mixinLayout from "../layout/mixin_layout";
import textField from "../widgets/text_field";
import feedbackButton from "../widgets/feedback_button";
import Video from "../../models/video";
import UrlParser from "../../util/urlParser"

var newVideo = (function() {

  var content = function(ctrl) {
    return [
      m(".row", [
        m(".col-sm-6", [
          m("form", { class: "light-form", role: "form" }, [
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
              style: 'btn btn-primary effect btn-lg'
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
        if(ctrl.isValidUrl(Video.model.url())) {
          return Video.create(args).then(function(response) {
            m.route("/video/" + response.data.id + "/edit");
          }, function(response) {
            ctrl.errors(response.errors);
          })
        } else {
          return ctrl.rejectUrlVideo().then(function(value) {
          }, function(value) {
            ctrl.errors({
              url: value
            });
          })
        }
      };

      ctrl.isValidUrl = function(url) {
        var urlParser = new UrlParser();
        // urlParser.addProvider('vimeo');
        urlParser.addProvider('youtube');
        var infoUrl = urlParser.parse(url);
        if( infoUrl.provider === "unknown" ) {
          return false;
        } else {
          return true;
        }
      };

      ctrl.rejectUrlVideo = function() {
        var deferred = m.deferred();
        setTimeout(function() {
          deferred.reject("Invalid url for youtube video");
        }, 1000);
        return deferred.promise;
      };

    },
    view: mixinLayout(content)
  };
})();

export default newVideo;
