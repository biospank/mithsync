var slickItem = {
  view: function(ctrl, args, slide, active){
    ctrl.slide = slide;
    ctrl.active = active;

    return m("figure", {
      class: "pull-left thumbnail" + (ctrl.active ? ' active' : ''),
      style: "cursor: pointer;",
      onclick: function() {
        if(args.selectCallback)
          args.selectCallback(ctrl.slide);
      }
    }, [
      m("img", {
        src: ctrl.slide.url,
        class: "img-responsive"
      }),
    ]);
  }
}

export default slickItem;
