import mixinLayout from "../layout/mixin_layout";
import Session from "../../models/session";
import Video from "../../models/video";
import Slide from "../../models/slide";
import Slider from "./slider";
import imageDialog from "./image_dialog";
import videoPlayback from "./video_playback";
import slickCarousel from "./slick_carousel";
import feedbackButton from "../widgets/feedback_button";


var editVideo = (function() {

  var content = function(ctrl) {
    return [
      m("header", { class: "text-right" }, [
        m("a", { class: "btn btn-success" }, "Save"),
        m("a", { class: "btn btn-success" }, "Save and Exit")
      ]),
      m(imageDialog),
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
                    ctrl.currentSlide().url = image.path
                  }
                });
              }
            }, [
              m("img", {
                src: ctrl.currentSlide().url,
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
          class: 'slider-nav',
          clickCallback: function(slide) {
            console.log(slide);
            // m.startComputation();
            ctrl.currentSlide(Slide.resetModel(slide));
            // ctrl.slider().set([ctrl.currentSlide().start, ctrl.currentSlide().end]);
            // m.endComputation();
          },
          opts: {
            slidesToShow: 3,
            slidesToScroll: 1,
            arrows: false,
            dots: true,
            // centerMode: true,
            focusOnSelect: true,
            infinite: true
          }
        }, ctrl.video().slides)
      ]),
      m("footer", { class: "text-right" }, [
        m.component(feedbackButton, {
          action: ctrl.deleteSlide,
          label: 'Delete',
          feedbackLabel: 'Deleting...',
          style: 'btn btn-warning btn-lg' + (Slide.isNewRecord() ? ' disabled' : '')
        }),
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
      ctrl.videoInfo = m.prop({});
      ctrl.currentSlide = m.prop(Slide.resetModel());
      ctrl.errors = m.prop({});
      ctrl.player = {};
      ctrl.slider = m.prop();
      ctrl.svalue = m.prop("00:00:00");
      ctrl.evalue = m.prop("00:00:40");

      if(Session.isExpired()) {
        m.route("/signin");
      }

      // ctrl.initializeSlider = function() {
      //   Slider.init("slider");
      // };

      // the first argument is the DOM element;
      // the second argument is false if the element has just been created and true otherwise;
      // the third argument is the context – it allows you to define
      // extra behaviour before the element is removed from the DOM.
      // Probably the best way to think about this in a jQuery way
      // is that config is a bit like DOM ready
      ctrl.initPlayer = function(element, init, context) {
        if( !init ) {
          // m.startComputation();
          // ctrl.player = plyr.setup('.video_player');
          ctrl.player = plyr.setup('.video_player', {
            //['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'captions', 'fullscreen']
            controls: ['play', 'mute', 'volume', 'current-time']
          })[0];

          ctrl.player.on('ready', function(event) {
            console.log('ready!');
            ctrl.slider(
              Slider.init('slider', {
                max: ctrl.player.getDuration()
              })
            );

            ctrl.slider().on('change', function(values, handle, unencodedValues) {
              var currentValue = _.round(values[handle])
              // ctrl.player.seek(currentValue);
              if(handle === 0) {
                ctrl.currentSlide().start = currentValue;
              } else {
                ctrl.currentSlide().end = currentValue;
              }
              console.log(currentValue);
            });

            ctrl.slider().on('update', function(values, handle, unencodedValues) {
              var currentValue = _.round(values[handle])

              var duration = new Date(currentValue * 1000).toISOString().substr(11, 8);

              m.startComputation();
              if(handle === 0) {
                ctrl.svalue(duration);
              } else {
                ctrl.evalue(duration);
              }
              m.endComputation();
            });
            // videoSlider.setPips({
            //   mode: 'range',
            //   values: [0, 25, 50, 75, 100],
            //   density: 2
            // });
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
        if(Slide.isNewRecord()) {
          return Slide.create(ctrl.video().id).then(function(response) {
            console.log("slide created!");
            slickCarousel.addSlide(response.data);
            ctrl.currentSlide(Slide.resetModel());
            ctrl.slider().set([ctrl.currentSlide().start, ctrl.currentSlide().end]);
          }, function(response) {
            ctrl.errors(response.errors);
          })
        } else {
          return Slide.update(ctrl.video().id, ctrl.currentSlide().id).then(function(response) {
            console.log("slide updated!");
          }, function(response) {
            ctrl.errors(response.errors);
          })
        }
      }

      ctrl.deleteSlide = function() {
        console.log(ctrl.video().id);
        console.log(ctrl.currentSlide().id);
        return Slide.delete(ctrl.video().id, ctrl.currentSlide().id).then(function(response) {
          console.log("slide deleted!");
          slickCarousel.removeSlide();
          ctrl.currentSlide(Slide.resetModel());
          ctrl.slider().set([ctrl.currentSlide().start, ctrl.currentSlide().end]);
        }, function(response) {
          ctrl.errors(response.errors);
        })
      }

      Video.bindProviders();

      ctrl.getVideo(m.route.param("videoId"));

    },
    view: mixinLayout(content)
  };
})();

export default editVideo;
