import React from 'react';
import { Container, Row, Col } from 'react-flexbox-grids';

const Section1 = () => {
  return (
    <Container
      className="section-1-outer-section"
      fluid
    >
      <Container>
        <Row>
          <Col
            xs={12}
            sm={12}
            md={12}
            lg={5}
            className="section-1-text"
          >
            <h1>
              We help build trust with design
            </h1>
            <p>
              We are passionate about creating adaptive designs that will
              improve
              your digital presence and will increase the retention rate and
              trust
              of your website visitors
            </p>

            <button className="btn btn-lg btn-primary">
              Get Started now!
            </button>
          </Col>
          <Col
            xs={12}
            sm={12}
            md={12}
            lg={7}
          >
            <img
              src="https://source.unsplash.com/user/erondu/800x600"
              className="img-responsive section-1-image"
              alt=""
            />
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default Section1;