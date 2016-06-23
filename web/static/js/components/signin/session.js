import Videosync from '../../videosync';

var Session = {
  url: '/sessions',
  defaultOptions: {
    unwrapSuccess: function(response) {
      if(response)
        return response.data;
    },
    unwrapError: function(response) {
      return response.error;
    },
  },
  extract: function(xhr, xhrOptions) {
    if (xhr.status > 200)
      Session.token = _.last(
        _.split(
          xhr.getResponseHeader("Authorization"),
          " "
        )
      )
    else
      return xhr.responseText
  },
  token: null,
  create: function() {
    return m.request(
      $.extend({
        method: "POST",
        url: Videosync.baseUrl + this.url,
        config: function(xhr) {
          xhr.setRequestHeader("accept", "application/json");
          xhr.setRequestHeader("content-type", "application/json");
        },
        extract: extract
      }, defaultOptions)
    );
  }
};

export default Session;
