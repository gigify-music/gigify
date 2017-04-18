import React from 'react';

const About = () => (
  <div id="about" className="container aboutUs">
    <div className="aboutSection">
      <div className="aboutHeader">
        About Gigify
      </div>
      <div className="gigifyDesc">
        <p className="about-body">
          Gigify is an artist discovery tool. We’ve all gone to see
          our favorite artists live and didn’t have the time or resources to
          check out the supporting acts ahead of time. Gigify uses Songkick’s event data to
          show you the gigs that match your interests and allows to choose the ones you’d like
          to attend. After making your selections, you can buy tickets, sign up to receive gig
          reminders, and best of all, you can create a Spotify playlist with all of the artists
          playing the gigs! The playlist will automatically add to your Spotify account, so you
          can gear up for gigs anywhere you want.
        </p>
      </div>

    </div>
    <div>
      <div className="aboutHeader">Development Team</div>
      <div className="developmentTeam">
        <div className="row devRow">
          <div className="Developer col-sm-2">
            <a href="http://jlestes.com">
              <img className="profilePicture img-circle" src="https://avatars2.githubusercontent.com/u/24236815?v=3&s=460" alt="Jordan Estes" />
            </a>
            <h4 className="devName">Jordan Estes</h4>
            <h5>Software Engineer</h5>
            <p className="contacts">
              <a href="https://github.com/EstesJL"><img className="gitIcon" src="https://image.flaticon.com/icons/svg/23/23957.svg" alt="Github" /></a>
              <a href="https://www.linkedin.com/in/estesjl/"><img className="linkedIcon" src="https://cdn3.iconfinder.com/data/icons/free-social-icons/67/linkedin_circle_color-512.png" alt="LinkedIn" /></a>
            </p>
          </div>
          <div className="Developer col-sm-2">
            <a href="http://jpmarra.com">
              <img className="profilePicture img-circle" src="https://avatars3.githubusercontent.com/u/22504731?v=3&amp;s=460" alt="JP Marra" />
            </a>
            <h4 className="devName">JP Marra</h4>
            <h5>Software Engineer</h5>
            <p className="contacts">
              <a href="https://github.com/jpmarra"><img className="gitIcon" src="https://image.flaticon.com/icons/svg/23/23957.svg" alt="Github" /></a>
              <a href="https://www.linkedin.com/in/jpmarra/"><img className="linkedIcon" src="https://cdn3.iconfinder.com/data/icons/free-social-icons/67/linkedin_circle_color-512.png" alt="LinkedIn" /></a>
            </p>
          </div>
          <div className="Developer col-sm-2">
            <a href="http://scottdavidsanders.com">
              <img className="profilePicture img-circle" src="https://avatars2.githubusercontent.com/u/9346924?v=3&s=460" alt="Scott Sanders" />
            </a>
            <h4 className="devName">Scott Sanders</h4>
            <h5>Software Engineer</h5>
            <p className="contacts">
              <a href="https://github.com/ScottDavidSanders"><img className="gitIcon" src="https://image.flaticon.com/icons/svg/23/23957.svg" alt="Github" /></a>
              <a href="https://www.linkedin.com/in/scottdavidsanders/"><img className="linkedIcon" src="https://cdn3.iconfinder.com/data/icons/free-social-icons/67/linkedin_circle_color-512.png" alt="Linkedin" /></a>
            </p>
          </div>
          <div className="Developer col-sm-2">
            <a href="https://github.com/iamongit">
              <img className="profilePicture img-circle" src="https://avatars1.githubusercontent.com/u/18608258?v=3&s=460" alt="Aamir Yousuf" />
            </a>
            <h4 className="devName">Aamir Yousuf</h4>
            <h5>Software Engineer</h5>
            <p className="contacts">
              <a href="https://github.com/iamongit"><img className="gitIcon" src="https://image.flaticon.com/icons/svg/23/23957.svg" alt="Github" /></a>
              <a href="https://www.linkedin.com/in/aamirysf/"><img className="linkedIcon" src="https://cdn3.iconfinder.com/data/icons/free-social-icons/67/linkedin_circle_color-512.png" alt="LinkedIn" /></a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default About;
