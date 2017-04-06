import React from 'react';

const Playlist = ({ playlistId }) => (
  <div className="playlist-container">
    <div className="playlist-view">
      <h1>A preview of your new playlist:</h1>
      <iframe
        src={`https://embed.spotify.com/?uri=spotify:user:${playlistId[0]}:playlist:${playlistId[1]}&theme=dark`}
        width="500" height="600" frameBorder="0" allowTransparency="true"
      />
    </div>
  </div>
  );

export default Playlist;
