import Videosync from '../videosync';
import Session from './session'

var Slider = {
  encoder: function(value) {
    return moment("2015-01-01").startOf('day').seconds(value).format('HH:mm:ss');
  },
  init: function(element, opts) {
    var sliderContainer = document.getElementById(element);

    return noUiSlider.create(sliderContainer, {
    	start: [0, 30],
      connect: true,
      behaviour: 'drag',
      margin: 5,
      step: 1,
      // tooltips: [
      //   wNumb({ decimals: 0 }),
      //   wNumb({ decimals: 0 })
      // ],
      // [
      //   wNumb({ decimals: 0, encoder: Slider.encoder }),
      //   wNumb({ decimals: 0, encoder: Slider.encoder })
      // ],
    	range: {
    		'min': 0,
    		'max': opts['max']
    	},
      pips: { // Show a scale with the slider
    		mode: 'range',
        density: 3,
        // format: wNumb({
    		// 	encoder: function(value) {
        //     var res = moment("2015-01-01").startOf('day').seconds(value).format('HH:mm:ss');
        //     console.log(res);
        //     return res;
        //   }
    		// })
    	}
    });
  }
}

export default Slider;
