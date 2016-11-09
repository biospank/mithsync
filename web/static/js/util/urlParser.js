var UrlParser = function() {
  var providers = ['youtu'];

  var parseProvider = function(url) {
    // 'use strict';

    var match = url.match(
      /(?:(?:https?:)?\/\/)?(?:[^\.]+\.)?(\w+)\./i
    );

    return match ? match[1] : undefined;
  };

  var parseYoutubeVideoId = function(url) {
    var videoId = '';

    url = url.replace(/(>|<)/gi,'').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);

    if(url[2] !== undefined) {
      videoId = url[2].split(/[^0-9a-z_\-]/i);
      videoId = videoId[0];
    } else {
      videoId = url;
    }

    return videoId;
  };

  var parseVimeoVideoId = function(url) {
    // look for a string with 'vimeo', then whatever, then a
    // forward slash and a group of digits.
    var match = /vimeo.*\/(\d+)/i.exec( url );

    // if the match isn't null (i.e. it matched)
    if ( match ) {
      // the grouped/matched digits from the regex
      return match[1];
    } else {
      return 'unknown';
    }
  };

  return {
    addProvider: function(provider) {
      providers.push(provider);
    },
    parse: function(url) {
      var provider = parseProvider(url);

      if(_.includes(providers, provider)) {
        if(_.startsWith(provider, 'youtu')) {
          var videoId = parseYoutubeVideoId(url);

          return {
            provider: 'youtube',
            videoId: videoId
          };
        } else if(provider === 'vimeo') {
          var videoId = parseVimeoVideoId(url);

          return {
            provider: 'vimeo',
            videoId: videoId
          };
        }
      } else {
        return {
          provider: 'unknown',
          videoId: 'unknown'
        };
      }
    }
  };
}

export default UrlParser;
