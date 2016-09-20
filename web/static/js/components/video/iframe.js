// import Videosync from '../../videosync';
//
// var iFrame = {
//   controller: function(videoId) {
//     return {
//       onReady: function(element, isInit, context) {
//         if(!isInit) {
//           console.log(element);
//           element.src = Videosync.domain + '/watch/' + videoId;
//         }
//       }
//     };
//   },
//   view: function(ctrl, videoId) {
//     return m('iframe', {
//       // src: Videosync.domain + '/watch/' + videoId,
//       width: '800px',
//       height: '400px',
//       frameborder: '0',
//       config: ctrl.onReady
//     })
//   }
// }
//
// export default iFrame;
