var Pagination = function() {
  return {
    oninit({attrs}) {
      this.pageInfo = attrs.pageInfo;

      this.paramsFor = (pageNumber) => {
        return _.assign(this.pageInfo.defaultParams || {}, { page: pageNumber });
      };

      this.prevAvailable = () => {
        return this.pageInfo.pageNumber > 1;
      };

      this.nextAvailable = () => {
        return this.pageInfo.pageNumber < this.pageInfo.totalPages;
      };

    },
    view({state}) {
      if(state.pageInfo && state.pageInfo.totalPages > 1) {
        return m("nav", { class: "text-right" }, [
          m("ul", { class: "pagination" }, [].concat(
            m("li", {}, [
              m("a", {
                href: "#",
                onclick: (event) => {
                  event.preventDefault();
                  if(state.prevAvailable())
                    state.pageInfo.xhr(state.paramsFor(state.pageInfo.pageNumber - 1));
                  else
                    void(0);
                },
                "aria-label": "Precedente",
                class: state.prevAvailable() ? "active" : "disabled"
              }, [
                m("span", { "aria-hidden": "true" }, m.trust("&laquo;"))
              ])
            ])).concat(
              (Array.apply(null, Array(state.pageInfo.totalPages))).map((_, idx) => {
                return m(new PaginationLink(), {
                  action: (event) => {
                    event.preventDefault();
                    state.pageInfo.xhr(state.paramsFor(idx + 1));
                  },
                  idx: (idx + 1),
                  currentPage: state.pageInfo.pageNumber
                });
              })
            ).concat(
            m("li", {}, [
              m("a", {
                href: "#",
                onclick: (event) => {
                  event.preventDefault();
                  if(state.nextAvailable())
                    state.pageInfo.xhr(state.paramsFor(state.pageInfo.pageNumber + 1));
                  else
                    void(0);
                },
                "aria-label": "Successiva",
                class: state.nextAvailable() ? "active" : "disabled"
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
  };
}

var PaginationLink = function() {
  return {
    oninit({attrs}) {
      this.action = attrs.action;
      this.idx = attrs.idx;
      this.currentPage = attrs.currentPage;
    },
    view({state}) {
      return m("li", {
        class: (state.currentPage === state.idx) ? "active" : ""
      }, [
        m("a", {
          href: "#",
          onclick: state.action
        }, state.idx)
      ]);
    }
  };
}

export default Pagination;
