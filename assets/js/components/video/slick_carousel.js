import slickItem from './slick_item';
import Slide from "../../models/slide";
import Color from '../../models/color';

var slickCarousel = (() => {
  var carousel = {};

  carousel.slides = [];
  carousel.currentSlide = Slide.resetModel();

  return {
    slides(slides) {
      if (arguments.length) {
        carousel.slides = slides.map((slide) => {
          slide.connectColor = Color.sample();

          return slide;
        })
      }

      return carousel.slides;
    },
    currentSlide(slide) {
      if (arguments.length) {
        carousel.currentSlide = slide;
      }

      return carousel.currentSlide;
    },
    slideIndex(slide) {
      return _.indexOf(carousel.slides, slide);
    },
    slideByIndex(index) {
      return _.nth(carousel.slides, index);
    },
    prevSlide(index) {
      return _.nth(carousel.slides, index - 1);
    },
    nextSlide(index) {
      var slide = _.nth(carousel.slides, index + 1);

      if(slide !== undefined)
        return slide;
      else
        return _.first(carousel.slides);
    },
    addSlide(slide) {
      var currentSlidePosition = _.indexOf(carousel.slides, carousel.currentSlide);
      carousel.slides.splice((currentSlidePosition + 1), 0, slide);
    },
    appendSlide(slide) {
      carousel.slides.push(slide);
    },
    removeSlide() {
      _.remove(carousel.slides, carousel.currentSlide);
    },
    updateSlide(oldSlide, newSlide) {
      _.assign(_.find(carousel.slides, oldSlide), newSlide);
    },
    refreshCurrentSlide() {
      m.redraw()
    },
    hasCheckedSlides() {
      return _.some(carousel.slides, ['checked', true])
    },
    checkedSlides() {
      return _.partition(carousel.slides, function(slide) {
        return slide.checked;
      });
    },
    oninit({attrs}) {
      this.args = attrs.args;
      carousel.slides = attrs.slides;

    },
    view({state, attrs}) {
      // return m("section", { class: "slidesheet", oncreate: state.onReady }, [
      return m("section", { class: "slidesheet" }, [
        m(".row", [
          carousel.slides.map((slide) => {
            return m(slickItem, {
              key: slide.id || 0,
              selectCallback: (slide) => {
                carousel.currentSlide = slide;

                if(attrs.selectCallback)
                  attrs.selectCallback(slide);

              },
              mouseOverCallback: (slide) => {
                if(attrs.mouseOverCallback)
                  attrs.mouseOverCallback(slide);
              },
              mouseOutCallback: (slide) => {
                if(attrs.mouseOutCallback)
                  attrs.mouseOutCallback(slide);
              },
              checkCallback: (checked) => {
                slide.checked = checked;
              },
              slide: slide,
              active: _.isEqual(slide, carousel.currentSlide)
            });
          })
        ])
      ]);
    }
  }
})();

export default slickCarousel;
