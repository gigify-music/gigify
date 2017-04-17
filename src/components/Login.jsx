import React from 'react';
import ToggleDisplay from 'react-toggle-display';
import SweetScroll from 'sweet-scroll';
import '../../public/Styles/main.scss';
import About from './About'

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAbout: false,
    };
  }
  handleAuth() {
    window.location = '/auth/signin';
  }

  handleScroll() {
    this.setState({
      showAbout: !this.state.showAbout,
    });
    console.log('UPDATE STATE', this.state);
  }

  componentDidMount() {
    this.sweetScroll = new SweetScroll();
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('UPDATE COMPONENT', prevProps, prevState);
    if (!prevState.showAbout) {
      console.log('SHOULD SCROLL');
      this.sweetScroll.toElement(document.getElementById('about'));
    }
  }

  render() {
    return (

      <div className="page-container">
        <div id="particles-js">
          <div className="top-content-container">
            <img className="header-logo" src="./assets/gigify.svg"/>
            <label className="page-subheader"> Create Spotify playlists from your
          upcoming Songkick gigs </label>
          <button
            className="btn btn-lg spotify-auth-button fill" type="button"
            onClick={() => this.handleAuth()}
          >
            <i className="fa fa-spotify fa-3x spotify-icon" aria-hidden="true" />
           Connect with Spotify </button>
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
            <h6 className="footer-content"><img className="footer-logo" src="./assets/gigify-g.svg"/> | <a href="https://github.com/gigify-music/gigify" className="github-link">Gigify Github</a></h6>
          </div>
      </div>

    );
  }
}

export default Login;
