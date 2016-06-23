import Videosync from '../../videosync';

var Session = {
  url: '/sessions',
  extract: function(xhr, xhrOptions) {
    if (xhr.status === 201) {
      Session.token = _.last(
        _.split(
          xhr.getResponseHeader("Authorization"),
          " "
        )
      );
    } else if (xhr.status === 404) {
      Session.model.errorField("email");
      var data = JSON.parse(xhr.response);
      Session.model.errorMessage(data.error.message);
    } else if (xhr.status === 401) {
      Session.model.errorField("password");
      var data = JSON.parse(xhr.response);
      Session.model.errorMessage(data.error.message);
    }

    return xhr.response;

  },
  token: null,
  model: {
    email: m.prop(""),
    password: m.prop(""),
    errorField: m.prop(null),
    errorMessage: m.prop(null)
  },
  create: function() {
    return m.request({
      method: "POST",
      url: Videosync.apiBaseUrl() + this.url,
      data: { user: this.model },
      config: function(xhr) {
        xhr.setRequestHeader("accept", "application/json");
        xhr.setRequestHeader("content-type", "application/json");
      },
      extract: this.extract
    });
  }
};

export default Session;
