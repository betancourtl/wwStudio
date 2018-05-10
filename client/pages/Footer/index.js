import React from 'react';
import { Container, Row, Col } from 'react-flexbox-grids';
import PropTypes from 'prop-types';

const Footer = () => {
  return (
    <Container
      className="footer-outer-section"
      fluid
    >
      <Container
        className="footer-overlay"
        fluid
      >

        <Container>
          <Row className="footer">
            <Col lg={12} className="section">
              <Row className="no-margin">
                <Col lg={12} className="text-center footer-header">
                  <h1 className="color-white">
                    Let us wow you
                  </h1>
                  <h2 className="color-white">
                    We are bag full of digital wizards
                  </h2>
                  <h3 className="color-white">
                    Let’s start talking about your project or idea and find out
                    how W
                    Studio can help your business grow.
                  </h3>
                </Col>
                <Col lg={6} className="footer-btn-1-container">
                  <div className="text-center">
                    <button
                      className="btn btn-lg btn-light">
                      Tell us what you need
                    </button>
                    <p className="color-white">hello@wvstudio.org</p>
                  </div>
                </Col>
                <Col lg={6} className="footer-btn-2-container">
                  <div className="text-center">
                    <button
                      className="btn btn-lg btn-solid">
                      Consult with us free!
                    </button>
                    <p className="color-white">1-800-234-5432</p>
                  </div>
                </Col>
                <Col lg={6}>
                  <p className="color-white footer-address">
                    Our Fancy office<br />
                    4351 Chicago Avenue<br />
                    Hanford, California<br />
                    93230<br />
                  </p>
                </Col>
                <Col lg={6}>
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
        </Container>
      </Container>
    </Container>
  );
};

Footer.propTypes = {};

Footer.defaultProps = {};

export default Footer;