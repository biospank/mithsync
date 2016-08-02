import Videosync from '../videosync';
import Session from './session'

var Slider = {
  init: function(element) {
    var slider = document.getElementById(element);

    noUiSlider.create(slider, {
    	start: [0, 80],
    	connect: true,
    	range: {
    		'min': 0,
    		'max': 100
    	},
      pips: { // Show a scale with the slider
    		mode: 'steps',
    		density: 2
    	}
    });
  }
}

export default Slider;
