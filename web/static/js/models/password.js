import Videosync from '../videosync';

var Password = {
  url: '/reset/',
  reqHeaders: function(xhr) {
    xhr.setRequestHeader("accept", "application/json");
    xhr.setRequestHeader("content-type", "application/json");
  },
  model: {
    email: m.prop(""),
    password: m.prop(""),
    password_confirmation: m.prop("")
  },
  resetRequest: function(args) {
    return m.request(_.assign({
        method: "POST",
        url: Videosync.apiBaseUrl() + this.url,
        data: { user: { email: this.model.email } },
        config: Password.reqHeaders
      }, args)
    );
  },
  reset: function(args) {
    return m.request(_.assign({
        method: "PUT",
        url: Videosync.apiBaseUrl() + this.url + args.resetCode,
        data: {
          user: {
            password: this.model.password,
            password_confirmation: this.model.password_confirmation
          }
        },
        config: Password.reqHeaders
      }, args)
    );
  }
};

export default Password;
