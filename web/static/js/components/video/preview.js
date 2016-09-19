import Videosync from '../../videosync';
import Slide from '../../models/slide';
import Video from '../../models/video';
import videoPlayback from './video_playback';

var preview = {
  controller: function(video) {
    var videoInfo = Video.info(video.url);

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
        }
      },
      videoInfo: function() {
        return videoInfo;
      }
    };
  },
  view: function(ctrl) {
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
        m("figure", { class: "placeholder" }, [
          m("img", {
            src: "/images/contentplaceholder.png",
            class: "img-responsive"
          })
        ])
      ])
    ]);
  }
}

export default preview;
