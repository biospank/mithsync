var videoSlider = (function() {
  var slider = m.prop();

  return {
    controller: function(args) {
      // var slider = m.prop();

      return {
        onReady: function(element, isInitialized, context) {
          slider(noUiSlider.create(element, args['opts']));
        }
      };
    },
    view: function(ctrl, args) {
      return m("", { config: ctrl.onReady });
    },
    setPips: function(opts) {
      slider().pips(opts);
    }
  }
})();

export default videoSlider;
