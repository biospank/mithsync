var pagination = {
  pageInfo: {},
  paramsFor: function(pageNumber) {
    return _.assign(this.pageInfo.defaultParams || {}, { page: pageNumber });
  },
  prevAvailable: function() {
    return this.pageInfo.pageNumber > 1;
  },
  nextAvailable: function() {
    return this.pageInfo.pageNumber < this.pageInfo.totalPages;
  },
  view: function(ctrl, pageInfo) {
    this.pageInfo = pageInfo;

    if(this.pageInfo.totalPages > 1) {
      return m("nav", {}, [
        m("ul", { class: "pagination" }, [].concat(
          m("li", {}, [
            m("a", {
              href: "#",
              onclick: function(event) {
                event.preventDefault();
                if(this.prevAvailable())
                  this.pageInfo.xhr(this.paramsFor(this.pageInfo.pageNumber - 1));
                else
                  void(0);
              }.bind(this),
              "aria-label": "Precedente",
              class: this.prevAvailable() ? "active" : "disabled"
            }, [
              m("span", { "aria-hidden": "true" }, m.trust("&laquo;"))
            ])
          ])).concat(
            (Array.apply(null, Array(this.pageInfo.totalPages))).map(function(_, idx) {
              return m(paginationLink, {
                action: function(event) {
                  event.preventDefault();
                  this.pageInfo.xhr(this.paramsFor(idx + 1));
                }.bind(this),
                idx: (idx + 1),
                currentPage: this.pageInfo.pageNumber
              });
            }.bind(this))
          ).concat(
          m("li", {}, [
            m("a", {
              href: "#",
              onclick: function(event) {
                event.preventDefault();
                if(this.nextAvailable())
                  this.pageInfo.xhr(this.paramsFor(this.pageInfo.pageNumber + 1));
                else
                  void(0);
              }.bind(this),
              "aria-label": "Successiva",
              class: this.nextAvailable() ? "active" : "disabled"
            }, [
              m("span", { "aria-hidden": "true" }, m.trust("&raquo;"))
            ])
          ])
        ))
      ])
    } else {
      return m('br');
    }
  }
}

var paginationLink = {
  view: function(ctrl, attrs) {
    this.action = attrs.action;
    this.idx = attrs.idx;
    this.currentPage = attrs.currentPage;

    return m("li", {
      class: (this.currentPage === this.idx) ? "active" : ""
    }, [
      m("a", {
        href: "#",
        onclick: this.action
      }, this.idx)
    ]);
  }
}

export default pagination;
