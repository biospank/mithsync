const slickItem = {
  oninit({attrs}) {
    this.slide = attrs.slide;
    this.active = attrs.active;

    this.checkId = _.once(() => {
      return _.uniqueId('check-');
    });
  },
  view({state, attrs}) {
    // return m(".col-xs-3 .col-sm-3 .col-md-2 .col-lg-1", [
    return m(".col-xs-2 .col-sm-2 .col-md-2 .col-lg-1", [
      m("figure", {
        class: "img-thumbnail" + (state.active ? ' active' : ''),
        onclick: () => {
          if(attrs.selectCallback)
            attrs.selectCallback(state.slide);
        },
        onmouseover: () => {
          if(attrs.mouseOverCallback)
            attrs.mouseOverCallback(state.slide);
        },
        onmouseout: () => {
          if(attrs.mouseOutCallback)
            attrs.mouseOutCallback(state.slide);
        }
      }, [
        m("div", { class: "flag-check" }, [
          m("input", {
            class: "magic-checkbox",
            type: "checkbox",
            name: "delete-" + state.checkId(),
            id: state.checkId(),
            onclick: function(e) {
              if(attrs.checkCallback)
                attrs.checkCallback(e.target.checked);
            },
            checked: state.slide.checked
          }),
          m("label", { for: state.checkId() })
        ]),
        m("label", { class: "bookmark-time text-right weight-regular" }, state.slide.start ),
        // m("i", { class: "fa fa-bookmark bookmark-color", "aria-hidden": true, style: "color: " + ctrl.slide.connectColor }),
        m("a", {}, [
          m("img", {
            src: state.slide.thumb_url,
            class: "img-responsive"
          })
        ])
      ])
    ]);
  }
}

export default slickItem;
