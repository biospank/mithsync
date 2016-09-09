var slickItem = {
  view: function(ctrl, args, slide){
    ctrl.slide = slide;

    return m("figure", {
      class: "pull-left thumbnail",
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
