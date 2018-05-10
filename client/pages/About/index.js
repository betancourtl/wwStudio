import React from 'react';
import PropTypes from 'prop-types';

const About = props => {
  return (
    <div className="about-page">
      About Page
      {props.children}
    </div>
  );
};

About.propTypes = {};

About.defaultProps = {};

export default About;