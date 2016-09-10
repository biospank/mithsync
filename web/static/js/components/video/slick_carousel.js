import slickItem from './slick_item';
import Slide from "../../models/slide";

var slickCarousel = (function() {
  var carousel = {};

  carousel.slides = [];
  carousel.currentSlide = Slide.resetModel();

  return {
    currentSlide: function(slide) {
      if (arguments.length)
        carousel.currentSlide = slide;

      return carousel.currentSlide;
    },
    addSlide: function(slide) {
      carousel.slides.push(slide);
    },
    removeSlide: function() {
      _.remove(carousel.slides, function(slide) {
        return slide.id === carousel.currentSlide.id;
      });
    },
    view: function(ctrl, args, slides) {
      carousel.slides = slides;

      return m("section", { class: "slidesheet", config: ctrl.onReady }, [
        m(".row", [
          carousel.slides.map(function(slide) {
            return m(slickItem, {
              selectCallback: function(slide) {
                carousel.currentSlide = slide;

                if(args.selectCallback)
                  args.selectCallback(slide);

              }
            }, slide, _.isEqual(slide, carousel.currentSlide));
          })
        ])
      ]);
    }
  }
})();

export default slickCarousel;
