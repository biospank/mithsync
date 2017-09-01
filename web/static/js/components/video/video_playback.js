var videoPlayback = {
  view({attrs}) {
    return m((attrs['class'] || ".video_player"),
      {
        "data-type": attrs['provider'],
        "data-video-id": attrs['videoId'],
        oncreate: attrs['onReady']
      }
    );
  }
};

export default videoPlayback;
