import React, { Component } from 'react';
import { connect } from 'react-redux';
import ToggleDisplay from 'react-toggle-display';
import PropTypes from 'prop-types';
import Loading from 'react-loading';

class Playlists extends Component {

  render() {
    return (
      <div>
        <ToggleDisplay
          className="loadingOverlay"
          id="playlist-toggle"
          show={this.props.loadingplaylist}
        >
          <Loading type="bubbles" color="#1db954" />
        </ToggleDisplay>

        <ToggleDisplay id="show-playlist" show={this.props.showplaylistStore}>
          <div
            className="modal fade playlist"
            id="homePlaylistModal"
            tabIndex="-1" role="dialog"
            aria-labelledby="myModalLabel"
          >
            <div
              className="modal-dialog"
              role="document"
            >
              <div className="modal-content">
                <div className="modal-header">
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                  <h4 className="modal-title" id="myModalLabel">Gigify Spotlight Playlist</h4>
                </div>
                <div className="modal-body">
                  <iframe
                    src={this.props.showplaylistStore && this.props.loadingfeaturedplaylist ? `https://embed.spotify.com/?uri=spotify:user:${this.props.playlistid[0]}:playlist:${this.props.playlistid[1]}&theme=dark` : 'about:blank'}
                    width="100%" height="600" frameBorder="0" allowTransparency="true"
                  />
                </div>
              </div>
            </div>
          </div>
        </ToggleDisplay>
      </div>
    );
  }

}

const mapStatetoProps =
({ loadingplaylist, showplaylist, playlistid, loadingfeaturedplaylist }) => ({
  loadingplaylist,
  showplaylistStore: showplaylist.showplaylist,
  playlistid,
  loadingfeaturedplaylist,
});

Playlists.propTypes = {
  loadingplaylist: PropTypes.bool.isRequired,
  showplaylistStore: PropTypes.bool.isRequired,
  playlistid: PropTypes.array.isRequired,
  loadingfeaturedplaylist: PropTypes.bool.isRequired,
};

export default connect(mapStatetoProps, {})(Playlists);
