import React from 'react';
import { Container, Row, Col } from 'react-flexbox-grids';
import team from '../../assets/team/layer-714.png';

const Section3 = () => {
  return (
    <Container
    className="section-3-outer-section"
      fluid
    >
      <Container>
        <Row className="section section-3">
          <Col lg={12} lgCenter className="text-center">
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
      </Container>
    </Container>
  );
};

export default Section3;