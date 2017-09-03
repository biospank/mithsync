import Videosync from '../videosync';
import Session from './session';

var Layout = (() => {
  var url = '/projects/projectId/videos/videoId/layout';

  return {
    model: {},
    update: (video) => {
      return m.request({
        method: "PUT",
        url: Videosync.apiBaseUrl() +
          _.replace(_.replace(url, 'projectId', video.project_id), 'videoId', video.id) + "/" + this.model.id,
        data: { layout: this.model },
        config: (xhr) => {
          xhr.setRequestHeader("accept", "application/json");
          xhr.setRequestHeader("content-type", "application/json");
          xhr.setRequestHeader("Authorization", Videosync.realm + " " + Session.token());
        }
      });
    },
  };
})();

export default Layout;
