var slickItem = {
  view: function(ctrl, args, slide, active){
    ctrl.slide = slide;
    ctrl.active = active;

    return m(".col-xs-6 .col-sm-4 .col-md-2", [
      m("figure", {
        class: "img-thumbnail" + (ctrl.active ? ' active' : ''),
        onclick: function() {
          if(args.selectCallback)
            args.selectCallback(ctrl.slide);
        }
      }, [
        m("a", {}, [
          m("img", {
            src: ctrl.slide.url,
            class: "img-responsive"
          })
        ])
      ])
    ]);
  }
}

export default slickItem;