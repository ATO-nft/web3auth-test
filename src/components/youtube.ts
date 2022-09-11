const onPlayerReady: YouTubeProps['onReady'] = (event) => {
    // access to player in all event handlers via event.target
    event.target.playVideo();
  }
  
  const opts: YouTubeProps['opts'] = {
    height: '150',
    width: '300',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };



  <YouTube videoId="TB54dZkzZOY" opts={opts} onReady={onPlayerReady} />  :
