import Videosync from '../../videosync';
import Slide from '../../models/slide';
import Video from '../../models/video';
import Layout from '../../models/layout';
import videoPlayback from './video_playback';

var preview = (function() {
  var player = {};
  var slider = null;

  return {
    reinitSlider() {
      if(slider)
        slider.reinit();
    },
    pause() {
      player.pause();
    },
    oninit({attrs}) {
      this.videoInfo = Video.info(attrs.video.url);
      this.slides = attrs.slides;
      this.currentSlide = undefined;
      this.timeVector = [];
      this.sliderSlides = [];

      this.inRange = (progress, idx1, idx2) => {
        return _.inRange(progress, this.timeVector[idx1], (this.timeVector[idx2] || 100000));
      };

      this.updateSlide = (event) => {
        var currentSec = _.floor(event.detail.plyr.getCurrentTime());

        if(this.currentSlide) {
          var currentSlideIndex = _.findIndex(this.sliderSlides, this.currentSlide);

          if((currentSlideIndex !== -1) &&
            this.inRange(currentSec, currentSlideIndex, (currentSlideIndex + 1))) {
            return;
          }
        }

        this.currentSlide = _.find(this.sliderSlides, (slide, index, collection) => {
          if(this.inRange(currentSec, index, (index + 1))) {
            Reveal.slide(index);
            slider.goTo(index);
            return true;
          }

          return false;
        });
      };

      this.onReady = (vnode) => {
        player = plyr.setup('.video-player-watch', {
          //['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'captions', 'fullscreen']
          controls: ['play', 'progress', 'current-time', 'mute', 'volume', 'current-time']
        })[0];

        // player.on('ready', function(event) {
        //   console.log('player ready!');
        // });

        player.on('timeupdate', _.throttle(this.updateSlide, 1000, {
          'leading': true,
          'trailing': false
        }));

        // player.on('timeupdate', _.debounce(function(event) {
        //   console.log(player.getCurrentTime());
        // }, 1000, {
        //   'leading': true,
        //   'trailing': false,
        //   'maxWait': 1000
        // }));

        Reveal.initialize({
          // Flags if the presentation is running in an embedded mode,
          // i.e. contained within a limited portion of the screen
          embedded: true,
          // Display controls in the bottom right corner
          controls: false,
          // Display a presentation progress bar
          progress: false,
          // Enable keyboard shortcuts for navigation
          keyboard: false,
          // Enable the slide overview mode
          overview: false,
          // Vertical centering of slides
          center: false,
          // Enables touch navigation on devices with touch input
          touch: false,
          // Enables touch navigation on devices with touch input
          help: false,
          // Transition style
          transition: 'slide', // none/fade/slide/convex/concave/zoom
          // Transition speed
          transitionSpeed: 'slow', // default/fast/slow
          // Transition style for full page slide backgrounds
          // backgroundTransition: 'none',
          // Number of slides away from the current that are visible
          viewDistance: 1,
          width: 'auto',
          height: 'auto'
        });

        $("#owl-slider").owlCarousel({
            navigation: true,
            pagination: false,
            items: 10,
            itemsDesktop : [1199,10],
            itemsDesktopSmall : [980,5],
            itemsTablet: [768,5],
            itemsMobile : false,
            navigationText: ["<i class='glyphicon glyphicon-menu-left'></i>", "<i class='glyphicon glyphicon-menu-right'></i>"]
        });

        slider = $("#owl-slider").data("owlCarousel");

      };

      this.injectRevealSlides = () => {
        if(_.isEmpty(this.sliderSlides)) {
          return m("section[hidden]", {
            'class': 'future',
            'aria-hidden': true,
            'style': 'display: none;'
          }, [
            m("img", {
              src: Slide.placeHolder()
            })
          ])
        } else {
          return this.sliderSlides.map((slide) => {
            return m("section[hidden]", {
              'class': 'future',
              'aria-hidden': true,
              'style': 'display: none;'
            }, [
              m("img", {
                src: slide.url
              })
            ])
          });
        }
      };

      this.injectSliderSlides = () => {
        if(_.isEmpty(this.sliderSlides)) {
          return m("figure", {
            class: "img-thumbnail mhorizontal-5",
          }, [
            m("a", { href: "#",}, [
              m("img", {
                src: Slide.thumbPlaceHolder(),
                class: "img-responsive"
              })
            ])
          ])
        } else {
          return this.sliderSlides.map((slide) => {
            return m("figure", {
              class: "img-thumbnail mhorizontal-5",
            }, [
              m("a", {
                href: "#",
                onclick: (event) => {
                  event.preventDefault();
                  player.seek(slide.start);
                }
              }, [
                m("img", {
                  src: slide.thumb_url,
                  class: "img-responsive"
                })
              ])
            ])
          });
        }
      };

      this.showTitle = () => {
        if(Layout.model.show_title) {
          return m("h3", { class: "mt-0 mb-10 zinkroo-preview__title" }, Video.model.title());
        } else {
          return "";
        }
      };

      this.showDate = () => {
        if(Layout.model.show_date) {
          return m("label", { class: "mt-0 mb-10 zinkroo-preview__date" }, moment(Video.model.inserted_at()).format('lll'));
        } else {
          return "";
        }
      };

      this.showDescriptionFor = (layout) => {
        if(Layout.model.show_description) {
          var description = null;

          switch (layout) {
            case 1:
              description = m("p", { class: "mb-10 zinkroo-preview__description" }, Video.model.description());
              break;
            case 2:
            case 3:
              description = m("div", { class: "mb-10 zinkroo-preview__description" }, Video.model.description());
              break;
          }

          return description;
        } else {
          return "";
        }
      };

      this.showVideo = () => {
        return m(videoPlayback, {
          class: '.video-player-watch mb-10',
          provider: this.videoInfo.provider,
          videoId: this.videoInfo.videoId,
          onReady: this.onReady
        });
      };

      this.showReveal = () => {
        return m(".reveal mb-10", {}, [
          m(".slides", [
            this.injectRevealSlides()
          ])
        ]);
      };

      this.showSlider = () => {
        return m(".p-all-side-25 zinkroo-preview__slide", {
          oncreate: this.toggleSlider,
          onupdate: this.toggleSlider
        }, [
          m(".owl-carousel", {
            id: "owl-slider"
          }, [
            this.injectSliderSlides()
          ])
        ]);
      };

      this.toggleSlider = ({dom}) => {
        if(Layout.model.show_slider) {
          dom.style.display = 'block';
        } else {
          dom.style.display = 'none'
        }
      };

      this.buildLayout = () => {
        let layout = null;

        switch (parseInt(Layout.model.theme)) {
          case 1:
            layout = [
              m("div", { class: "p-all-side-25 layout--1" }, [
                this.showTitle(),
                this.showDescriptionFor(1),
                this.showDate(),
                m(".row", [
                  m(".col-xs-6", [
                    this.showVideo()
                  ]),
                  m(".col-xs-6", [
                    this.showReveal()
                  ])
                ])
              ]),
              this.showSlider()
            ]
            break;
          case 2:
            layout = [
              m("div", { class: "p-all-side-25 layout--2" }, [
                m(".row", [
                  m(".col-xs-4", [
                    this.showVideo(),
                    this.showTitle(),
                    this.showDescriptionFor(2),
                    this.showDate()
                  ]),
                  m(".col-xs-8", [
                    this.showReveal()
                  ])
                ])
              ]),
              this.showSlider()
            ]
            break;
          case 3:
            layout = [
              m("div", { class: "p-all-side-25 layout--3" }, [
                m(".row", [
                  m(".col-xs-8", [
                    this.showVideo()
                  ]),
                  m(".col-xs-4", [
                    this.showReveal(),
                    this.showTitle(),
                    this.showDescriptionFor(3),
                    this.showDate()
                  ])
                ])
              ]),
              this.showSlider()
            ]
            break;
        }

        return layout;
      },

      this.setTimeVector = (slides) => {
        this.timeVector = slides.map((slide) => { return slide.start; });
      };

      this.setSliderSlides = (slides) => {
        this.sliderSlides = slides;
      }

      return {
      };
    },
    view({state}) {
      state.setSliderSlides(state.slides);
      state.setTimeVector(state.slides);

      return m(".zinkroo-preview", [
        state.buildLayout()
      ]);
    }
  };
})();

export default preview;
