import React from 'react';
import InfoIcon from '../../components/InfoIcon';
import Review from '../../components/Review';
import { Container, Row, Col } from 'react-flexbox-grids';
import icon1 from '../../assets/icon1/vector-smart-object.png';
import icon2 from '../../assets/icon2/vector-smart-object.png';
import icon3 from '../../assets/icon3/vector-smart-object.png';
import icon4 from '../../assets/icon4/vector-smart-object.png';
import person1 from '../../assets/person1/53.png';
import person2 from '../../assets/person2/78.png';
import PropTypes from 'prop-types';

const Section2 = () => {
  return (
    <Container
      className="section-2-outer-section"
      fluid
    >
      <Container>
        <Row className="section section-2">
          <Col
            xs={12}
            sm={12}
            md={12}
            lg={12}
            className="text-center"
          >
            <h1>Milestones of every project we take</h1>
            <h2 className="primary-1">Don’t let your customers to abandon your
              website with first 3 seconds</h2>
          </Col>
          <Col
            xs={12}
            sm={12}
            md={6}
            lg={3}
          >
            <InfoIcon
              src={icon1}
              title="Evaluate your business"
              text="we will figure out where you stand right now and what competition you are facing in the market"
            />
          </Col>
          <Col
            xs={12}
            sm={12}
            md={6}
            lg={3}
          >
            <InfoIcon
              src={icon2}
              title="Evaluate your business"
              text="we will figure out where you stand right now and what competition you are facing in the market"
            />
          </Col>
          <Col
            xs={12}
            sm={12}
            md={6}
            lg={3}
          >
            <InfoIcon
              src={icon3}
              title="Evaluate your business"
              text="we will figure out where you stand right now and what competition you are facing in the market"
            />
          </Col>
          <Col
            xs={12}
            sm={12}
            md={6}
            lg={3}
          >
            <InfoIcon
              src={icon4}
              title="Evaluate your business"
              text="we will figure out where you stand right now and what competition you are facing in the market"
            />
          </Col>
          <Col
            xs={12}
            sm={12}
            md={12}
            lg={12}
            className="text-center"
          >
            <h2 className="section-2-customer-heading">
              What our customers are saying about us?
            </h2>
          </Col>
          <Col
            xs={12}
            sm={12}
            md={10}
            mdOffset={1}
            lg={5}
            lgOffset={1}
          >
            <Review
              src={person1}
              name="Kimberly Garret"
              title="Google Adwords"
              text="Mei at idque theophrastus, cum cu utinam perfecto conceptam, pro doctus corrumpit no. Liber labores has ad. Suas percipit inciderint quo ea. Quo an mutat patrioque. An nam virtute persecuti. Te per etiam tacimates persequeris, ius ei simul graece pertinax, eos amet modo dignissim id."
            />
          </Col>
          <Col
            xs={12}
            sm={12}
            md={10}
            mdOffset={1}
            lg={5}
          >
            <Review
              src={person2}
              name="Kimberly Garret"
              title="Google Adwords"
              text="Mei at idque theophrastus, cum cu utinam perfecto conceptam, pro doctus corrumpit no. Liber labores has ad. Suas percipit inciderint quo ea. Quo an mutat patrioque. An nam virtute persecuti. Te per etiam tacimates persequeris, ius ei simul graece pertinax, eos amet modo dignissim id."
            />
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default Section2;
