import Videosync from '../videosync';
import Session from './session'

var Activation = {
  url: '/activate/',
  extract: Session.extract,
  model: {
    email: m.prop(""),
    activation_code: m.prop("invalid-code")
  },
  confirm: function(args) {
    return m.request(_.assign({
        method: "PUT",
        url: Videosync.apiBaseUrl() + this.url + this.model.activation_code(),
        config: function(xhr) {
          xhr.setRequestHeader("accept", "application/json");
          xhr.setRequestHeader("content-type", "application/json");
        },
        extract: this.extract
      }, args)
    );
  },
  resend: function(args) {
    return m.request({
      method: "GET",
      url: Videosync.apiBaseUrl() + this.url + '/resend',
      data: { email: this.model.email() },
      config: function(xhr) {
        xhr.setRequestHeader("accept", "application/json");
      }
    });
  }
};

export default Activation;
