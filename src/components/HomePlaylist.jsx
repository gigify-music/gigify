import React, { Component } from 'react';
import { connect } from 'react-redux';
import ToggleDisplay from 'react-toggle-display';

class HomePlaylist extends Component {
  constructor() {
    super();
  }


  render() {
    return(
        <div>
          <ToggleDisplay id="playlist-toggle" show={this.props.loadingplaylist}>
              <div className="modal fade playlist" id="loadingModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
              <div className="modal-dialog" role="document">
                <div className="modal-content-loading">
                  <div className="modal-body loading-animation" >
                    <img className="loading-ring" src="./assets/ring.svg" />
                  </div>
                </div>
              </div>
            </div>
            </ToggleDisplay>

        <ToggleDisplay id="show-playlist" show={this.props.showplaylist}>
          <div className="modal fade playlist" id="homePlaylistModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 className="modal-title" id="myModalLabel">Gigify Spotlight Playlist</h4>
              </div>
              <div className="modal-body">
                <iframe
                  src={`https://embed.spotify.com/?uri=spotify:user:${this.props.playlistid[0]}:playlist:${this.props.playlistid[1]}&theme=dark`}
                  width="100%" height="600" frameBorder="0" allowTransparency="true"
                />
              </div>
            </div>
          </div>
        </div>
      </ToggleDisplay>
    </div>
    )
  }

}

const mapStatetoProps = ({ loadingplaylist, showplaylist, playlistid }) => ({
  loadingplaylist,
  showplaylist,
  playlistid,
});

export default connect(mapStatetoProps, {})(HomePlaylist);
