import Videosync from '../../videosync';
import Slide from '../../models/slide';
import Video from '../../models/video';
import videoPlayback from './video_playback';

var preview = {
  controller: function(video) {
    var videoInfo = Video.info(video.url);
    var currentSlide = undefined;

    var updateSlide = function(event) {
      var currentSec = _.floor(event.detail.plyr.getCurrentTime());

      if(currentSlide)
        if(_.inRange(currentSec, currentSlide.start, (currentSlide.end + 1)))
          return;

      currentSlide = _.find(video.slides, function(slide, index, collection) {
        if(_.inRange(currentSec, slide.start, (slide.end + 1))) {
          Reveal.slide(index);
          return true;
        }

        return false;
      });
    }

    return {
      onReady: function(element, isInit, context) {
        if( !isInit ) {
          var player = plyr.setup('.video-player-watch', {
            //['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'captions', 'fullscreen']
            controls: ['play', 'progress', 'current-time', 'mute', 'volume', 'current-time']
          })[0];

          player.on('ready', function(event) {
            console.log('player ready!');
          });

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
            // Transition style for full page slide backgrounds
            backgroundTransition: 'none',
            // Number of slides away from the current that are visible
            viewDistance: 1,
            width: 'auto',
            height: 'auto'
          });
        }
      },
      videoInfo: function() {
        return videoInfo;
      }
    };
  },
  view: function(ctrl, video) {
    return m(".row", [
      m(".col-sm-6", [
        m(videoPlayback, {
          class: '.video-player-watch',
          provider: ctrl.videoInfo().provider,
          videoId: ctrl.videoInfo().videoId,
          onReady: ctrl.onReady
        })
      ]),
      m(".col-sm-6", [
        m(".reveal", {}, [
          m(".slides", [
            video.slides.map(function(slide) {
              return m("section", [
                m("img", {
                  src: slide.url
                })
              ])
            })
          ])
        ])
      ])
    ]);
  }
}

export default preview;
