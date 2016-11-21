import Video from "./video";

var Clippy = {
  init: function(element) {
    $(element).tooltip({
      placement: 'left',
      title: 'Copied!',
      trigger: 'manual'
    });

    var clipboard = new Clipboard(element, {
      text: function(btn) {
        return Video.export();
      }
    });

    clipboard.on('success', function(e) {
      $(element).tooltip('show');

      setTimeout(function() {
        $(element).tooltip('hide');
      }, 1000)

    });

    clipboard.on('error', function(e) {
      // console.error('Action:', e.action);
      // console.error('Trigger:', e.trigger);
    });
  }
}

export default Clippy;
