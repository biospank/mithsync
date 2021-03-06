import Videosync from '../videosync';

var Contact = {
  url: '/contacts',
  model: {
    name: m.stream(""),
    email: m.stream(""),
    phone: m.stream(""),
    message: m.stream("")
  },
  resetModel: function() {
    this.model.name("");
    this.model.email("");
    this.model.phone("");
    this.model.message("");
  },
  create: function(args) {
    return m.request(_.assign({
        method: "POST",
        url: Videosync.apiBaseUrl() + this.url,
        data: { contact: this.model },
        config: function(xhr) {
          xhr.setRequestHeader("accept", "application/json");
          xhr.setRequestHeader("content-type", "application/json");
        }
      }, args)
    );
  }
};

export default Contact;
