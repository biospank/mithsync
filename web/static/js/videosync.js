var Videosync = {
  domain: "http://localhost:4000",
  apiBaseUrl: function() {
    return this.domain + "/api";
  },
  realm: "Videosync"
};

export default Videosync;
