import Videosync from '../videosync';
import Session from './session'

var Registration = {
  url: '/signup',
  model: {
    email: m.stream(""),
    password: m.stream(""),
    password_confirmation: m.stream(""),
    accept_terms_and_conditions: m.stream(false)
  },
  create: function(args) {
    return m.request(_.assign({
        method: "POST",
        url: Videosync.apiBaseUrl() + this.url,
        data: { user: this.model },
        config: function(xhr) {
          xhr.setRequestHeader("accept", "application/json");
          xhr.setRequestHeader("content-type", "application/json");
        }
      }, args)
    );
  }
};

export default Registration;
