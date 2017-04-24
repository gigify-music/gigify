import React from 'react';
import 'particles.js';
import SweetScroll from 'sweet-scroll';
import '../../public/Styles/main.scss';
import About from './About';
import particleConfig from '../../particlesjs-config.json';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAbout: false,
    };
  }

  componentDidMount() {
    this.sweetScroll = new SweetScroll();
    particlesJS('particles-js', particleConfig, !1);
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.showAbout) {
      this.sweetScroll.toElement(document.getElementById('about'));
    }
  }

  handleAuth() {
    window.location = '/auth/signin';
  }

  handleScroll() {
    this.setState({
      showAbout: !this.state.showAbout,
    });
  }

  render() {
    return (

      <div className="page-container">
        <div id="particles-js">
          <div className="top-content-container">
            <img className="header-logo" src="./assets/gigify.svg" alt="Smiley face" />
            <div className="page-subheader">
            Create Spotify playlists from your
            upcoming Songkick gigs
            </div>
            <button
              className="btn btn-lg spotify-auth-button fill"
              type="button"
              onClick={() => this.handleAuth()}
            >
              <i className="fa fa-spotify fa-3x spotify-icon" aria-hidden="true" />
            Connect with Spotify
            </button>
            <div className="down">
              <button className="downBtn" style={{ background: 'transparent', border: 'none' }} onClick={() => this.handleScroll()}>
                <i
                  className="icon fa fa-chevron-down faa-pulse animated"
                  aria-hidden="true"
                />
              </button>
            </div>
          </div>
        </div>
        <About />
        <div className="footer">
          <h6 className="footer-content">
            <img className="footer-logo" src="./assets/gigify-g.svg" alt="Smiley face" /> | <a href="https://github.com/gigify-music/gigify" className="github-link">Gigify Github</a></h6>
        </div>
      </div>

    );
  }
}

export default Login;
