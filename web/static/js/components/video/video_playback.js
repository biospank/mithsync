var videoPlayback = {
  view: function(ctrl, opts) {
    return m(".video_player",
      {
        "data-type": opts['provider'],
        "data-video-id": opts['videoId'],
        config: opts['onReady']
      }
    );
  }
};

export default videoPlayback;
