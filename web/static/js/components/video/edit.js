import mixinLayout from "../layout/mixin_layout";
import Session from "../../models/session";
import Video from "../../models/video";
import Slide from "../../models/slide";
import Slider from "./slider";
import imageDialog from "./image_dialog";
import videoPlayback from "./video_playback";
import slickCarousel from "./slick_carousel";
import feedbackButton from "../widgets/feedback_button";
import confirmDialog from "../widgets/confirm_dialog";


var editVideo = (function() {

  var content = function(ctrl) {
    return [
      m("header", { class: "text-right" }, [
        m("a", { class: "btn btn-success" }, "Save"),
        m("a", { class: "btn btn-success" }, "Save and Exit")
      ]),
      m(imageDialog),
      m(confirmDialog),
      m(".row", [
        m(".col-sm-6", [
          m(videoPlayback, {
            provider: ctrl.videoInfo().provider,
            videoId: ctrl.videoInfo().videoId,
            onReady: ctrl.initPlayer
          })
          // m(".video_player",
          //   {
          //     "data-type": "youtube", //"vimeo",
          //     "data-video-id": "_WgrfEaAM4Y", //"180519312",
          //     config: ctrl.initPlayer
          //   }
          // )
        ]),
        m(".col-sm-6", [
          m("div", [
            m("a", {
              onclick: function(event) {
                event.preventDefault();
                imageDialog.show({
                  selectCallback: function(image) {
                    slickCarousel.currentSlide().url = image.path
                  }
                });
              }
            }, [
              m("img", {
                src: slickCarousel.currentSlide().url,
                class: "img-responsive"
              })
            ])
          ])
        ])
      ]),
      m(".clearfix .mgv25", [
        m("p", "Start: " + ctrl.svalue()),
        m("p", "End: " + ctrl.evalue()),
        m("#slider")
      ]),
      m(".col-sm-12 .mgv25", {}, [
        m(slickCarousel, {
          selectCallback: function(slide) {
            ctrl.slider().set([slide.start, slide.end]);
            ctrl.isNewRecord(false)
          }
        }, ctrl.video().slides)
      ]),
      m("footer", { class: "text-right" }, [
        m("button", {
          onclick: ctrl.newSlide,
          class: 'btn btn-primary btn-lg'
        }, 'New'),
        m("button[type=submit]", {
          onclick: ctrl.deleteSlide,
          class: 'btn btn-danger btn-lg' + (ctrl.isNewRecord() ? ' disabled' : ''),
          disabled: ctrl.isNewRecord()
        }, 'Delete'),
        // m.component(feedbackButton, {
        //   confirm: ctrl.deleteSlide,
        //   disabled: ctrl.isNewRecord(),
        //   label: 'Delete',
        //   feedbackLabel: 'Deleting...',
        //   style: 'btn btn-danger btn-lg'
        // }),
        m.component(feedbackButton, {
          action: ctrl.saveSlide,
          label: 'Save',
          feedbackLabel: 'Saving...',
          style: 'btn btn-primary btn-lg'
        })
      ])
    ];
  };

  return {
    controller: function() {
      var ctrl = this;

      ctrl.video = m.prop({});
      ctrl.isNewRecord = m.prop(true);
      ctrl.videoInfo = m.prop({});
      ctrl.errors = m.prop({});
      ctrl.player = {};
      ctrl.slider = m.prop();
      ctrl.svalue = m.prop("00:00:00");
      ctrl.evalue = m.prop("00:00:40");

      if(Session.isExpired()) {
        m.route("/signin");
      }

      // the first argument is the DOM element;
      // the second argument is false if the element has just been created and true otherwise;
      // the third argument is the context – it allows you to define
      // extra behaviour before the element is removed from the DOM.
      // Probably the best way to think about this in a jQuery way
      // is that config is a bit like DOM ready
      ctrl.initPlayer = function(element, init, context) {
        if( !init ) {
          ctrl.player = plyr.setup('.video_player', {
            //['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'captions', 'fullscreen']
            controls: ['play', 'mute', 'volume', 'current-time']
          })[0];

          ctrl.player.on('ready', function(event) {
            ctrl.slider(
              Slider.init('slider', {
                max: ctrl.player.getDuration()
              })
            );

            ctrl.slider().on('change', function(values, handle, unencodedValues) {
              var currentValue = _.round(values[handle]);
              ctrl.player.seek(currentValue);
            });

            ctrl.slider().on('update', function(values, handle, unencodedValues) {
              var currentValue = _.round(values[handle])

              var currentValue = _.round(values[handle])

              var duration = new Date(currentValue * 1000).toISOString().substr(11, 8);

              m.startComputation();
              if(handle === 0) {
                ctrl.svalue(duration);
              } else {
                ctrl.evalue(duration);
              }
              m.endComputation();

              if(handle === 0) {
                slickCarousel.currentSlide().start = currentValue;
              } else {
                slickCarousel.currentSlide().end = currentValue;
              }
            });
          });

          // ctrl.player.on('error', function(error) {
          //   console.log(error);
          // });
          //
          // ctrl.player.on('stalled', function(event) {
          //   console.log(event);
          //   console.log("stalled");
          // });
        }
      };

      ctrl.getVideo = function(videoId) {
        return Video.show(videoId).then(function(video) {
          ctrl.video(video.data);
          ctrl.videoInfo(Video.info(ctrl.video().url));
        }, function(response) {
          ctrl.errors(response.errors);
        })
      };

      ctrl.saveSlide = function() {
        if(ctrl.isNewRecord()) {
          return Slide.create(ctrl.video().id).then(function(response) {
            slickCarousel.addSlide(response.data);
            slickCarousel.currentSlide(Slide.resetModel());
            ctrl.slider().set([slickCarousel.currentSlide().start, slickCarousel.currentSlide().end]);
            ctrl.isNewRecord(true)
          }, function(response) {
            ctrl.errors(response.errors);
          })
        } else {
          return Slide.update(ctrl.video().id, slickCarousel.currentSlide().id).then(function(response) {
            slickCarousel.currentSlide(Slide.resetModel());
            ctrl.slider().set([slickCarousel.currentSlide().start, slickCarousel.currentSlide().end]);
            ctrl.isNewRecord(true)
          }, function(response) {
            ctrl.errors(response.errors);
          })
        }
      }

      ctrl.confirmAction = function() {
        return Slide.delete(ctrl.video().id, slickCarousel.currentSlide().id).then(function(response) {
          slickCarousel.removeSlide();
          slickCarousel.currentSlide(Slide.resetModel());
          ctrl.slider().set([slickCarousel.currentSlide().start, slickCarousel.currentSlide().end]);
        }, function(response) {
          ctrl.errors(response.errors);
        })
      };
      ctrl.cancelAction = function() {
      };

      ctrl.deleteSlide = function(event) {
        confirmDialog.init(
          {
            msg: "Confirm slide deletion?",
            cbConfirm: ctrl.confirmAction,
            cbCancel: ctrl.cancelAction
          }
        );
      }

      ctrl.newSlide = function(event) {
        // event.preventDefault();
        slickCarousel.currentSlide(Slide.resetModel());
        ctrl.slider().set([slickCarousel.currentSlide().start, slickCarousel.currentSlide().end]);
        ctrl.isNewRecord(true);
      }

      Video.bindProviders();

      ctrl.getVideo(m.route.param("videoId"));

    },
    view: mixinLayout(content)
  };
})();

export default editVideo;
