import React from 'react';
import ToggleDisplay from 'react-toggle-display';
import SweetScroll from 'sweet-scroll';
import '../../public/Styles/login.scss';


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
        <div id="particles-js" className="top-page-container">
          <div className="top-content-container">
            <label className="page-title"> Gigify </label>
            <label className="page-subheader"> Create Spotify playlists from your
          upcoming Songkick gigs </label>
            <div className="row logos">
              <img src="./assets/Spotify_Icon_RGB_Green.png" className="spotify-logo" alt="Spotify Logo" />
              <img src="./assets/sk-badge-pink.png" className="songkick-logo" alt="Songkick Logo" />
            </div>
          </div>
        </div>
        <div className="bottom-content-container">
          <button
            className="btn btn-lg spotify-auth-button" type="button"
            onClick={() => this.handleAuth()}
          >

            <i className="fa fa-spotify fa-3x spotify-icon" aria-hidden="true" />
           Connect with Spotify </button>

          <div className="down">
            <button style={{ background: 'transparent', border: 'none', color: 'transparent' }} onClick={() => this.handleScroll()}>
              <i
                className="icon fa fa-chevron-down faa-pulse animated"
                aria-hidden="true"
              />
            </button>
          </div>

        </div>
        <ToggleDisplay show={this.state.showAbout}>
          <div id="about" className="container aboutUs">
            <div className="col-md-6">
              <div className="aboutUsHeader">Development Team</div>
              <div className="developmentTeam">
                <div className="Developer col-sm-3">
                  <a href="http://jpmarra.com">
                    <img className="profilePicture img-circle" src="https://avatars3.githubusercontent.com/u/22504731?v=3&amp;s=460" />
                  </a>
                  <h4>JP Marra</h4>
                  <h5>Software Engineer</h5>
                  <p className="contacts">
                    <a href="https://github.com/jpmarra"><img className="gitIcon" src="https://image.flaticon.com/icons/svg/23/23957.svg" /></a>
                    <a href="https://www.linkedin.com/in/jpmarra/"><img className="linkedIcon" src="https://cdn3.iconfinder.com/data/icons/free-social-icons/67/linkedin_circle_color-512.png" /></a>
                  </p>
                </div>
                <div className="Developer col-sm-3">
                  <a href="http://jlestes.com">
                    <img className="profilePicture img-circle" src="https://avatars2.githubusercontent.com/u/24236815?v=3&s=460" />
                  </a>
                  <h4>Jordan Estes</h4>
                  <h5>Software Engineer</h5>
                  <p className="contacts">
                    <a href="https://github.com/EstesJL"><img className="gitIcon" src="https://image.flaticon.com/icons/svg/23/23957.svg" /></a>
                    <a href="https://www.linkedin.com/in/estesjl/"><img className="linkedIcon" src="https://cdn3.iconfinder.com/data/icons/free-social-icons/67/linkedin_circle_color-512.png" /></a>
                  </p>
                </div>
                <div className="Developer col-sm-3">
                  <a href="http://scottdavidsanders.com">
                    <img className="profilePicture img-circle" src="https://avatars2.githubusercontent.com/u/9346924?v=3&s=460" />
                  </a>
                  <h4>Scott Sanders</h4>
                  <h5>Software Engineer</h5>
                  <p className="contacts">
                    <a href="https://github.com/ScottDavidSanders"><img className="gitIcon" src="https://image.flaticon.com/icons/svg/23/23957.svg" /></a>
                    <a href="https://www.linkedin.com/in/scottdavidsanders/"><img className="linkedIcon" src="https://cdn3.iconfinder.com/data/icons/free-social-icons/67/linkedin_circle_color-512.png" /></a>
                  </p>
                </div>
                <div className="Developer col-sm-3">
                  <a href="http://scottdavidsanders.com">
                    <img className="profilePicture img-circle" src="https://avatars1.githubusercontent.com/u/18608258?v=3&s=460" />
                  </a>
                  <h4>Aamir Yousuf</h4>
                  <h5>Software Engineer</h5>
                  <p className="contacts">
                    <a href="https://github.com/iamongit"><img className="gitIcon" src="https://image.flaticon.com/icons/svg/23/23957.svg" /></a>
                    <a href="https://www.linkedin.com/in/aamirysf/"><img className="linkedIcon" src="https://cdn3.iconfinder.com/data/icons/free-social-icons/67/linkedin_circle_color-512.png" /></a>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="footer">
            <h6 className="footer-content">2017 Gigify. | <a>Gigify Github</a></h6>
          </div>
        </ToggleDisplay>


      </div>

    );
  }
}

export default Login;
