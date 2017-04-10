import React from 'react';
import ToggleDisplay from 'react-toggle-display';
import '../../public/Styles/login.scss';


class Login extends React.Component {
  handleAuth() {
    window.location = '/auth/signin';
  }
  render() {
    return (

      <div className="page-container">
        <div id="particles-js" className="top-page-container">
          <div className="top-content-container">
            <label className="page-title"> Gigify </label>
            <label className="page-subheader"> Create Spotify playlists from your
          upcoming songkick gigs </label>
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

          <a href="#about" data-scroll className="downArrow">
            <i className="fa fa-chevron-down faa-pulse animated" aria-hidden="true" />
          </a>
        </div>
        <ToggleDisplay>
          <div className="row aboutUs">
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
                  <img className="profilePicture img-circle" src="https://avatars0.githubusercontent.com/u/24236815?v=3&u=78720a2ef09e041234a3ed9adcdb622787d0634d&s=400" />
                </a>
                <h4>Jordan Estes</h4>
                <h5>Software Engineer</h5>
                <p className="contacts">
                  <a href="https://github.com/estesjl"><img className="gitIcon" src="https://image.flaticon.com/icons/svg/23/23957.svg" /></a>
                  <a href="https://www.linkedin.com/in/estesjl/"><img className="linkedIcon" src="https://cdn3.iconfinder.com/data/icons/free-social-icons/67/linkedin_circle_color-512.png" /></a>
                </p>
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
