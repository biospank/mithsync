import Session from "./session";
import Videosync from '../videosync';

var User = (function() {
  var url = '/users';

  return {
    getCurrent: function(opts = {}) {
      return m.request(_.assign({
        method: "GET",
        url: Videosync.apiBaseUrl() + url + '/current',
        config: function(xhr) {
          xhr.setRequestHeader("accept", "application/json");
          xhr.setRequestHeader("Authorization", Videosync.realm + " " + Session.token())
        }
      }, opts));
    }
  };
})();

export default User;
