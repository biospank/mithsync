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

var editVideo = (() => {
  var content = ({state}) => {
    if(state.video()) {
      return [
        m(imageDialog),
        m(videoPreview, {video: state.video(), slides: slickCarousel.slides()}),
        m("main", { class: "main-container" }, [
          m("section", { id: "video-container" }, [
            m(".row", [
              m(".col-xs-6", [
                m(videoPlayback, {
                  provider: state.videoInfo().provider,
                  videoId: state.videoInfo().videoId,
                  onReady: state.initPlayer
                })
              ]),
              m(".col-xs-6", [
                m("figure", {
                  class: "placeholderSlide",
                  id: "slide-placeholder"
                }, [
                  m("a", {
                    onclick: (event) => {
                      event.preventDefault();
                      imageDialog.show({
                        selectCallback: (image) => {
                          state.selectLibraryImage(image)
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
            m(".mt-80 mb-100", [
              (state.isPlayerReady()) ? m("#slider") : m(loader),
            ]),
            m("footer", { class: "buttons row" }, [
              m("div", { class: "col-xs-6" }, [
                m("button", {
                  onclick: state.newSlide,
                  class: 'btn btn-primary btn-md icon-inside--left',
                  title: "New slide"
                }, [
                  m("i", { class: "fa fa-plus" }),
                  "Add new slide"
                ]),
                m("button[type=submit]", {
                  onclick: () => {
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
                        preConfirm: () => {
                          return new Promise((resolve, reject) => {
                            state.deleteSlide();
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
                  oncreate: ({dom}) => {
                    $(dom).tooltip()
                  }
                }, [
                  m("i", { class: "fa fa-trash-o" })
                ])
              ]),
              m("div", { class: "col-xs-6 text-right" }, [
                m("button[type=submit]", {
                  onclick: (event) => {
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
                  onclick: state.saveAll,
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
            selectCallback: (slide) => {
              state.highlightSlide(slide);
              state.showVideoFrame(slide);
            },
            mouseOverCallback: (slide) => {
              if(slide !== slickCarousel.currentSlide())
                state.overHandle(slickCarousel.slideIndex(slide));
            },
            mouseOutCallback: (slide) => {
              if(slide !== slickCarousel.currentSlide())
                state.outHandle(slickCarousel.slideIndex(slide));
            },
            slides: slickCarousel.slides()
          })
        ])
      ];
    }
  };

  return {
    oninit(vnode) {
      this.video = m.stream(undefined);
      this.videoInfo = m.stream({});
      this.currentLibraryImage = m.stream();
      this.errors = m.stream({});
      this.player = {};
      this.isPlayerReady = m.stream(false);
      this.slider = m.stream();
      this.unsaved = m.stream(false);

      if(Session.isExpired()) {
        m.route.set("/signin");
      }

      document.body.addEventListener("library:image:select", (e) => {
        this.currentLibraryImage(e.detail);
      }, false);

      document.body.addEventListener("library:image:initDragger", (e) => {
        this.initDragger();
      }, false);

      this.selectLibraryImage = (image) => {
        slickCarousel.currentSlide().url = image.slide_url
        slickCarousel.currentSlide().thumb_url = image.thumb_url
        this.unsaved(true);
      };

      this.onChangeSlider = (values, handle, unencodedValues) => {
        this.syncSlide(_.round(values[handle]));
      };

      this.onUpdateSlider = (values, handle, unencodedValues) => {
        // var currentValue = _.round(values[handle])
        //
        // var duration = new Date(currentValue * 1000).toISOString().substr(11, 8);
        //
        // m.startComputation();
        // this.svalue(duration);
        // m.endComputation();

      };

      this.onSetSlider = (values, handle, unencodedValues) => {
        if(slickCarousel.slideIndex(slickCarousel.currentSlide()) === handle)
          this.syncSlide(_.round(values[handle]));
      };

      this.syncSlide = (currentValue) => {
        slickCarousel.currentSlide().start = currentValue;
        slickCarousel.refreshCurrentSlide();
        // // to enable video
        this.player.seek(currentValue);
        this.unsaved(true);
      };

      this.onunload = (e) => {
        var requestedUrl = m.route.get();

        if (this.unsaved()) {
          e.preventDefault();
          swal({
            type: 'warning',
            title: 'Unsaved changes',
            text: "Some changes has not been saved.\nDo you want to leave this page anyway?",
            confirmButtonText: "Yes, leave this page!", // "Don't save!"
            showCancelButton: true,
            focusCancel: true
          }).then(() => {
            this.unsaved(false);
            m.route.set(requestedUrl);
          }).catch(swal.noop)
        }
      }

      this.initDragger = () => {
        dragger.init({
          containers: {
            from: 'image-library',
            to: 'slide-placeholder'
          },
          onDropCallback: () => {
            this.selectLibraryImage(this.currentLibraryImage());
          }
        });
      };

      // the first argument is the DOM element;
      // the second argument is false if the element has just been created and true otherwise;
      // the third argument is the context – it allows you to define
      // extra behaviour before the element is removed from the DOM.
      // Probably the best way to think about this in a jQuery way
      // is that config is a bit like DOM ready
      this.initPlayer = (vnode) => {
        // to enable video
        this.player = plyr.setup('.video_player', {
          //['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'captions', 'fullscreen']
          // debug: true,
          controls: ['play', 'mute', 'volume', 'current-time']
        })[0];

        this.player.on('ready', (event) => {
          if(event.detail.plyr.getType() === 'youtube')
            this.setupSlider();
        });

        this.player.on('durationchange', (event) => {
          if(event.detail.plyr.getType() === 'vimeo')
            this.setupSlider();
        })
      };

      this.setupSlider = () => {
        this.isPlayerReady(true);
        m.redraw(true);

        if(_.isEmpty(slickCarousel.slides())) {
          var slide = Slide.resetModel({
            start: 0,
            connectColor: Color.sample()
          });

          slickCarousel.appendSlide(slide);
          slickCarousel.currentSlide(slide);
        }

        this.slider(Slider.init('slider', {
          start: slickCarousel.slides().map((slide) => {
            return slide.start;
          }),
          max: this.player.getDuration(),
          onChange: this.onChangeSlider,
          onUpdate: this.onUpdateSlider,
          onSet: this.onSetSlider
        }));

        this.highlightSlide(_.first(slickCarousel.slides()));

        this.paintConnects();
      };

      this.getVideo = (videoId) => {
        return Video.show(vnode.attrs.projectId, videoId).then((video) => {
          this.video(video.data);
          this.videoInfo(Video.info(this.video().url));
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
        }, (e) => {
          this.errors(JSON.parse(e.message).errors);
        })
      };

      this.saveAll = () => {
        var slideIndex = slickCarousel.slideIndex(slickCarousel.currentSlide())
        swal({
          title: 'Saving...',
          width: '400px',
          allowOutsideClick: false,
          allowEscapeKey: false,
          showConfirmButton: false,
          onOpen: (progress) => {
            swal.showLoading();
            return Slide.saveAll(this.video(), slickCarousel.slides()).then((response) => {
              slickCarousel.slides(response.data);
              slickCarousel.currentSlide(slickCarousel.slideByIndex(slideIndex));
              swal.close();
              swal({
                type: 'success',
                width: '400px',
                showConfirmButton: false,
                timer: 1000
              }).catch(swal.noop);
              this.unsaved(false);
            }, (response) => {
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

      this.deleteSlide = () => {
        if(slickCarousel.hasCheckedSlides()) {
          var [checkedSlides, unckeckedSlides] = slickCarousel.checkedSlides();

          var slidesToDelete = _.filter(checkedSlides, (slide) => {
            return slide.id !== undefined;
          });

          Slide.deleteAll(this.video(), slidesToDelete).then((response) => {
            this.postDeleteAction(unckeckedSlides);
          }, (e) => {
            this.errors(JSON.parse(e.message).errors);
          })
        } else {
          Slide.resetModel(slickCarousel.currentSlide());

          if(Slide.isNewRecord()) {
            this.postDeleteAction();
          } else {
            Slide.delete(this.video()).then((response) => {
              this.postDeleteAction();
            }, (e) => {
              this.errors(JSON.parse(e.message).errors);
            })
          }
        }
      };

      this.postDeleteAction = (slides) => {
        if(slides !== undefined) {
          slickCarousel.slides(slides);
          if(_.isEmpty(slickCarousel.slides())) {
            slickCarousel.appendSlide(
              Slide.resetModel({
                start: 0,
                connectColor: Color.sample()
              })
            );
          }
        } else {
          slickCarousel.removeSlide();
        }
        this.refreshSlider(slickCarousel.slides())
        var slide = _.first(slickCarousel.slides())
        slickCarousel.currentSlide(slide);
        this.highlightSlide(slide);
      };

      this.newSlide = (event) => {
        event.preventDefault();

        var currentSlideIndex = slickCarousel.slideIndex(slickCarousel.currentSlide());
        var currentValue = slickCarousel.currentSlide().start;
        var nextSlide = slickCarousel.slideByIndex(currentSlideIndex + 1);
        var newValue = currentValue + 10;
        var videoDuration = this.player.getDuration();

        if(nextSlide !== undefined) {
          var nextValue = nextSlide.start;
          var currentMargin = nextValue - currentValue;
          var minimumMargin = (this.slider().options.margin * 2) + 1;
          if(currentMargin < minimumMargin) {
            swal({
              title: 'Margin too short',
              text: "Not enough room between slides (min. " +
                minimumMargin.toString() + " sec.)",
              type: 'info',
              confirmButtonText: 'Ok'
            }).catch(swal.noop);

            return;
          } else if(newValue >= nextValue || _.inRange(newValue, nextValue - this.slider().options.margin, nextValue)) {
            newValue = nextValue - (this.slider().options.margin + 1)
          }
        }

        if(currentValue === videoDuration) {
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
        this.refreshSlider(slickCarousel.slides());
        this.highlightSlide(slide);
        this.showVideoFrame(slide);
        this.unsaved(true);
      };

      this.showVideoFrame = (slide) => {
        // to enable video
        this.player.seek(slide.start);
        this.player.play();
        this.player.pause();
      }

      this.highlightSlide = (slide) => {
        Slide.resetModel(slide);
        this.focusHandle(slickCarousel.slideIndex(slide));
        m.redraw()
      };

      this.refreshSlider = (slides) => {
        this.slider().destroy();
        this.slider(Slider.init('slider', {
          start: slides.map((slide) => {
            return slide.start;
          }),
          // to enable video
          max: this.player.getDuration(), // max: 180,
          onChange: this.onChangeSlider,
          onUpdate: this.onUpdateSlider,
          onSet: this.onSetSlider
        }));

        this.paintConnects();
      };

      this.seekHandle = (event) => {
        var allValues = this.slider().get();

        var idx = slickCarousel.slideIndex(slickCarousel.currentSlide())

        switch ( event.which ) {
          case 37:
            if(event.shiftKey) {
              this.changeSlide(slickCarousel.prevSlide(idx))
            } else {
              allValues[idx] = _.toString(_.toNumber(allValues[idx]) - 1);
              this.slider().set( allValues );
            }
            break;
          case 39:
            if(event.shiftKey) {
              this.changeSlide(slickCarousel.nextSlide(idx))
            } else {
              allValues[idx] = _.toString(_.toNumber(allValues[idx]) + 1);
              this.slider().set( allValues );
            }
            break;
        }
      }

      this.changeSlide = (slide) => {
        slickCarousel.currentSlide(slide);
        this.highlightSlide(slide);
        this.showVideoFrame(slide);
      };

      this.focusHandle = (index) => {
        var origins = this.slider().target.getElementsByClassName('noUi-origin');

        _.forEach(origins, (element, idx) => {
          var handle = element.querySelector('.noUi-handle');

          if(idx !== index) {
            element.setAttribute('disabled', true);
            handle.setAttribute('tabindex', -idx);
          } else {
            element.removeAttribute('disabled');
            handle.setAttribute('tabindex', idx);
            handle.focus();
            handle.addEventListener('keydown', this.seekHandle);
          }
        });
      };

      this.overHandle = (index) => {
        var origins = this.slider().target.getElementsByClassName('noUi-origin');
        var element = _.nth(origins, index);
        element.removeAttribute('disabled');
      };

      this.outHandle = (index) => {
        var origins = this.slider().target.getElementsByClassName('noUi-origin');
        var element = _.nth(origins, index);
        element.setAttribute('disabled', true);
      };

      this.paintConnects = () => {
        var connects = this.slider().target.getElementsByClassName('noUi-connect');
        _.forEach(connects, (element, idx) => {
          element.style.backgroundColor = slickCarousel.slides()[idx].connectColor;
        });
      };

      Video.bindProviders();

      this.getVideo(vnode.attrs.videoId);
      // this.getVideo(m.route.param("videoId"));

    },
    view: mixinLayout(content, 'edit')
  };
})();

export default editVideo;
