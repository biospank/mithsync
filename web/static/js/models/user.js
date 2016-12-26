import Session from "./session";
import Videosync from '../videosync';

var User = (function() {
  var url = '/users';

  return {
    resetModel: function(data) {
      this.model.id(data.id);
      this.model.email(data.email);
      this.model.password("");
      this.model.password_confirmation("");
    },
    model: {
      id: m.prop(undefined),
      email: m.prop(""),
      password: m.prop(""),
      password_confirmation: m.prop("")
    },
    getCurrent: function(opts = {}) {
      return m.request(_.assign({
        method: "GET",
        url: Videosync.apiBaseUrl() + url + '/current',
        config: function(xhr) {
          xhr.setRequestHeader("accept", "application/json");
          xhr.setRequestHeader("Authorization", Videosync.realm + " " + Session.token())
        }
      }, opts));
    },
    update: function() {
      return m.request({
        method: "PUT",
        url: Videosync.apiBaseUrl() + url + "/" + this.model.id(),
        data: { user: this.model },
        config: function(xhr) {
          xhr.setRequestHeader("accept", "application/json");
          xhr.setRequestHeader("content-type", "application/json");
          xhr.setRequestHeader("Authorization", Videosync.realm + " " + Session.token());
        }
      });
    },
  };
})();

export default User;
