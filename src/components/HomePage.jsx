import React from 'react';
import Slider from 'react-slick';
// import { React_Boostrap_Carousel } from 'react-boostrap-carousel';
// import '../../node_modules/react-boostrap-carousel/css/bootstrap.min.css';
// import '../../node_modules/react-boostrap-carousel/css/react-boostrap-carousel.css';

// var SampleNextArrow = React.createClass({
//   render: function() {
//     return <div {...this.props} style={{display: 'block', background: 'red'}}></div>;
//   }
// });
//
// var SamplePrevArrow = React.createClass({
//   render: function() {
//     return (
//       <div {...this.props} style={{display: 'block', background: 'red'}}></div>
//     );
//   }
// });

class HomePage extends React.Component {
  render() {
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
        <div className="carouse">
          <Slider {...settings}>
            <div><img className="carousel-image" src="http://placekitten.com/g/450/300" alt="Sad Face" /></div>
            <div><img className="carousel-image" src="http://www.petsworld.in/blog/wp-content/uploads/2014/09/cute-kittens.jpg" alt="Sad Face" /></div>
            <div><img className="carousel-image" src="https://static.pexels.com/photos/37337/cat-silhouette-cats-silhouette-cat-s-eyes.jpg" alt="Sad Face" /></div>
            <div><img className="carousel-image" src="https://photogenicfelines.files.wordpress.com/2010/10/imgp7340_1-1.jpg" alt="Sad Face" /></div>
          </Slider>
        </div>
      </div>
    );
  }
}

export default HomePage;
