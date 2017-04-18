import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';

class Carousel extends Component {
  render() {
    const settings = {
      dots: true,
      dotsClass: 'slick-dots slick-thumb',
      infinite: true,
      fade: false,
      speed: 1000,
      slidesToShow: 1,
      slidesToScroll: 1,
      swipeToSlide: false,
      autoplay: true,
      autoplaySpeed: 6000,
    };

    return (
      <div className="carousel">
        <Slider {...settings}>
          <div className="top-page-container">
            <div className="home-carousel">
              <img className="home-header-logo" src="./assets/gigify.svg" alt="Gigify logo" />
            </div>
          </div>
          <a
            className="carousel-image panorama"
            data-toggle="modal" data-target="#loadingModal"
            onClick={() => this.props.handleFirst()}
          />
          <a
            className="carousel-image govball"
            data-toggle="modal" data-target="#loadingModal"
            onClick={() => this.props.handleSecond()}
          />
        </Slider>
      </div>
    )
  }
}

Carousel.propTypes = {
  handleFirst: PropTypes.func.isRequired,
  handleSecond: PropTypes.func.isRequired,
};

export default Carousel;
