import Videosync from '../videosync';
import Session from './session';

var Slide = {
  url: '/videos/videoId/slides',
  model: {
    url: m.prop("/images/contentplaceholder.png"),
    start: m.prop(0),
    end: m.prop(40),
  },
  create: function(args) {
    return m.request(_.assign({
        method: "POST",
        url: Videosync.apiBaseUrl() + this.url,
        data: { slide: this.model },
        config: function(xhr) {
          xhr.setRequestHeader("accept", "application/json");
          xhr.setRequestHeader("content-type", "application/json");
          xhr.setRequestHeader("Authorization", Videosync.realm + " " + Session.token());
        }
      }, args)
    );
  },
  update: function(videoId, id) {
    return m.request(_.assign({
        method: "PUT",
        url: Videosync.apiBaseUrl() +
          _.replace(this.url, 'videoId', videoId) + "/" + id,
        data: { slide: this.model },
        config: function(xhr) {
          xhr.setRequestHeader("accept", "application/json");
          xhr.setRequestHeader("content-type", "application/json");
          xhr.setRequestHeader("Authorization", Videosync.realm + " " + Session.token());
        }
      }, args)
    );
  },
  show: function(videoId, id) {
    return m.request({
      method: "GET",
      url: Videosync.apiBaseUrl() +
        _.replace(this.url, 'videoId', videoId) + "/" + id,
      config: function(xhr) {
        xhr.setRequestHeader("accept", "application/json");
        xhr.setRequestHeader("Authorization", Videosync.realm + " " + Session.token())
      }
    });
  },
  delete: function(videoId, id) {
    return m.request(
      {
        method: "DELETE",
        url: Videosync.apiBaseUrl() +
          _.replace(this.url, 'videoId', videoId) + "/" + id,
        config: function(xhr) {
          xhr.setRequestHeader("accept", "application/json");
          xhr.setRequestHeader("Authorization", Videosync.realm + " " + Session.token())
        }
      }
    );
  }
};

export default Slide;
