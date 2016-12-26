import slickItem from './slick_item';
import Slide from "../../models/slide";
import Color from '../../models/color';

var slickCarousel = (function() {
  var carousel = {};

  carousel.slides = [];
  carousel.currentSlide = Slide.resetModel();

  return {
    slides: function(slides) {
      if (arguments.length) {
        carousel.slides = slides.map(function(slide) {
          slide.connectColor = Color.sample();

          return slide;
        })
      }

      return carousel.slides;
    },
    currentSlide: function(slide) {
      if (arguments.length) {
        carousel.currentSlide = slide;
      }

      return carousel.currentSlide;
    },
    slideIndex: function(slide) {
      return _.indexOf(carousel.slides, slide);
    },
    slideByIndex: function(index) {
      return _.nth(carousel.slides, index);
    },
    addSlide: function(slide) {
      carousel.slides.push(slide);
    },
    removeSlide: function() {
      _.remove(carousel.slides, carousel.currentSlide);
    },
    updateSlide: function(oldSlide, newSlide) {
      _.assign(_.find(carousel.slides, oldSlide), newSlide);
    },
    refreshCurrentSlide: function() {
      m.redraw()
    },
    view: function(ctrl, args, slides) {
      carousel.slides = slides;

      return m("section", { class: "slidesheet pb-90", config: ctrl.onReady }, [
        m(".row", [
          carousel.slides.map(function(slide) {
            return m(slickItem, {
              selectCallback: function(slide) {
                carousel.currentSlide = slide;

                if(args.selectCallback)
                  args.selectCallback(slide);

              },
              mouseOverCallback: function(slide) {
                if(args.mouseOverCallback)
                  args.mouseOverCallback(slide);
              },
              mouseOutCallback: function(slide) {
                if(args.mouseOutCallback)
                  args.mouseOutCallback(slide);
              }
            }, slide, _.isEqual(slide, carousel.currentSlide));
          })
        ])
      ]);
    }
  }
})();

export default slickCarousel;
