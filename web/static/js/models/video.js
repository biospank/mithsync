import Videosync from '../videosync';
import Session from './session';
import UrlParser from '../util/urlParser';

var Video = {
  url: '/projects/projectId/videos',
  recent_url: '/videos/recent',
  urlParser: {},
  model: {
    title: m.stream(""),
    description: m.stream(""),
    url: m.stream(""),
    layout: m.stream({}),
    inserted_at: m.stream("")
  },
  resetModel: function(video) {
    this.model.title(video.title);
    this.model.description(video.description);
    this.model.url(video.url);
    this.model.layout(video.layout);
    this.model.inserted_at(video.inserted_at);

    return this.model;
  },
  export: function(video) {
    // var code = '<div class="embed-responsive embed-responsive-16by9"> ' +
    //   '<iframe class="embed-responsive-item" " id="ifrm" scrolling="no" src="<%= domain %>/watch/<%= video.watch_code %>" data-zinrkoo-title="<%= video.title %>" data-zinkroo-description="<%= video.description %>" data-zinkroo-date="<%= video.inserted_at %>">' +
    //     'Your browser doesn\'t support iframes.' +
    //   '</iframe>' +
    // '</div>'

    var code = '<iframe width="100%" scrolling="no" frameborder="0" src="<%= domain %>/watch/<%= video.watch_code %>" data-zinkroo-title="<%= video.title %>" data-zinkroo-description="<%= video.description %>" data-zinkroo-date="<%= video.inserted_at %>">' +
        'Your browser doesn\'t support iframes.' +
      '</iframe>' +
      '<script src="<%= domain %>/js/iframeResizer.min.js"></script>' +
      '<script>iFrameResize()</script>'


    return _.template(code)({
      domain: Videosync.domain,
      video: video
    });
  },
  current: m.stream({}),
  create: function(projectId, args) {
    return m.request(
      {
        method: "POST",
        url: Videosync.apiBaseUrl() +
          _.replace(this.url, 'projectId', projectId),
        data: { video: this.model },
        config: function(xhr) {
          xhr.setRequestHeader("accept", "application/json");
          xhr.setRequestHeader("content-type", "application/json");
          xhr.setRequestHeader("Authorization", Videosync.realm + " " + Session.token());
        }
      }
    );
  },
  all: function(projectId, params) {
    return m.request(
      {
        method: "GET",
        url: Videosync.apiBaseUrl() +
          _.replace(this.url, 'projectId', projectId) +
          "?" + m.buildQueryString(params),
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
  update: function(video) {
    return m.request({
      method: "PUT",
      url: Videosync.apiBaseUrl() +
        _.replace(this.url, 'projectId', video.project_id) + "/" + video.id,
      data: { video: this.model },
      config: function(xhr) {
        xhr.setRequestHeader("accept", "application/json");
        xhr.setRequestHeader("content-type", "application/json");
        xhr.setRequestHeader("Authorization", Videosync.realm + " " + Session.token());
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
