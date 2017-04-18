import React from 'react';

const HowTo = () => (
  <div className="howto-container">
    <div className="howto-header">How to Gigify</div>
    <div className="howto-logos">
      <div className="howto col-xs">
        <img src="./assets/sk-badge-black.png" className="howto-logo" alt="Songkick Logo" />
        <p>Find all the upcoming gigs your favorite artists are playing</p>
      </div>
      <i className="fa fa-chevron-right fa-2x" aria-hidden="true" />
      <div className="howto col-xs">
        <img src="./assets/music_playlist.svg" className="howto-logo" alt="Playlist Logo" />
        <p>Pick the gigs you want to add to your playlist</p>
      </div>
      <i className="fa fa-chevron-right fa-2x" aria-hidden="true" />
      <div className="howto col-xs">
        <img
          src="./assets/Spotify_Icon_RGB_Black.png"
          className="howto-logo"
          alt="Spotify Logo"
        />
        <p>Jam out to your favorite artists and the folks they have tagging along</p>
      </div>
    </div>
  </div>
);

export default HowTo;
