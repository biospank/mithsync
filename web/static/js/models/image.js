import Videosync from '../videosync';
import Session from './session'
import Util from '../util/util'

var Image = {
  url: '/images',
  all: function(params, args) {
    return m.request(_.assign({
        method: "GET",
        url: Videosync.apiBaseUrl() +
          this.url + "?" + Util.objectToQueryString(params),
        config: function(xhr) {
          xhr.setRequestHeader("accept", "application/json");
          xhr.setRequestHeader("Authorization", Videosync.realm + " " + Session.token())
        }
      }, args)
    );
  }
};

export default Image;
