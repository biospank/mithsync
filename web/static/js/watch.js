import UrlParser from "./util/urlParser";

// $(document).ready(function() {
//   console.log('retrieving #video-player-watch tag');
//   var $playerTag = $('#video-player-watch');
//
//   if($playerTag) {
//     var urlParser = new UrlParser();
//
//     // urlParser.addProvider('vimeo');
//     urlParser.addProvider('youtube');
//     var videoInfo = urlParser.parse(url);
//
//     $playerTag.data('type', videoInfo.provider);
//     $playerTag.data('video-id', videoInfo.videoId);
//
//     var player = plyr.setup('#video-player-watch', {
//       //['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'captions', 'fullscreen']
//       controls: ['play', 'progress', 'current-time', 'mute', 'volume', 'current-time']
//     })[0];
//
//     player.on('ready', function(event) {
//       console.log('player ready!');
//     });
//   }
// })
