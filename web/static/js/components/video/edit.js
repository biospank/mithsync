import mixinLayout from "../layout/mixin_layout";
import Session from "../../models/session";
import Video from "../../models/video";
import Slide from "../../models/slide";
import Slider from "./slider";
import imageDialog from "./image_dialog";
import videoPlayback from "./video_playback";
import slickCarousel from "./slick_carousel";
import feedbackButton from "../widgets/feedback_button";
import videoPreview from "./video_preview";

var editVideo = (function() {

  var content = function(ctrl) {
    return [
      // m("header", { class: "text-right" }, [
      //   m("a", { class: "btn btn-success" }, "Save"),
      //   m("a", { class: "btn btn-success" }, "Save and Exit")
      // ]),
      m(imageDialog),
      m(videoPreview),
      m(".clearfix", [
        m("div.pull-right", [
          m("a", {
            href: '/projects/' + m.route.param('projectId') + '/videos/' + m.route.param('videoId') + '/library',
            config: m.route,
            class: "btn btn-primary effect btn-md text-uppercase icon-left"
          }, [
            m("i", { class: 'fa fa-plus' }),
            m("span", {}, "Library")
          ])
        ])
      ]),
      m("section", { id: "video-container" }, [
        m(".row", [
          m(".col-sm-6", [
            m(videoPlayback, {
              provider: ctrl.videoInfo().provider,
              videoId: ctrl.videoInfo().videoId,
              onReady: ctrl.initPlayer
            })
            // m("div")
            // m(".video_player",
            //   {
            //     "data-type": "youtube", //"vimeo",
            //     "data-video-id": "_WgrfEaAM4Y", //"180519312",
            //     config: ctrl.initPlayer
            //   }
            // )
          ]),
          m(".col-sm-6", [
            m("figure", { class: "placeholderSlide" }, [
              m("a", {
                onclick: function(event) {
                  event.preventDefault();
                  imageDialog.show({
                    selectCallback: function(image) {
                      slickCarousel.currentSlide().url = image.slide_url
                      slickCarousel.currentSlide().thumb_url = image.thumb_url
                    }
                  });
                },
                href: "#"
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
          m("p", { class: "pull-left" }, "Start: " + ctrl.svalue()),
        ]),
        m("#slider"),
        m("footer", { class: "buttons row" }, [
          m("div", { class: "col-sm-7" }, [
            m("button", {
              onclick: ctrl.newSlide,
              class: 'btn btn-primary',
              title: "New slide"
            }, 'New'),
            m("button[type=submit]", {
              onclick: function() {
                swal({
                  title: 'Are you sure?',
                  text: "You won't be able to revert this!",
                  type: 'warning',
                  showCancelButton: true,
                  showLoaderOnConfirm: true,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Yes, delete it!'
                }).then(function() {
                  ctrl.deleteSlide();
                })
              },
              class: 'btn btn-danger',
              title: "Delete",
              "data-toggle": "tooltip",
              "data-placement": "top",
              config: function(element, isInit, context) {
                if (!isInit)
                  $(element).tooltip()
              }
            }, [
              m("i", { class: "fa fa-trash-o" })
              //m("span", "Delete")
            ]),
            m("button[type=submit]", {
              onclick: ctrl.saveSlide,
              class: 'btn btn-success',
              title: "Save"
            }, 'Save')
          ]),
          m("div", { class: "col-sm-5 text-right" }, [
            m("a", {
              href: "",
              class: 'btn btn-primary',
              title: "Informations",
              "data-toggle": "tooltip",
              "data-placement": "top",
              config: function(element, isInit, context) {
                if (!isInit)
                  $(element).tooltip()
              }
            }, [
              m("i", { class: "fa fa-info" })
            ]),
            m("button[type=submit]", {
              onclick: function(event) {
                event.preventDefault();
                // recuperare il video aggiornato con le slides
                videoPreview.show(ctrl.video());
              },
              class: 'btn btn-success',
              title: "Preview"
            }, 'Preview')
          ])
        ])
      ]),
      m(slickCarousel, {
        selectCallback: function(slide) {
          ctrl.highlightSlide(slide)
        }
      }, slickCarousel.slides())
    ];
  };

  return {
    controller: function() {
      var ctrl = this;

      ctrl.video = m.prop({});
      ctrl.videoInfo = m.prop({});
      ctrl.errors = m.prop({});
      ctrl.player = {};
      ctrl.slider = m.prop();
      ctrl.svalue = m.prop("00:00:00");

      if(Session.isExpired()) {
        m.route("/signin");
      }

      ctrl.onChangeSlider = function(values, handle, unencodedValues) {
        var currentValue = _.round(values[handle]);
        slickCarousel.currentSlide().start = currentValue;
        // ctrl.player.seek(currentValue);
      };

      ctrl.onUpdateSlider = function(values, handle, unencodedValues) {
        var currentValue = _.round(values[handle])

        var duration = new Date(currentValue * 1000).toISOString().substr(11, 8);

        m.startComputation();
        ctrl.svalue(duration);
        m.endComputation();

      };

      // the first argument is the DOM element;
      // the second argument is false if the element has just been created and true otherwise;
      // the third argument is the context – it allows you to define
      // extra behaviour before the element is removed from the DOM.
      // Probably the best way to think about this in a jQuery way
      // is that config is a bit like DOM ready
      ctrl.initPlayer = function(element, init, context) {
        if( !init ) {
          // ctrl.player = plyr.setup('.video_player', {
          //   //['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'captions', 'fullscreen']
          //   controls: ['play', 'mute', 'volume', 'current-time']
          // })[0];
          //
          // ctrl.player.on('ready', function(event) {
          //   ctrl.slider(Slider.init('slider', {
          //     start: slickCarousel.slides().map(function(slide) {
          //       return slide.start;
          //     }),
          //     max: ctrl.player.getDuration(),
          //     onChange: ctrl.onChangeSlider,
          //     onUpdate: ctrl.onUpdateSlider
          //   }));
          // });

          ctrl.slider(Slider.init('slider', {
            start: slickCarousel.slides().map(function(slide) {
              return slide.start;
            }),
            max: 180,
            onChange: ctrl.onChangeSlider,
            onUpdate: ctrl.onUpdateSlider
          }));

          ctrl.highlightSlide(_.first(slickCarousel.slides()));

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
        return Video.show(m.route.param('projectId'), videoId).then(function(video) {
          ctrl.video(video.data);
          ctrl.videoInfo(Video.info(ctrl.video().url));
          // this is important to be here: it renders correctly
          // the current slide
          slickCarousel.slides(video.data.slides)
          slickCarousel.currentSlide(_.first(slickCarousel.slides()));
        }, function(response) {
          ctrl.errors(response.errors);
        })
      };

      ctrl.saveSlide = function() {
        Slide.resetModel(slickCarousel.currentSlide());

        if(Slide.isNewRecord()) {
          if(Slide.validate()) {
            return Slide.create(ctrl.video()).then(function(response) {
              swal({
                type: 'success',
                title: 'Slide saved!',
              });
            }, function(response) {
              ctrl.errors(response.errors);
            })
          } else {
            swal({
              title: 'Select a slide',
              text: "Click on placeholder to select an image",
              type: 'info',
              // confirmButtonColor: '#3085d6',
              confirmButtonText: 'Ok'
            })
          }
        } else {
          return Slide.update(ctrl.video()).then(function(response) {
            swal({
              type: 'success',
              title: 'Slide saved!',
            });
          }, function(response) {
            ctrl.errors(response.errors);
          })
        }
      };

      ctrl.deleteSlide = function(event) {
        Slide.resetModel(slickCarousel.currentSlide());

        if(Slide.isNewRecord()) {
          slickCarousel.removeSlide();
          ctrl.refreshSlider(slickCarousel.slides())
          var slide = _.first(slickCarousel.slides())
          slickCarousel.currentSlide(slide);
          ctrl.highlightSlide(slide);
        } else {
          Slide.delete(ctrl.video()).then(function(response) {
            slickCarousel.removeSlide();
            ctrl.refreshSlider(slickCarousel.slides())
            var slide = _.first(slickCarousel.slides())
            slickCarousel.currentSlide(slide);
            ctrl.highlightSlide(slide);
          }, function(response) {
            ctrl.errors(response.errors);
          })
        }
      };

      ctrl.newSlide = function(event) {
        event.preventDefault();

        var lastValue = _.last(slickCarousel.slides()).start;

        var slide = Slide.resetModel({
          start: lastValue + 10
        });

        slickCarousel.addSlide(slide);
        slickCarousel.currentSlide(slide);
        ctrl.refreshSlider(
          slickCarousel.slides()
        );
        ctrl.highlightSlide(slide);
      };

      ctrl.highlightSlide = function(slide) {
        var duration = new Date(slide.start * 1000).toISOString().substr(11, 8);

        m.startComputation();
        ctrl.svalue(duration);
        m.endComputation();

        Slide.resetModel(slide);
        ctrl.focusHandle(_.findIndex(slickCarousel.slides(), slide));
      };

      ctrl.refreshSlider = function(slides) {
        ctrl.slider().destroy();
        ctrl.slider(Slider.init('slider', {
          start: slides.map(function(slide) {
            return slide.start;
          }),
          max: 180, // ctrl.player.getDuration(),
          onChange: ctrl.onChangeSlider,
          onUpdate: ctrl.onUpdateSlider
        }));
      };

      ctrl.focusHandle = function(index) {
        var origins = ctrl.slider().target.getElementsByClassName('noUi-origin');
        _.forEach(origins, function(element, idx) {
          if(idx !== index) {
            element.setAttribute('disabled', true);
          } else {
            element.removeAttribute('disabled');
          }
        });
      };

      Video.bindProviders();

      ctrl.getVideo(m.route.param("videoId"));

    },
    view: mixinLayout(content)
  };
})();

export default editVideo;
