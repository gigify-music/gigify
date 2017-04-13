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
              <h4>About</h4>
              <i
                className="icon fa fa-chevron-down faa-pulse animated"
                aria-hidden="true"
              />
            </button>
          </div>
        </div>
        <ToggleDisplay show={this.state.showAbout}>
          <div id="about" className="container aboutUs">
            <div className="aboutSection">
              <div className="aboutHeader">
                About Gigify
              </div>
              <div className="gigifyDesc">
                <p>
                  Cardigan tumeric listicle, prism art party twee yuccie
                  plaid cold-pressed shoreditch 8-bit coloring book
                  godard blog roof party. Tumeric coloring book swag,
                  vinyl pinterest pop-up meditation brunch dreamcatcher cornhole.
                  Woke street art disrupt everyday carry, ennui jianbing banjo
                  portland pour-over bushwick hella occupy yuccie. Lyft slow-carb
                  messenger bag deep v normcore.
                </p>
              </div>

            </div>
            <div>
              <div className="aboutHeader">Development Team</div>
              <div className="developmentTeam">
                <div className="row devRow">
                  <div className="Developer col-sm-2">
                    <a href="http://jpmarra.com">
                      <img className="profilePicture img-circle" src="https://avatars3.githubusercontent.com/u/22504731?v=3&amp;s=460" />
                    </a>
                    <h4 className="devName">JP Marra</h4>
                    <h5>Software Engineer</h5>
                    <p className="contacts">
                      <a href="https://github.com/jpmarra"><img className="gitIcon" src="https://image.flaticon.com/icons/svg/23/23957.svg" /></a>
                      <a href="https://www.linkedin.com/in/jpmarra/"><img className="linkedIcon" src="https://cdn3.iconfinder.com/data/icons/free-social-icons/67/linkedin_circle_color-512.png" /></a>
                    </p>
                  </div>
                  <div className="Developer col-sm-2">
                    <a href="http://jlestes.com">
                      <img className="profilePicture img-circle" src="https://avatars2.githubusercontent.com/u/24236815?v=3&s=460" />
                    </a>
                    <h4 className="devName">Jordan Estes</h4>
                    <h5>Software Engineer</h5>
                    <p className="contacts">
                      <a href="https://github.com/EstesJL"><img className="gitIcon" src="https://image.flaticon.com/icons/svg/23/23957.svg" /></a>
                      <a href="https://www.linkedin.com/in/estesjl/"><img className="linkedIcon" src="https://cdn3.iconfinder.com/data/icons/free-social-icons/67/linkedin_circle_color-512.png" /></a>
                    </p>
                  </div>
                  <div className="Developer col-sm-2">
                    <a href="http://scottdavidsanders.com">
                      <img className="profilePicture img-circle" src="https://avatars2.githubusercontent.com/u/9346924?v=3&s=460" />
                    </a>
                    <h4 className="devName">Scott Sanders</h4>
                    <h5>Software Engineer</h5>
                    <p className="contacts">
                      <a href="https://github.com/ScottDavidSanders"><img className="gitIcon" src="https://image.flaticon.com/icons/svg/23/23957.svg" /></a>
                      <a href="https://www.linkedin.com/in/scottdavidsanders/"><img className="linkedIcon" src="https://cdn3.iconfinder.com/data/icons/free-social-icons/67/linkedin_circle_color-512.png" /></a>
                    </p>
                  </div>
                  <div className="Developer col-sm-2">
                    <a href="http://scottdavidsanders.com">
                      <img className="profilePicture img-circle" src="https://avatars1.githubusercontent.com/u/18608258?v=3&s=460" />
                    </a>
                    <h4 className="devName">Aamir Yousuf</h4>
                    <h5>Software Engineer</h5>
                    <p className="contacts">
                      <a href="https://github.com/iamongit"><img className="gitIcon" src="https://image.flaticon.com/icons/svg/23/23957.svg" /></a>
                      <a href="https://www.linkedin.com/in/aamirysf/"><img className="linkedIcon" src="https://cdn3.iconfinder.com/data/icons/free-social-icons/67/linkedin_circle_color-512.png" /></a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="footer">
            <h6 className="footer-content"><img className="footer-logo" src="./assets/gigify-g.svg"/> | <a href="https://github.com/gigify-music/gigify" className="github-link">Gigify Github</a></h6>
          </div>
        </ToggleDisplay>


      </div>

    );
  }
}

export default Login;
