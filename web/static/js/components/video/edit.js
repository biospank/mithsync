import mixinLayout from "../layout/mixin_layout";
import Session from "../../models/session";
import Video from "../../models/video";
import Slider from "../../models/slider";
import videoPlayback from "./video_playback";

var editVideo = (function() {

  var content = function(ctrl) {
    return [
      m("header", { class: "text-right" }, [
        m("a", { class: "btn btn-success" }, "Save"),
        m("a", { class: "btn btn-success" }, "Save and Exit")
      ]),
      m(".row", [
        m(".col-sm-6", [
          m(videoPlayback, {
            provider: ctrl.videoInfo().provider,
            videoId: ctrl.videoInfo().id,
            onReady: ctrl.initPlayer
          })
          // m(".video_player",
          //   {
          //     "data-type": "youtube", //"vimeo",
          //     "data-video-id": "_WgrfEaAM4Y", //"180519312",
          //     config: function(element, isInitialised, context) {
          //       console.log(element);
          //       console.log(isInitialised);
          //       console.log(context);
          //       plyr.setup('.video_player');
          //     }
          //   }
          // )
        ]),
        m(".col-sm-6", [
          m("div", [
            m("img", { src: "/images/contentplaceholder.png", class: "img-responsive" })
          ])
        ])
      ]),
      m(".clearfix", [
        m("div", { id: "slider", config: ctrl.initializeSlider })
      ]),
      m("footer", { class: "text-right" }, [
        m("a", { class: "btn btn-success" }, "Add Contents")
      ])
    ];
  };

  return {
    controller: function() {
      var ctrl = this;

      ctrl.video = m.prop({});
      ctrl.videoInfo = m.prop({});
      ctrl.errors = m.prop({});
      ctrl.player = {};

      if(Session.isExpired()) {
        m.route("/signin");
      }

      ctrl.initializeSlider = function() {
        Slider.init("slider");
      };

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
            controls: ['play', 'progress', 'current-time', 'mute', 'volume']
          })[0];

          ctrl.player.on('ready', function(event) {
            console.log('ready!');
            var duration = moment("2015-01-01").startOf('day')
              .seconds(ctrl.player.getDuration())
              .format('HH:mm:ss');
            console.log(duration);
          });

          ctrl.player.on('error', function(error) {
            console.log(error);
          });

          ctrl.player.on('seeked', function(event) {
            console.log(event);
            console.log("seeked");
          });

          ctrl.player.on('stalled', function(event) {
            console.log(event);
            console.log("stalled");
          });

          ctrl.player.on('timeupdate', function(event) {
            var duration = moment("2015-01-01").startOf('day')
              .seconds(ctrl.player.getCurrentTime())
              .format('HH:mm:ss');
            console.log(duration);
          });
          //console.log(ctrl.player);
          // m.endComputation();
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

      Video.init();

      ctrl.getVideo(m.route.param("videoId"));

    },
    view: mixinLayout(content)
  };
})();

export default editVideo;
