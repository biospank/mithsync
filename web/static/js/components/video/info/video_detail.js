import textField from "../../widgets/text_field";
import feedbackButton from "../../widgets/feedback_button";
import Video from "../../../models/video";
import Clippy from "../../../models/clippy";
import UrlParser from "../../../util/urlParser"

var videoDetail = {
  oninit(vnode) {
    this.errors = m.stream({});

    Video.resetModel(Video.current());

    document.body.addEventListener("video:edit:reload", function(e) {
      Video.resetModel(Video.current());
      m.redraw();
    }, false);

    this.isValidUrl = (url) => {
      var urlParser = new UrlParser();
      urlParser.addProvider('vimeo');
      urlParser.addProvider('youtube');
      var infoUrl = urlParser.parse(url);
      if( infoUrl.provider === "unknown" ) {
        return false;
      } else {
        return true;
      }
    };

    this.rejectUrlVideo = () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          reject("Invalid url for vimeo/youtube video");
        }, 1000);
      });
    };

    this.swalValidationError = function() {
      swal({
        type: 'error',
        title: 'Validation error',
        text: 'Please check validations and try again',
        showCloseButton: true,
        showConfirmButton: false,
      }).catch(swal.noop);
    };

    this.updateVideo = (event) => {
      event.preventDefault();
      this.errors({});

      var originalUrl = Video.current().url;

      swal({
        title: 'Saving...',
        width: '400px',
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        onOpen: (progress) => {
          swal.showLoading();
          if(this.isValidUrl(Video.model.url())) {
            return Video.update(Video.current()).then((response) => {
              Video.current(response.data);
              swal.close();
              swal({
                type: 'success',
                title: 'Video info published!',
                width: '400px',
                showConfirmButton: false,
                timer: 1000
              }).then(() => {
              },
                // handling the promise rejection
                (dismiss) => {
                  if (dismiss === 'timer') {
                    if(Video.model.url() !== originalUrl)
                      // to reload the same url use {state: {key: Date.now()}}
                      m.route.set("/projects/" + Video.current().project_id +
                        "/videos/" + Video.current().id + "/edit", null, {state: {key: Date.now()}});

                  }
                }
              ).catch(swal.noop);
            }, (response) => {
              this.errors(response.errors);
              swal.close();
              this.swalValidationError();
            })
          } else {
            // return rejectUrlVideo().then((value) => {}, (value) => {
              this.errors({
                url: "Invalid url for vimeo/youtube video" //value
              });
              swal.close();
              this.swalValidationError();
            // });
          }
        }
      }).catch(swal.noop);
    };

    this.initClipboard = ({dom}) => {
      Clippy.init(element, Video.current());
    };

  },
  view({state}) {
    return m("form", { class: "light-form" }, [
      m(textField, {
        type: 'text',
        placeholder: 'Name',
        id: 'video-name',
        dataLabel: 'Name',
        oninput: m.withAttr("value", Video.model.title),
        error: state.errors()['title'],
        value: Video.model.title()
      }),
      m(textField, {
        field: 'textarea',
        rows: 5,
        placeholder: 'Description',
        id: 'description',
        dataLabel: 'Description',
        oninput: m.withAttr("value", Video.model.description),
        error: state.errors()['description'],
        value: Video.model.description()
      }),
      m('.form-group', [
        m('label.text-uppercase', 'Embed code'),
        m('pre', { class: "zero-clipboard" }, [
          m("a", {
            href: "#",
            class: "btn btn-clipboard",
            config: state.initClipboard,
            onclick: function(event) {
              event.preventDefault();
            }
          }, "copy"),
          m('code', { class: 'html' }, Video.export(Video.current()))
        ])
      ]),
      m(textField, {
        type: 'Url',
        placeholder: 'link to video',
        id: 'url',
        dataLabel: 'Video Link',
        oninput: m.withAttr("value", Video.model.url),
        error: state.errors()['url'],
        value: Video.model.url()
      }),
      // m(textField, {
      //   type: 'url',
      //   placeholder: 'Url',
      //   id: 'video-url',
      //   dataLabel: 'Url',
      //   disabled: true,
      //   value: Video.model.url()
      // }),
      m(textField, {
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
            onclick: state.updateVideo,
            class: 'btn btn-success btn-md btn-rectangular btn-space--left-5 icon-inside--left',
            title: "Publish"
          }, [
            m("i", { class: "fa fa-save" }),
            "Publish"
          ])
        ])
      ])
    ])
  }
}

export default videoDetail;
