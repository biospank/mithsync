import mixinLayout from "../layout/mixin_layout";
import videoList from "./list";

var videoPage = (function() {

  var content = function() {
    return [
      m(videoList)
    ];
  };

  return {
    controller: function() {},
    view: mixinLayout(content)
  };
})();

export default videoPage;
