import textField from "../../widgets/text_field";
import feedbackButton from "../../widgets/feedback_button";
import Video from "../../../models/video";
import Clippy from "../../../models/clippy";
import UrlParser from "../../../util/urlParser"

var videoDetail = {
  controller: function() {
    var errors = m.prop({});

    Video.resetModel(Video.current());

    document.body.addEventListener("video:edit:reload", function(e) {
      Video.resetModel(Video.current());
      m.redraw();
    }, false);

    var isValidUrl = function(url) {
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

    var rejectUrlVideo = function() {
      var deferred = m.deferred();
      setTimeout(function() {
        deferred.reject("Invalid url for youtube video");
      }, 1000);
      return deferred.promise;
    };

    return {
      errors: function() {
        return errors();
      },
      updateVideo: function() {
        if(isValidUrl(Video.model.url())) {
          return Video.update(Video.current()).then(function() {
            swal({
              type: 'success',
              title: 'Video info saved!',
              showConfirmButton: false,
              timer: 1000
            }).catch(swal.noop);
          }, function(response) {
            errors(response.errors);
          })
        } else {
          return rejectUrlVideo().then(function(value) {
          }, function(value) {
            errors({
              url: value
            });
          });
        }
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
      // m.component(textField, {
      //   type: 'Url',
      //   placeholder: 'link to video',
      //   id: 'url',
      //   dataLabel: 'Video Link',
      //   oninput: m.withAttr("value", Video.model.url),
      //   error: ctrl.errors()['url'],
      //   value: Video.model.url()
      // }),
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
