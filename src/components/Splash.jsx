import React from 'react';
import Slider from 'react-slick';
import axios from 'axios';

class Splash extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: '' };
    this.user = '';

    this.handleUsername = this.handleUsername.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUsername(username) {
    this.setState({ username: username.target.value });
  }

  handleSubmit = () => {
    return this.props.onGenerateClick(this.state.username)
  }

  render() {
    const username = this.state.username
    const settings = {
      dots: true,
      dotsClass: 'slick-dots slick-thumb',
      infinite: true,
      fade: true,
      speed: 1000,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 6000,
    };
    return (
      <div className="home-page-container">
        <div className="carousel">
          <Slider {...settings}>
            <div><img className="carousel-image" src="http://placekitten.com/g/450/300" alt="Sad Face" /></div>
            <div><img className="carousel-image" src="http://www.petsworld.in/blog/wp-content/uploads/2014/09/cute-kittens.jpg" alt="Sad Face" /></div>
            <div><img className="carousel-image" src="https://static.pexels.com/photos/37337/cat-silhouette-cats-silhouette-cat-s-eyes.jpg" alt="Sad Face" /></div>
            <div><img className="carousel-image" src="https://photogenicfelines.files.wordpress.com/2010/10/imgp7340_1-1.jpg" alt="Sad Face" /></div>
          </Slider>
        </div>
        <div id="songkick-input">
          <form className="form-inline">
            <span className="sr-only">songkick Username</span>
            <div className="input-group mb-2 mr-sm-2 mb-sm-0">
              <div className="input-group-addon">@</div>
              <input
                type="text" className="form-control"
                id="inlineFormInputGroup" placeholder="songkick Username"
                value={this.state.username} onChange={this.handleUsername.bind(this)} />
            </div>
            <button
              type="submit" className="btn btn-primary"
              onClick={this.handleSubmit.bind(this)}
            >
            Submit
            </button>
          </form>
          <span className="or-label"> OR </span>
          <div className="genre-buttons">
            <button type="button" className="btn btn-success btn-circle btn-lg">
              Pop
            </button>
            <button type="button" className="btn btn-success btn-circle btn-lg">
              Rock
            </button>
            <button type="button" className="btn btn-success btn-circle btn-lg">
              Hip<br />Hop
            </button>
            <button type="button" className="btn btn-success btn-circle btn-lg">
              Indie
            </button>
            <button type="button" className="btn btn-success btn-circle btn-lg">
              Rap
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Splash
