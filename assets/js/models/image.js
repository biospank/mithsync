import Videosync from '../videosync';
import Session from './session'

var Image = {
  url: '/projects/projectId/videos/videoId/images',
  all: function(urlParams, params, args) {
    return m.request(_.assign({
        method: "GET",
        url: Videosync.apiBaseUrl() +
          _.replace(_.replace(this.url, 'projectId', urlParams['projectId']), 'videoId',  urlParams['videoId']) +
          "?" + m.buildQueryString(params),
        config: function(xhr) {
          xhr.setRequestHeader("accept", "application/json");
          xhr.setRequestHeader("Authorization", Videosync.realm + " " + Session.token())
        }
      }, args)
    );
  },
  delete: function(urlParams, filename) {
    return m.request(
      {
        method: "DELETE",
        url: Videosync.apiBaseUrl() +
          _.replace(_.replace(this.url, 'projectId', urlParams['projectId']), 'videoId',  urlParams['videoId']) +
           "/" + filename,
        config: function(xhr) {
          xhr.setRequestHeader("accept", "application/json");
          xhr.setRequestHeader("Authorization", Videosync.realm + " " + Session.token())
        }
      }
    );
  }
};

export default Image;
