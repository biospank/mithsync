var slickItem = {
  view: function(ctrl, args, slide, active){
    ctrl.slide = slide;
    ctrl.active = active;

    // return m(".col-xs-3 .col-sm-3 .col-md-2 .col-lg-1", [
    return m(".col-xs-2 .col-sm-2 .col-md-2 .col-lg-1", [
      m("figure", {
        class: "img-thumbnail" + (ctrl.active ? ' active' : ''),
        onclick: function() {
          if(args.selectCallback)
            args.selectCallback(ctrl.slide);
        },
        onmouseover: function() {
          if(args.mouseOverCallback)
            args.mouseOverCallback(ctrl.slide);
        },
        onmouseout: function() {
          if(args.mouseOutCallback)
            args.mouseOutCallback(ctrl.slide);
        }
      }, [
        // m("i", { class: "fa fa-bookmark bookmark-color", "aria-hidden": true, style: "color: " + ctrl.slide.connectColor }),
        m("a", {}, [
          m("img", {
            src: ctrl.slide.thumb_url,
            class: "img-responsive"
          })
        ])
      ])
    ]);
  }
}

export default slickItem;
