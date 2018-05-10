import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import './styles.scss';

const Blog = props => {
  return (
    <Row className="blog-page">
      <Col xs={12}>
        {props.children}
      </Col>
    </Row>
  );
};

Blog.propTypes = {};

Blog.defaultProps = {};

export default Blog;
