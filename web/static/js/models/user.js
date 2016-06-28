import Videosync from '../videosync';
import Session from './session'

var User = {
  url: '/users',
  extract: Session.extract,
  model: {
    email: m.prop(""),
    password: m.prop(""),
    password_confirmation: m.prop("")
  },
  create: function(args) {
    return m.request(_.assign({
        method: "POST",
        url: Videosync.apiBaseUrl() + this.url,
        data: { user: this.model },
        config: function(xhr) {
          xhr.setRequestHeader("accept", "application/json");
          xhr.setRequestHeader("content-type", "application/json");
        },
        extract: this.extract
      }, args)
    );
  }
};

export default User;
