var Videosync = {
  domain: window.location.origin,
  apiBaseUrl: function() {
    return this.domain + "/api";
  },
  realm: "Videosync"
};

export default Videosync;
