import Videosync from '../videosync';

var Session = {
  url: '/signin',
  extract: function(xhr, xhrOptions) {
    if (xhr.status >= 200) {
      Session.token(
        _.last(
          _.split(
            xhr.getResponseHeader("Authorization"),
            " "
          )
        )
      );
    }

    return xhr.response;

  },
  token: function(value) {
    if (arguments.length)
      store.set('token', value)

    return store.get('token')
  },
  model: {
    email: m.prop(""),
    password: m.prop("")
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
  },
  reset: function() {
    this.token(null);
    this.model.email("");
    this.model.password("");
  }
};

export default Session;
