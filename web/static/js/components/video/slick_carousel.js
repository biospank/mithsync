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
    prevSlide: function(index) {
      return _.nth(carousel.slides, index - 1);
    },
    nextSlide: function(index) {
      var slide = _.nth(carousel.slides, index + 1);

      if(slide !== undefined)
        return slide;
      else
        return _.first(carousel.slides);
    },
    addSlide: function(slide) {
      var currentSlidePosition = _.indexOf(carousel.slides, carousel.currentSlide);
      carousel.slides.splice((currentSlidePosition + 1), 0, slide);
    },
    appendSlide: function(slide) {
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
    hasCheckedSlides: function() {
      return _.some(carousel.slides, ['checked', true])
    },
    checkedSlides: function() {
      return _.partition(carousel.slides, function(slide) {
        return slide.checked;
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

              },
              mouseOverCallback: function(slide) {
                if(args.mouseOverCallback)
                  args.mouseOverCallback(slide);
              },
              mouseOutCallback: function(slide) {
                if(args.mouseOutCallback)
                  args.mouseOutCallback(slide);
              },
              checkCallback: function(checked) {
                slide.checked = checked;
              }
            }, slide, _.isEqual(slide, carousel.currentSlide));
          })
        ])
      ]);
    }
  }
})();

export default slickCarousel;
