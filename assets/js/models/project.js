import Videosync from '../videosync';
import Session from './session';

var Project = {
  url: '/projects',
  recent_url: '/projects/recent',
  model: {
    name: m.stream("")
  },
  current: m.stream({}),
  create: function() {
    return m.request({
      method: "POST",
      url: Videosync.apiBaseUrl() + this.url,
      data: { project: this.model },
      config: function(xhr) {
        xhr.setRequestHeader("accept", "application/json");
        xhr.setRequestHeader("content-type", "application/json");
        xhr.setRequestHeader("Authorization", Videosync.realm + " " + Session.token());
      }
    });
  },
  update: function(id) {
    return m.request({
      method: "PUT",
      url: Videosync.apiBaseUrl() + this.url + "/" + id,
      data: { project: this.model },
      config: function(xhr) {
        xhr.setRequestHeader("accept", "application/json");
        xhr.setRequestHeader("content-type", "application/json");
        xhr.setRequestHeader("Authorization", Videosync.realm + " " + Session.token());
      }
    });
  },
  all: function(params, args) {
    return m.request(
      {
        method: "GET",
        url: Videosync.apiBaseUrl() +
          this.url + "?" + m.buildQueryString(params),
        config: function(xhr) {
          xhr.setRequestHeader("accept", "application/json");
          xhr.setRequestHeader("Authorization", Videosync.realm + " " + Session.token())
        }
      }
    );
  },
  recent: function(args) {
    return m.request(_.assign({
        method: "GET",
        url: Videosync.apiBaseUrl() + this.recent_url,
        config: function(xhr) {
          xhr.setRequestHeader("accept", "application/json");
          xhr.setRequestHeader("Authorization", Videosync.realm + " " + Session.token())
        }
      }, args)
    );
  },
  delete: function(id) {
    return m.request(
      {
        method: "DELETE",
        url: Videosync.apiBaseUrl() +
          this.url + "/" + id,
        config: function(xhr) {
          xhr.setRequestHeader("accept", "application/json");
          xhr.setRequestHeader("Authorization", Videosync.realm + " " + Session.token())
        }
      }
    );
  }
};

export default Project;
