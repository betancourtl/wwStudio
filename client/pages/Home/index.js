import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import Guides from 'react-guides';
import logo from '../../assets/layer-1.png'
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
    <Row className="section">
      <Col xs={12} className="text-center">
        <h1>Milestones of every project we take</h1>
        <h2 className="primary-1">Don’t let your customers to abandon your website with first 3 seconds</h2>
      </Col>
    </Row>
  );
};

const Home = props => {
  return (
    <Grid className="home-page">
      <Guides />
      <Header />
      <Section1 />
      <Section2 />
    </Grid>
  );
};

Home.propTypes = {};

Home.defaultProps = {};

export default Home;