var slickCarousel = (function() {
  var slides = m.prop([]);
  var carousel = m.prop();
  var thumbnail = m.prop('<div class="thumbnail"><img src="url"></img></div>');

  return {
    addSlide: function(sl) {
      slides(_.concat(slides(), sl));
      carousel().slick('slickAdd', _.replace(thumbnail(), 'url', sl.url));
    },
    removeSlide: function() {
      var current = carousel().slick('slickCurrentSlide');
      console.log(current);
      _.pull(slides(), _.nth(slides(), current));
      carousel().slick('slickRemove', current);
    },
    controller: function(args, sls) {
      slides(sls);

      return {
        onReady: function(element, isInitialized, context) {
          if(!isInitialized) {
            carousel(
              // $(element).slick(args['opts'])
              $(element).on('click', '.slick-slide', function(event, slick, index) {
                var index = $(event.currentTarget).data('slick-index')
                // console.log(slides()[index]);
                // args['clickCallback'].apply(this, [slides()[index]]);
                args['clickCallback'](slides()[index]);
              }).slick(args['opts'])
            );
          }
        }
      }
    },
    view: function(ctrl, args, slides) {
      return m("", { class: args['class'], config: ctrl.onReady }, [
        slides.map(function(slide) {
          return m(".thumbnail", [
            m("img", {
              src: slide.url
            })
          ]);
        })
      ]);
    }
  }
})();

export default slickCarousel;
