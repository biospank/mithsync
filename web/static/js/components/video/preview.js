import Videosync from '../../videosync';
import Slide from '../../models/slide';
import Video from '../../models/video';
import videoPlayback from './video_playback';

var preview = (function() {
  var player = {};

  return {
    pause: function() {
      player.pause();
    },
    controller: function(video, slides) {
      var videoInfo = Video.info(video.url);
      var currentSlide = undefined;
      var timeVector = [];
      var slider = null;

      var inRange = function(progress, idx1, idx2) {
        return _.inRange(progress, timeVector[idx1], (timeVector[idx2] || 100000));
      };

      var updateSlide = function(event) {
        var currentSec = _.floor(event.detail.plyr.getCurrentTime());

        if(currentSlide) {
          var currentSlideIndex = _.findIndex(slides, currentSlide);

          if(inRange(currentSec, currentSlideIndex, (currentSlideIndex + 1))) {
            return;
          }
        }

        currentSlide = _.find(slides, function(slide, index, collection) {
          if(inRange(currentSec, index, (index + 1))) {
            Reveal.slide(index);
            slider.goTo(index);
            return true;
          }

          return false;
        });
      };

      var onReady = function(element, isInit, context) {
        if( !isInit ) {
          player = plyr.setup('.video-player-watch', {
            //['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'captions', 'fullscreen']
            controls: ['play', 'progress', 'current-time', 'mute', 'volume', 'current-time']
          })[0];

          // player.on('ready', function(event) {
          //   console.log('player ready!');
          // });

          player.on('timeupdate', _.throttle(updateSlide, 1000, {
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
              pagination: false
          });

          slider = $("#owl-slider").data("owlCarousel");

        }
      };

      var injectRevealSlides = function() {
        if(_.isEmpty(slides)) {
          return m("section[hidden]", {
            'class': 'future',
            'aria-hidden': true,
            'style': 'display: none;'
          })
        } else {
          return slides.map(function(slide) {
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

      var injectSliderSlides = function() {
        if(_.isEmpty(slides)) {
          return m("")
        } else {
          return slides.map(function(slide) {
            return m("", [
              m("figure", {
                class: "img-thumbnail",
              }, [
                m("a", {
                  href: "#",
                  onclick: function(event) {
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
            ])
          });
        }
      };

      var showTitle = function() {
        if(Video.model.layout().show_title) {
          return m("h3", Video.model.title());
        } else {
          return "";
        }
      };

      var showDescriptionFor = function(layout) {
        if(Video.model.layout().show_description) {
          var description = null;

          switch (layout) {
            case 1:
              description = m("h4", Video.model.description());
              break;
            case 2:
            case 3:
              description = m("div", Video.model.description());
              break;
          }

          return description;
        } else {
          return "";
        }
      };

      var showVideo = function() {
        return m(videoPlayback, {
          class: '.video-player-watch',
          provider: videoInfo.provider,
          videoId: videoInfo.videoId,
          onReady: onReady
        });
      };

      var showReveal = function() {
        return m(".reveal", {}, [
          m(".slides", [
            injectRevealSlides()
          ])
        ]);
      };

      var showSlider = function() {
        return m(".owl-carousel", {
          id: "owl-slider",
          config: toggleSlider
        }, [
          injectSliderSlides()
        ]);
      };

      var toggleSlider = function(element, isInit, context) {
        if(Video.model.layout().show_slider) {
          element.style.display = 'block';
        } else {
          element.style.display = 'none'
        }
      };

      return {
        buildLayout: function() {
          var layout;
          switch (parseInt(Video.model.layout().theme)) {
            case 1:
              layout = [
                m(".row", [
                  showTitle(),
                  showDescriptionFor(1),
                  m(".col-xs-6", [
                    showVideo()
                  ]),
                  m(".col-xs-6", [
                    showReveal()
                  ])
                ]),
                showSlider()
              ]
              break;
            case 2:
              layout = [
                m(".row", [
                  showTitle(),
                  m(".col-xs-4", [
                    showVideo(),
                    showDescriptionFor(2)
                  ]),
                  m(".col-xs-8", [
                    showReveal()
                  ])
                ]),
                showSlider()
              ]
              break;
            case 3:
              layout = [
                m(".row", [
                  showTitle(),
                  m(".col-xs-8", [
                    showVideo()
                  ]),
                  m(".col-xs-4", [
                    showReveal(),
                    showDescriptionFor(3)
                  ])
                ]),
                showSlider()
              ]
              break;
          }

          return layout;
        },
        videoInfo: function() {
          return videoInfo;
        },
        setTimeVector: function(slides) {
          timeVector = slides.map(function(slide) { return slide.start; });
        }
      };
    },
    view: function(ctrl, video, slides) {
      ctrl.setTimeVector(slides);

      return m("", [
        ctrl.buildLayout()
      ]);
    }
  };
})();

export default preview;
