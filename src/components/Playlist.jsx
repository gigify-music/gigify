import React from 'react';


const Playlist = () => (
  <div className="playlist-container">
    <div className="playlist-view">
      <h1>A preview of your new playlist:</h1>
      <iframe
        src="https://embed.spotify.com/?uri=spotify:user:spotify:playlist:3rgsDhGHZxZ9sB9DQWQfuf&theme=dark"
        width="500" height="600" frameBorder="0" allowTransparency="true"
      />
    </div>
  </div>
  );

export default Playlist;
