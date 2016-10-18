import Videosync from '../videosync';
import Session from './session';
import UrlParser from '../util/urlParser';

var Video = {
  url: '/projects/projectId/videos',
  recent_url: '/videos/recent',
  urlParser: {},
  model: {
    title: m.prop(""),
    description: m.prop(""),
    url: m.prop("")
  },
  create: function(projectId, args) {
    return m.request(_.assign({
        method: "POST",
        url: Videosync.apiBaseUrl() +
          _.replace(this.url, 'projectId', projectId),
        data: { video: this.model },
        config: function(xhr) {
          xhr.setRequestHeader("accept", "application/json");
          xhr.setRequestHeader("content-type", "application/json");
          xhr.setRequestHeader("Authorization", Videosync.realm + " " + Session.token());
        }
      }, args)
    );
  },
  all: function(projectId, params, args) {
    return m.request(_.assign({
        method: "GET",
        url: Videosync.apiBaseUrl() +
          _.replace(this.url, 'projectId', projectId) +
          "?" + m.route.buildQueryString(params),
        config: function(xhr) {
          xhr.setRequestHeader("accept", "application/json");
          xhr.setRequestHeader("Authorization", Videosync.realm + " " + Session.token())
        }
      }, args)
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
  show: function(projectId, id) {
    return m.request({
      method: "GET",
      url: Videosync.apiBaseUrl() +
        _.replace(this.url, 'projectId', projectId) + "/" + id,
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
          _.replace(this.url, 'projectId', video.project_id) + "/" + video.id,
        config: function(xhr) {
          xhr.setRequestHeader("accept", "application/json");
          xhr.setRequestHeader("Authorization", Videosync.realm + " " + Session.token())
        }
      }
    );
  },
  bindProviders: function() {
    Video.urlParser = new UrlParser();
    Video.urlParser.addProvider('vimeo');
    Video.urlParser.addProvider('youtube');
  },
  info: function(url) {
    return Video.urlParser.parse(url);
    //   /*
    //   * Tested URLs:
    // ok   var url = 'http://youtube.googleapis.com/v/4e_kz79tjb8?version=3';
    // ok  url = 'https://www.youtube.com/watch?feature=g-vrec&v=Y1xs_xPb46M';
    // ok  url = 'http://www.youtube.com/watch?feature=player_embedded&v=Ab25nviakcw#';
    // ok  url = 'http://youtu.be/Ab25nviakcw';
    // ok  url = 'http://www.youtube.com/watch?v=Ab25nviakcw';
    // ok  url = '<iframe width="420" height="315" src="http://www.youtube.com/embed/Ab25nviakcw" frameborder="0" allowfullscreen></iframe>';
    // ok  url = '<object width="420" height="315"><param name="movie" value="http://www.youtube-nocookie.com/v/Ab25nviakcw?version=3&amp;hl=en_US"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><embed src="http://www.youtube-nocookie.com/v/Ab25nviakcw?version=3&amp;hl=en_US" type="application/x-shockwave-flash" width="420" height="315" allowscriptaccess="always" allowfullscreen="true"></embed></object>';
    // ok  url = 'http://i1.ytimg.com/vi/Ab25nviakcw/default.jpg';
    // ok  url = 'https://www.youtube.com/watch?v=BGL22PTIOAM&feature=g-all-xit';
    // ok  url = 'BGL22PTIOAM';
    // ok http://vimeo.com/12345
    // ok http://player.vimeo.com/video/12345
    // ok http://player.vimeo.com/video/12345?test=value1
    // ok http://player.vimeo.com/video/12345/?test=value1
    // ok http://vimeo.com/channels/vimeogirls/12345
    // ok http://vimeo.com/groups/shortfilms/videos/12345
    //   */
  }
};

export default Video;
