import React from 'react';
import { Container, Row, Col } from 'react-flexbox-grids';
import logo from '../../assets/layer-1.png';
import PropTypes from 'prop-types';

const Header = () => {
  return (
    <Container fluid>
      <Container>
        <Row className="header">
          <Col
            xs={12}
            sm={12}
            lg={6}
          >
            <img src={logo} alt="" />
          </Col>
          <Col
            lg={4}
            className="hide-xs show-lg"
          >
            <ul className="header-links">
              <li><a href="#">Tour</a></li>
              <li><a href="#">Case Studies</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Contact Us</a></li>
            </ul>
          </Col>
          <Col
            lg={2}
            className="header-button-container hide-xs show-lg"
          >
            <button className="btn btn-sm btn-secondary">
              Contact Us
            </button>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default Header;