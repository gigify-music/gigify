import React from 'react';
import SweetScroll from 'sweet-scroll';

class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount() {
    this.sweetScroll = new SweetScroll();
  }
  componentDidUpdate(prevProps, prevState) {
    if (!prevProps.showPlaylist) {
      this.sweetScroll.toElement(document.getElementById('playlist-scroll'));
    }

    if (prevProps.playlistId !== this.props.playlistId) {
      this.sweetScroll.toElement(document.getElementById('playlist-scroll'));
    }
  }
  render() {
    return (
      <div className="vignette playlist-container">
        <div id="playlist-scroll" className="playlist-view">
          <h1>A preview of your new playlist:</h1>
          <iframe
            src={`https://embed.spotify.com/?uri=spotify:user:${this.props.playlistId[0]}:playlist:${this.props.playlistId[1]}&theme=dark`}
            width="700" height="600" frameBorder="0" allowTransparency="true"
          />
        </div>
      </div>
    )
  }
}
export default Playlist;
