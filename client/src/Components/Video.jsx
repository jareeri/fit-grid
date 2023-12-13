// Video.js
import React from 'react';
import YouTube from 'react-youtube';

const Video = ({ video }) => {
  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <div>
      <h2>{video.title}</h2>
      <YouTube videoId={video.youtubeId} opts={opts} />
    </div>
  );
};

export default Video;
