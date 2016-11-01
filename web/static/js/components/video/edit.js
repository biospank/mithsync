import mixinLayout from "../layout/mixin_layout";
import Session from "../../models/session";
import Project from "../../models/project";
import Video from "../../models/video";
import Slide from "../../models/slide";
import Slider from "./slider";
import loader from "../widgets/loader";
import imageDialog from "./image_dialog";
import videoPlayback from "./video_playback";
import slickCarousel from "./slick_carousel";
import feedbackButton from "../widgets/feedback_button";
import videoPreview from "./video_preview";
import Color from '../../models/color';
import dragger from '../../models/dragger';

var editVideo = (function() {

  var showBrowse = function() {
    if(slickCarousel.currentSlide()) {
      if(slickCarousel.currentSlide().url === "/images/slide-placeholder.png") {
        return m("div", { class: "placeholderSlide__text" }, [
          m("p", m.trust("Drop an <b>image</b> here from <b>Library</b><br>or")),
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
            href: "#",
            class: "btn btn-lg btn-primary"
          }, "Browse")
        ]);
      }
    }
  }

  var content = function(ctrl) {
    return [
      m(imageDialog),
      m(videoPreview, ctrl.video(), slickCarousel.slides()),
      m("main", { class: "main-container" }, [
        m("section", { id: "video-container" }, [
          m(".row", [
            m(".col-xs-6", [
              m(videoPlayback, {
                provider: ctrl.videoInfo().provider,
                videoId: ctrl.videoInfo().videoId,
                onReady: ctrl.initPlayer
              })
            ]),
            m(".col-xs-6", [
              m("figure", {
                class: "placeholderSlide",
                id: "slide-placeholder",
                config: ctrl.initDragger
              }, [
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
                  href: "#",
                }, [
                  m("img", {
                    src: slickCarousel.currentSlide() ? slickCarousel.currentSlide().url : "/images/slide-placeholder.png",
                    class: "img-responsive"
                  }),
                  showBrowse()
                ])
              ])
            ])
          ]),
          m(".clearfix .mgv25", [
            m("p", { class: "text-left no-margin-bottom" }, "Start: " + ctrl.svalue())
          ]),
          (ctrl.isPlayerReady()) ? m("#slider") : m(loader),
          m("footer", { class: "buttons row" }, [
            m("div", { class: "col-xs-7" }, [
              m("button", {
                onclick: ctrl.newSlide,
                class: 'btn btn-primary btn-md icon-inside--left',
                title: "New slide"
              }, [
                m("i", { class: "fa fa-plus" }),
                "Add new slide"
              ]),
              m("button[type=submit]", {
                onclick: function() {
                  if(slickCarousel.slides().length > 1) {
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
                    }).catch(swal.noop)
                  }
                },
                class: 'btn btn-danger btn-square btn-space',
                title: "Delete",
                "data-toggle": "tooltip",
                "data-placement": "top",
                config: function(element, isInit, context) {
                  if (!isInit)
                    $(element).tooltip()
                }
              }, [
                m("i", { class: "fa fa-trash-o" })
              ])
            ]),
            m("div", { class: "col-xs-5 text-right" }, [
              m("button[type=submit]", {
                onclick: ctrl.saveSlide,
                class: 'btn btn-success btn-md',
                title: "Save"
              }, 'Save slide'),
              m("button[type=submit]", {
                onclick: function(event) {
                  event.preventDefault();
                  videoPreview.show();
                },
                class: 'btn btn-success btn-md btn-space',
                title: "Preview"
              }, "Show Preview")
            ])
          ])
        ]),
        m(slickCarousel, {
          selectCallback: function(slide) {
            ctrl.highlightSlide(slide);
            // to enable video
            ctrl.player.seek(slide.start);
          }
        }, slickCarousel.slides())
      ])
    ];
  };

  return {
    controller: function() {
      var ctrl = this;

      ctrl.video = m.prop({});
      ctrl.videoInfo = m.prop({});
      ctrl.currentLibraryImage = m.prop();
      ctrl.errors = m.prop({});
      ctrl.player = {};
      ctrl.isPlayerReady = m.prop(false);
      ctrl.slider = m.prop();
      ctrl.svalue = m.prop("00:00:00");
      ctrl.drake = m.prop();

      if(Session.isExpired()) {
        m.route("/signin");
      }

      document.body.addEventListener("library:image:select", function(e) {
        ctrl.currentLibraryImage(e.detail);
      }, false);

      ctrl.selectLibraryImage = function(image) {
        m.startComputation()
        slickCarousel.currentSlide().url = image.slide_url
        slickCarousel.currentSlide().thumb_url = image.thumb_url
        m.endComputation();
      },
      ctrl.onChangeSlider = function(values, handle, unencodedValues) {
        var currentValue = _.round(values[handle]);
        slickCarousel.currentSlide().start = currentValue;
        // to enable video
        ctrl.player.seek(currentValue);
      };

      ctrl.onUpdateSlider = function(values, handle, unencodedValues) {
        var currentValue = _.round(values[handle])

        var duration = new Date(currentValue * 1000).toISOString().substr(11, 8);

        m.startComputation();
        ctrl.svalue(duration);
        m.endComputation();

      };

      ctrl.initDragger = function(element, init, context) {
        if( !init ) {
          ctrl.drake(
            dragger.init({
              containers: {
                from: 'image-library',
                to: 'slide-placeholder'
              },
              onDropCallback: function() {
                ctrl.selectLibraryImage(ctrl.currentLibraryImage());
              }
            })
          );
        }
      };

      // the first argument is the DOM element;
      // the second argument is false if the element has just been created and true otherwise;
      // the third argument is the context – it allows you to define
      // extra behaviour before the element is removed from the DOM.
      // Probably the best way to think about this in a jQuery way
      // is that config is a bit like DOM ready
      ctrl.initPlayer = function(element, init, context) {
        if( !init ) {
          // to enable video
          ctrl.player = plyr.setup('.video_player', {
            //['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'captions', 'fullscreen']
            controls: ['play', 'mute', 'volume', 'current-time']
          })[0];

          ctrl.player.on('ready', function(event) {
            m.startComputation();
            ctrl.isPlayerReady(true);
            m.endComputation();

            if(_.isEmpty(slickCarousel.slides())) {
              var slide = Slide.resetModel({
                start: 0,
                connectColor: Color.sample()
              });

              slickCarousel.addSlide(slide);
              slickCarousel.currentSlide(slide);
            }

            ctrl.slider(Slider.init('slider', {
              start: slickCarousel.slides().map(function(slide) {
                return slide.start;
              }),
              max: ctrl.player.getDuration(),
              onChange: ctrl.onChangeSlider,
              onUpdate: ctrl.onUpdateSlider
            }));

            ctrl.highlightSlide(_.first(slickCarousel.slides()));

            ctrl.paintConnects();
          });

          // if(_.isEmpty(slickCarousel.slides())) {
          //   var slide = Slide.resetModel({
          //     start: 0,
          //     connectColor: Color.sample()
          //   });
          //
          //   slickCarousel.addSlide(slide);
          //   slickCarousel.currentSlide(slide);
          // }
          //
          // ctrl.slider(Slider.init('slider', {
          //   start: slickCarousel.slides().map(function(slide) {
          //     return slide.start;
          //   }),
          //   max: 180, // ctrl.player.getDuration(),
          //   onChange: ctrl.onChangeSlider,
          //   onUpdate: ctrl.onUpdateSlider
          // }));
          //
          // ctrl.highlightSlide(_.first(slickCarousel.slides()));
          //
          // ctrl.paintConnects();

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
          Video.current(video.data);
          Project.current(video.data.project);
          // this is important to be here: it renders correctly
          // the current slide
          slickCarousel.slides(video.data.slides);
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
              slickCarousel.updateSlide(slickCarousel.currentSlide(), response.data);
              slickCarousel.currentSlide(
                _.assign(slickCarousel.currentSlide(), response.data)
              );

              swal({
                type: 'success',
                title: 'Slide saved!',
                timer: 1500
              }).catch(swal.noop);

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
            }).catch(swal.noop);
          }
        } else {
          return Slide.update(ctrl.video()).then(function(response) {
            slickCarousel.updateSlide(slickCarousel.currentSlide(), response.data);
            slickCarousel.currentSlide(
              _.assign(slickCarousel.currentSlide(), response.data)
            );

            swal({
              type: 'success',
              title: 'Slide saved!',
              timer: 1500
            }).catch(swal.noop);

          }, function(response) {
            ctrl.errors(response.errors);
          })
        }
      };

      ctrl.deleteSlide = function(event) {
        Slide.resetModel(slickCarousel.currentSlide());

        if(Slide.isNewRecord()) {
          ctrl.postDeleteAction();
        } else {
          Slide.delete(ctrl.video()).then(function(response) {
            ctrl.postDeleteAction();
          }, function(response) {
            ctrl.errors(response.errors);
          })
        }
      };

      ctrl.postDeleteAction = function() {
        slickCarousel.removeSlide();
        ctrl.refreshSlider(slickCarousel.slides())
        var slide = _.first(slickCarousel.slides())
        slickCarousel.currentSlide(slide);
        ctrl.highlightSlide(slide);
      };

      ctrl.newSlide = function(event) {
        event.preventDefault();

        var lastValue = _.last(slickCarousel.slides()).start;
        var newValue = lastValue + 10;
        var videoDuration = ctrl.player.getDuration();

        if(lastValue === videoDuration) {
          swal({
            title: 'Slide time exceeded',
            text: "You reached maximum allowed time for this video",
            type: 'info',
            confirmButtonText: 'Ok'
          }).catch(swal.noop);

          return;
        }

        var slide = Slide.resetModel({
          start: ((newValue < videoDuration) ? newValue : videoDuration),
          connectColor: Color.sample()
        });

        slickCarousel.addSlide(slide);
        slickCarousel.currentSlide(slide);
        ctrl.refreshSlider(slickCarousel.slides());
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
          // to enable video
          max: ctrl.player.getDuration(), // max: 180,
          onChange: ctrl.onChangeSlider,
          onUpdate: ctrl.onUpdateSlider
        }));

        ctrl.paintConnects();
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

      ctrl.paintConnects = function() {
        var connects = ctrl.slider().target.getElementsByClassName('noUi-connect');
        _.forEach(connects, function(element, idx) {
          element.style.backgroundColor = slickCarousel.slides()[idx].connectColor;
        });
      };

      Video.bindProviders();

      ctrl.getVideo(m.route.param("videoId"));

    },
    view: mixinLayout(content, 'edit')
  };
})();

export default editVideo;
