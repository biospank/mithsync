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
                id: "slide-placeholder"
              }, [
                m("a", {
                  onclick: function(event) {
                    event.preventDefault();
                    imageDialog.show({
                      selectCallback: function(image) {
                        ctrl.selectLibraryImage(image)
                      }
                    });
                  },
                  href: "#",
                }, [
                  m("img", {
                    src: slickCarousel.currentSlide() ? slickCarousel.currentSlide().url : "/images/slide-placeholder.png",
                    class: "img-responsive"
                  })
                ])
              ])
            ])
          ]),
          m(".mt-60", [
            (ctrl.isPlayerReady()) ? m("#slider") : m(loader),
          ]),
          m("footer", { class: "buttons row" }, [
            m("div", { class: "col-xs-6" }, [
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
                      confirmButtonColor: '#3085d6',
                      cancelButtonColor: '#d33',
                      confirmButtonText: 'Yes, delete it!',
                      showLoaderOnConfirm: true,
                      preConfirm: function() {
                        return new Promise(function(resolve, reject) {
                          ctrl.deleteSlide();
                          resolve()
                        })
                      }
                    }).catch(swal.noop)
                  }
                },
                class: 'btn btn-danger btn-square btn-space--left-5',
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
            m("div", { class: "col-xs-6 text-right" }, [
              m("button[type=submit]", {
                onclick: function(event) {
                  event.preventDefault();
                  videoPreview.show();
                },
                class: 'btn btn-success btn-md icon-inside--left',
                title: "Preview"
              }, [
                m("i", { class: "fa fa-eye" }),
                "Show Preview"
              ]),
              m("button[type=submit]", {
                onclick: ctrl.saveAll,
                class: 'btn btn-success btn-md btn-space--left-5 icon-inside--left',
                title: "Save"
              }, [
                m("i", { class: "fa fa-save" }),
                "Save"
              ])
            ])
          ])
        ]),
        m(slickCarousel, {
          selectCallback: function(slide) {
            ctrl.highlightSlide(slide);
            ctrl.showVideoFrame(slide);
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
      ctrl.unsaved = m.prop(false);

      if(Session.isExpired()) {
        m.route("/signin");
      }

      document.body.addEventListener("library:image:select", function(e) {
        ctrl.currentLibraryImage(e.detail);
      }, false);

      document.body.addEventListener("library:image:initDragger", function(e) {
        ctrl.initDragger();
      }, false);

      ctrl.selectLibraryImage = function(image) {
        m.startComputation()
        slickCarousel.currentSlide().url = image.slide_url
        slickCarousel.currentSlide().thumb_url = image.thumb_url
        m.endComputation();
        ctrl.unsaved(true);
      };

      ctrl.onChangeSlider = function(values, handle, unencodedValues) {
        var currentValue = _.round(values[handle]);
        slickCarousel.currentSlide().start = currentValue;
        // to enable video
        ctrl.player.seek(currentValue);
        ctrl.unsaved(true);
      };

      ctrl.onUpdateSlider = function(values, handle, unencodedValues) {
        // var currentValue = _.round(values[handle])
        //
        // var duration = new Date(currentValue * 1000).toISOString().substr(11, 8);
        //
        // m.startComputation();
        // ctrl.svalue(duration);
        // m.endComputation();

      };

      ctrl.onunload = function(e) {
        var requestedUrl = m.route();

        if (ctrl.unsaved()) {
          e.preventDefault();
          swal({
            type: 'warning',
            title: 'Unsaved changes',
            text: "Some changes has not been saved.\nDo you want to leave this page anyway?",
            confirmButtonText: "Yes, leave this page!", // "Don't save!"
            showCancelButton: true,
            focusCancel: true
          }).then(function () {
            ctrl.unsaved(false);
            m.route(requestedUrl);
          }).catch(swal.noop)
        }
      }

      ctrl.initDragger = function() {
        dragger.init({
          containers: {
            from: 'image-library',
            to: 'slide-placeholder'
          },
          onDropCallback: function() {
            ctrl.selectLibraryImage(ctrl.currentLibraryImage());
          }
        });
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

          // needed to update data in video detail
          // since it is rendered before loading video
          var reloadEvent = new CustomEvent("video:edit:reload");
          document.body.dispatchEvent(reloadEvent);

          // this is important to be here: it renders correctly
          // the current slide
          slickCarousel.slides(video.data.slides);
          slickCarousel.currentSlide(_.first(slickCarousel.slides()));
        }, function(response) {
          ctrl.errors(response.errors);
        })
      };

      ctrl.saveAll = function() {
        var slideIndex = slickCarousel.slideIndex(slickCarousel.currentSlide())
        swal({
          title: 'Saving...',
          width: '400px',
          allowOutsideClick: false,
          allowEscapeKey: false,
          showConfirmButton: false,
          onOpen: function(progress) {
            swal.showLoading();
            return Slide.saveAll(ctrl.video(), slickCarousel.slides()).then(function(response) {
              slickCarousel.slides(response.data);
              slickCarousel.currentSlide(slickCarousel.slideByIndex(slideIndex));
              swal.close();
              swal({
                type: 'success',
                width: '400px',
                showConfirmButton: false,
                timer: 1000
              }).catch(swal.noop);
              ctrl.unsaved(false);
            }, function(response) {
              swal.close();
              swal({
                type: 'error',
                title: 'Oops!! something went wrong',
                text: 'Please, try again later or let us know about that',
                showCloseButton: true,
                showConfirmButton: false
              }).catch(swal.noop);
            })
          }
        }).catch(swal.noop);
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
        ctrl.showVideoFrame(slide);
        ctrl.unsaved(true);
      };

      ctrl.showVideoFrame = function(slide) {
        // to enable video
        ctrl.player.seek(slide.start);
        ctrl.player.play();
        ctrl.player.pause();
      }

      ctrl.highlightSlide = function(slide) {
        // var duration = new Date(slide.start * 1000).toISOString().substr(11, 8);
        //
        // m.startComputation();
        // ctrl.svalue(duration);
        // m.endComputation();

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
