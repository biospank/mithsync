import Videosync from '../videosync';
import Session from './session';

var Slide = (function() {
  const slidePlaceHolder = "/images/contentplaceholder.png";
  var url = '/videos/videoId/slides';
  var model = {};

  return {
    validate: function() {
      if(model.url === slidePlaceHolder) {
        return false;
      } else {
        return true;
      }
    },
    resetModel: function(slide) {
      if(slide !== undefined) {
        model = slide;
      } else {
        model = {
          url: slidePlaceHolder,
          start: 0,
          end: 40
        };
      }

      return model;
    },
    create: function(videoId) {
      return m.request({
        method: "POST",
        url: Videosync.apiBaseUrl() +
          _.replace(url, 'videoId', videoId),
        data: { slide: model },
        config: function(xhr) {
          xhr.setRequestHeader("accept", "application/json");
          xhr.setRequestHeader("content-type", "application/json");
          xhr.setRequestHeader("Authorization", Videosync.realm + " " + Session.token());
        }
      });
    },
    update: function(videoId, id) {
      return m.request({
        method: "PUT",
        url: Videosync.apiBaseUrl() +
          _.replace(url, 'videoId', videoId) + "/" + id,
        data: { slide: model },
        config: function(xhr) {
          xhr.setRequestHeader("accept", "application/json");
          xhr.setRequestHeader("content-type", "application/json");
          xhr.setRequestHeader("Authorization", Videosync.realm + " " + Session.token());
        }
      });
    },
    show: function(videoId, id) {
      return m.request({
        method: "GET",
        url: Videosync.apiBaseUrl() +
          _.replace(url, 'videoId', videoId) + "/" + id,
        config: function(xhr) {
          xhr.setRequestHeader("accept", "application/json");
          xhr.setRequestHeader("Authorization", Videosync.realm + " " + Session.token())
        }
      });
    },
    delete: function(videoId, id) {
      // console.log(videoId);
      // console.log(id);

      return m.request(
        {
          method: "DELETE",
          url: Videosync.apiBaseUrl() +
            _.replace(url, 'videoId', videoId) + "/" + id,
          config: function(xhr) {
            xhr.setRequestHeader("accept", "application/json");
            xhr.setRequestHeader("Authorization", Videosync.realm + " " + Session.token())
          }
        }
      );
    }
  };
})();

export default Slide;
