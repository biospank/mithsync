import Videosync from '../videosync';
import Session from './session'

var Video = {
  url: '/videos',
  urlParser: {},
  model: {
    title: m.prop(""),
    description: m.prop(""),
    url: m.prop("")
  },
  create: function(args) {
    return m.request(_.assign({
        method: "POST",
        url: Videosync.apiBaseUrl() + this.url,
        data: { video: this.model },
        config: function(xhr) {
          xhr.setRequestHeader("accept", "application/json");
          xhr.setRequestHeader("content-type", "application/json");
          xhr.setRequestHeader("Authorization", Videosync.realm + " " + Session.token());
        }
      }, args)
    );
  },
  all: function(params, args) {
    return m.request(_.assign({
        method: "GET",
        url: Videosync.apiBaseUrl() +
          this.url + "?" + m.route.buildQueryString(params),
        config: function(xhr) {
          xhr.setRequestHeader("accept", "application/json");
          xhr.setRequestHeader("Authorization", Videosync.realm + " " + Session.token())
        }
      }, args)
    );
  },
  show: function(id) {
    return m.request({
      method: "GET",
      url: Videosync.apiBaseUrl() +
        this.url + "/" + id,
      config: function(xhr) {
        xhr.setRequestHeader("accept", "application/json");
        xhr.setRequestHeader("Authorization", Videosync.realm + " " + Session.token())
      }
    });
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
  },
  init: function() {
    this.urlParser = new UrlParser();
    this.urlParser.bind(new Vimeo());
    this.urlParser.bind(new YouTube());
  },
  info: function(url) {
    return urlParser.parse(url);
    //   /*
    //   * Tested URLs:
    // ko   var url = 'http://youtube.googleapis.com/v/4e_kz79tjb8?version=3';
    // ok  url = 'https://www.youtube.com/watch?feature=g-vrec&v=Y1xs_xPb46M';
    // ok  url = 'http://www.youtube.com/watch?feature=player_embedded&v=Ab25nviakcw#';
    // ok  url = 'http://youtu.be/Ab25nviakcw';
    // ok  url = 'http://www.youtube.com/watch?v=Ab25nviakcw';
    // ok  url = '<iframe width="420" height="315" src="http://www.youtube.com/embed/Ab25nviakcw" frameborder="0" allowfullscreen></iframe>';
    // ko  url = '<object width="420" height="315"><param name="movie" value="http://www.youtube-nocookie.com/v/Ab25nviakcw?version=3&amp;hl=en_US"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><embed src="http://www.youtube-nocookie.com/v/Ab25nviakcw?version=3&amp;hl=en_US" type="application/x-shockwave-flash" width="420" height="315" allowscriptaccess="always" allowfullscreen="true"></embed></object>';
    // ok  url = 'http://i1.ytimg.com/vi/Ab25nviakcw/default.jpg';
    // ok  url = 'https://www.youtube.com/watch?v=BGL22PTIOAM&feature=g-all-xit';
    // ko  url = 'BGL22PTIOAM';
    //   */
  }
};

export default Video;
