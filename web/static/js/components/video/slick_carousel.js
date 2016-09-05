var slickCarousel = {
  controller: function(args, slides) {
    return {
      onReady: function(element, isInitialized, context) {
        if(!isInitialized)
          $(element).slick(args['opts']);
      }
    }
  },
  view: function(ctrl, args, slides) {
    return m("", { class: args['class'], config: ctrl.onReady }, [
      [1,2,3,4,5,6,7,8,9].map(function(element) {
        return m("h3.active", element);
      })
    ]);
  }
};

export default slickCarousel;
