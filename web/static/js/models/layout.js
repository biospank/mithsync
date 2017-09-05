import Videosync from '../videosync';
import Session from './session';

const Layout = {
  url: '/projects/projectId/videos/videoId/layout',
  model: {},
  update: function(video) {
    return m.request({
      method: "PUT",
      url: Videosync.apiBaseUrl() +
        _.replace(_.replace(this.url, 'projectId', video.project_id), 'videoId', video.id) + "/" + this.model.id,
      data: { layout: this.model },
      config: (xhr) => {
        xhr.setRequestHeader("accept", "application/json");
        xhr.setRequestHeader("content-type", "application/json");
        xhr.setRequestHeader("Authorization", Videosync.realm + " " + Session.token());
      }
    });
  }
};

export default Layout;
