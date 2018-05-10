import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import Guides from 'react-guides';
import logo from '../../assets/layer-1.png';
import icon1 from '../../assets/icon1/vector-smart-object.png';
import icon2 from '../../assets/icon2/vector-smart-object.png';
import icon3 from '../../assets/icon3/vector-smart-object.png';
import icon4 from '../../assets/icon4/vector-smart-object.png';
import person1 from '../../assets/person1/53.png';
import person2 from '../../assets/person2/78.png';
import team from '../../assets/team/layer-714.png';

import './styles.scss';
import PropTypes from 'prop-types';

const Header = () => {
  return (
    <Row className="header-row">
      <Col xs={6}>
        <img src={logo} alt="" />
      </Col>
      <Col xs={4}>
        <ul className="header-links">
          <li><a href="#">Tour</a></li>
          <li><a href="#">Case Studies</a></li>
          <li><a href="#">Blog</a></li>
          <li><a href="#">Contact Us</a></li>
        </ul>
      </Col>
      <Col xs={2} className="header-button-container">
        <button className="btn btn-sm btn-secondary">
          Contact Us
        </button>
      </Col>
    </Row>
  );
};

const InfoIcon = (props) => {
  return (
    <div className="icon-container">
      <img src={props.src} alt="icon" />
      <h3>{props.title}</h3>
      <p>{props.text}</p>
    </div>
  );
};

const Review = props => {
  return (
    <div className="review">
      <div className="review-avatar-container">
        <img src={props.src} className="avatar-img" alt="" />
        <span className="review-name">{props.name}</span>
        <span className="review-position">{props.title}</span>
      </div>
      <p className="review-text">{props.text}</p>
    </div>
  );
};

const Section1 = () => {
  return (
    <Row>
      <Col xs={5} className="section-1-text">
        <h1>
          We help build trust with design
        </h1>
        <p>
          We are passionate about creating adaptive designs that will improve
          your digital presence and will increase the retention rate and trust
          of your website visitors
        </p>

        <button className="btn btn-lg btn-primary">
          Get Started now!
        </button>
      </Col>
      <Col xs={7}>
        <img
          src="https://source.unsplash.com/user/erondu/800x600"
          className="img-responsive section-1-image"
          alt=""
        />
      </Col>
    </Row>
  );
};

const Section2 = () => {
  return (
    <Row className="section section-2">
      <Col xs={12} className="text-center">
        <h1>Milestones of every project we take</h1>
        <h2 className="primary-1">Don’t let your customers to abandon your
          website with first 3 seconds</h2>
      </Col>
      <Col xs={3}>
        <InfoIcon
          src={icon1}
          title="Evaluate your business"
          text="we will figure out where you stand right now and what competition you are facing in the market"
        />
      </Col>
      <Col xs={3}>
        <InfoIcon
          src={icon2}
          title="Evaluate your business"
          text="we will figure out where you stand right now and what competition you are facing in the market"
        />
      </Col>
      <Col xs={3}>
        <InfoIcon
          src={icon3}
          title="Evaluate your business"
          text="we will figure out where you stand right now and what competition you are facing in the market"
        />
      </Col>
      <Col xs={3}>
        <InfoIcon
          src={icon4}
          title="Evaluate your business"
          text="we will figure out where you stand right now and what competition you are facing in the market"
        />
      </Col>
      <Col xs={12} className="text-center">
        <h2 className="section-2-customer-heading">What our customers are saying
          about us?</h2>
      </Col>
      <Col xs={5} xsPush={1}>
        <Review
          src={person1}
          name="Kimberly Garret"
          title="Google Adwords"
          text="Mei at idque theophrastus, cum cu utinam perfecto conceptam, pro doctus corrumpit no. Liber labores has ad. Suas percipit inciderint quo ea. Quo an mutat patrioque. An nam virtute persecuti. Te per etiam tacimates persequeris, ius ei simul graece pertinax, eos amet modo dignissim id."
        />
      </Col>
      <Col xs={5} xsPush={1}>
        <Review
          src={person2}
          name="Kimberly Garret"
          title="Google Adwords"
          text="Mei at idque theophrastus, cum cu utinam perfecto conceptam, pro doctus corrumpit no. Liber labores has ad. Suas percipit inciderint quo ea. Quo an mutat patrioque. An nam virtute persecuti. Te per etiam tacimates persequeris, ius ei simul graece pertinax, eos amet modo dignissim id."
        />
      </Col>
    </Row>
  );
};

const Section3 = () => {
  return (
    <Row className="section section-3">
      <Col xs={12} className="text-center">
        <h1>Our Awesome Team</h1>
        <h2 className="primary-1">
          We are bag full of digital wizards
        </h2>
        <img
          src={team}
          className="img-responsive center-block team-img" alt="team"
        />
      </Col>
    </Row>
  );
};

const Footer = () => {
  return (
    <Row className="footer">
      <Col xs={12} className="section footer-overlay">
        <Row className="no-margin">
          <Col xs={12} className="text-center footer-header">
            <h1 className="color-white">
              Let us wow you
            </h1>
            <h2 className="color-white">
              We are bag full of digital wizards
            </h2>
            <h3 className="color-white">
              Let’s start talking about your project or idea and find out how W
              Studio can help your business grow.
            </h3>
          </Col>
          <Col xs={6} className="footer-btn-1-container">
            <div className="text-center">
              <button
                className="btn btn-lg btn-light">
                Tell us what you need
              </button>
              <p className="color-white">hello@wvstudio.org</p>
            </div>
          </Col>
          <Col xs={6} className="footer-btn-2-container">
            <div className="text-center">
              <button
                className="btn btn-lg btn-solid">
                Consult with us free!
              </button>
              <p className="color-white">1-800-234-5432</p>
            </div>
          </Col>
          <Col xs={6}>
            <p className="color-white footer-address">
              Our Fancy office<br />
              4351 Chicago Avenue<br />
              Hanford, California<br />
              93230<br />
            </p>
          </Col>
          <Col xs={6}>
            <ul className="color-white social-icons">
              <li>
                <i
                  className="fa fa-facebook-square"
                  aria-hidden="true"
                />
              </li>
              <li>
                <i
                  className="fa fa-youtube-square"
                  aria-hidden="true"
                />
              </li>
              <li>
                <i
                  className="fa fa-twitter-square"
                  aria-hidden="true"
                />
              </li>
              <li>
                <i
                  className="fa fa-linkedin-square"
                  aria-hidden="true"
                />
              </li>
            </ul>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

const Home = props => {
  return (
    <Grid className="home-page">
      {/*<Guides />*/}
      <Header />
      <Section1 />
      <Section2 />
      <Section3 />
      <Footer />
    </Grid>
  );
};

Home.propTypes = {};

Home.defaultProps = {};

export default Home;