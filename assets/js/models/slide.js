import Videosync from '../videosync';
import Session from './session';

var Slide = (function() {
  const slidePlaceHolder = "/images/slide-placeholder.png";
  const thumbPlaceHolder = "/images/thumb-placeholder.png";
  var url = '/projects/projectId/videos/videoId/slides';
  var model = {};

  return {
    placeHolder() {
      return slidePlaceHolder;
    },
    thumbPlaceHolder() {
      return thumbPlaceHolder;
    },
    validate: function() {
      if(model.url === slidePlaceHolder) {
        return false;
      } else {
        return true;
      }
    },
    resetModel: function(slide) {
      if(slide !== undefined) {
        model = _.assign({
          url: slidePlaceHolder,
          thumb_url: thumbPlaceHolder,
          start: 0
        }, slide);
      } else {
        model = {
          url: slidePlaceHolder,
          thumb_url: thumbPlaceHolder,
          start: 0
        };
      }

      return model;
    },
    isNewRecord: function() {
      return model.id ? false : true;
    },
    create: function(video) {
      return m.request({
        method: "POST",
        url: Videosync.apiBaseUrl() +
          _.replace(
            _.replace(url, 'projectId', video.project_id),
            'videoId', video.id
          ),
        data: { slide: model },
        config: function(xhr) {
          xhr.setRequestHeader("accept", "application/json");
          xhr.setRequestHeader("content-type", "application/json");
          xhr.setRequestHeader("Authorization", Videosync.realm + " " + Session.token());
        }
      });
    },
    update: function(video) {
      return m.request({
        method: "PUT",
        url: Videosync.apiBaseUrl() +
          _.replace(_.replace(url, 'projectId', video.project_id), 'videoId', video.id) + "/" + model.id,
        data: { slide: model },
        config: function(xhr) {
          xhr.setRequestHeader("accept", "application/json");
          xhr.setRequestHeader("content-type", "application/json");
          xhr.setRequestHeader("Authorization", Videosync.realm + " " + Session.token());
        }
      });
    },
    saveAll: function(video, slides) {
      return m.request({
        method: "POST",
        url: Videosync.apiBaseUrl() +
          _.replace(
            _.replace(url, 'projectId', video.project_id),
            'videoId', video.id
          ) + '/save_all',
        data: { slides: slides },
        config: function(xhr) {
          xhr.setRequestHeader("accept", "application/json");
          xhr.setRequestHeader("content-type", "application/json");
          xhr.setRequestHeader("Authorization", Videosync.realm + " " + Session.token());
        }
      });
    },
    show: function(video) {
      return m.request({
        method: "GET",
        url: Videosync.apiBaseUrl() +
          _.replace(_.replace(url, 'projectId', video.project_id), 'videoId', video.id) + "/" + model.id,
        config: function(xhr) {
          xhr.setRequestHeader("accept", "application/json");
          xhr.setRequestHeader("Authorization", Videosync.realm + " " + Session.token())
        }
      });
    },
    delete: function(video) {
      return m.request(
        {
          method: "DELETE",
          url: Videosync.apiBaseUrl() +
            _.replace(_.replace(url, 'projectId', video.project_id), 'videoId', video.id) + "/" + model.id,
          config: function(xhr) {
            xhr.setRequestHeader("accept", "application/json");
            xhr.setRequestHeader("Authorization", Videosync.realm + " " + Session.token())
          }
        }
      );
    },
    deleteAll: function(video, slides) {
      return m.request({
        method: "POST",
        url: Videosync.apiBaseUrl() +
          _.replace(
            _.replace(url, 'projectId', video.project_id),
            'videoId', video.id
          ) + '/delete_all',
        data: { slides: slides },
        config: function(xhr) {
          xhr.setRequestHeader("accept", "application/json");
          xhr.setRequestHeader("content-type", "application/json");
          xhr.setRequestHeader("Authorization", Videosync.realm + " " + Session.token());
        }
      });
    }
  };
})();

export default Slide;
