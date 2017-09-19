import UrlParser from "./util/urlParser";

document.addEventListener('DOMContentLoaded', function() {
  var slides = [];
  var currentSlide = undefined;
  var timeVector = [];
  var slider = null;

  var inRange = function(progress, idx1, idx2) {
    return _.inRange(progress, timeVector[idx1], (timeVector[idx2] || 100000));
  };

  var updateSlide = function(event) {
    console.log("updating slide..");
    var currentSec = _.floor(event.detail.plyr.getCurrentTime());

    if(currentSlide) {
      var currentSlideIndex = _.findIndex(slides, currentSlide);

      if((currentSlideIndex !== -1) &&
        inRange(currentSec, currentSlideIndex, (currentSlideIndex + 1))) {
        return;
      }
    }

    currentSlide = _.find(slides, function(slide, index, collection) {
      if(inRange(currentSec, index, (index + 1))) {
        Reveal.slide(index);
        if(slider)
          slider.goTo(index);

        return true;
      }

      return false;
    });
  };

  var playerTag = document.body.querySelector('.video-player-watch');

  var urlParser = new UrlParser();

  urlParser.addProvider('vimeo');
  urlParser.addProvider('youtube');

  var videoInfo = urlParser.parse(playerTag.dataset.url);

  playerTag.dataset.type = videoInfo.provider;
  playerTag.dataset.videoId = videoInfo.videoId;

  var imgs = document.body.querySelectorAll('img');

  for(var i = 0; i < imgs.length; i++) {
    slides.push({
      src: imgs[i].src,
      start: imgs[i].dataset.start
    });
    timeVector.push(imgs[i].dataset.start);
  }

  // document.body.querySelectorAll('img').forEach(function(img) {
  //   slides.push({
  //     src: img.src,
  //     start: img.dataset.start
  //   });
  //   timeVector.push(img.dataset.start);
  // });

  var player = plyr.setup('.video-player-watch', {
    //['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'captions', 'fullscreen']
    controls: ['play', 'progress', 'mute', 'volume', 'current-time']
  })[0];

  // player.on('ready', function(event) {
  //   console.log('player ready!');
  // });

  player.on('timeupdate', _.throttle(updateSlide, 1000, {
    'leading': true,
    'trailing': false
  }));

  Reveal.initialize({
    // Flags if the presentation is running in an embedded mode,
    // i.e. contained within a limited portion of the screen
    embedded: true,
    // Display controls in the bottom right corner
    controls: false,
    // Display a presentation progress bar
    progress: false,
    // Enable keyboard shortcuts for navigation
    keyboard: false,
    // Enable the slide overview mode
    overview: false,
    // Vertical centering of slides
    center: false,
    // Enables touch navigation on devices with touch input
    touch: false,
    // Enables touch navigation on devices with touch input
    help: false,
    // Transition style
    transition: 'slide', // none/fade/slide/convex/concave/zoom
    // Transition speed
    transitionSpeed: 'slow', // default/fast/slow
    // Transition style for full page slide backgrounds
    // backgroundTransition: 'none',
    // Number of slides away from the current that are visible
    viewDistance: 1,
    width: 'auto',
    height: 'auto'
  });

  $("#owl-slider").owlCarousel({
      navigation: true,
      pagination: false,
      items: 10,
      itemsDesktop : [1199,10],
      itemsDesktopSmall : [980,10],
      itemsTablet: [768,5],
      itemsMobile : false,
      navigationText: ["<i class='glyphicon glyphicon-menu-left'></i>", "<i class='glyphicon glyphicon-menu-right'></i>"]
  });

  slider = $("#owl-slider").data("owlCarousel");

  $(".owl-item figure").on('click', function() {
    player.seek($(this).data('start'));
  });

  flipper.initHandlers();

});

var flipper = {
  initHandlers: function() {
    $(".zinkroo__button--flip").on('click', function(event) {
      event.preventDefault();
      $(".flip-container").addClass("hover");
    });
    $(".zinkroo__button--close").on('click', function(event) {
      event.preventDefault();
      $(".flip-container").removeClass("hover");
    })
  },
  setHeight: function() {
    var flipperFrontHeight = $(".flip-container").find(".front").outerHeight(true);
    $(".flip-container .flipper").height(flipperFrontHeight);
  }
}

window.onload = function() {
  flipper.setHeight();
}

window.onresize = _.throttle(flipper.setHeight, 1000, {
  'leading': false,
  'trailing': true
})
