import React from 'react';
import './styles.scss';

const Hero = props => {
  return (
    <div className="hero">
      {
        props.title &&
        <div className="hero-title">{props.title}</div>
      }
      <img
        src={props.src}
        title="4 Ways to Keep Ambitious Support Team Members Engaged"
      />
    </div>
  );
};

Hero.propTypes = {};

Hero.defaultProps = {};

export default Hero;