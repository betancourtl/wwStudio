import React from 'react';

const InfoIcon = (props) => {
  return (
    <div className="icon-container">
      <img src={props.src} alt="icon" />
      <h3>{props.title}</h3>
      <p>{props.text}</p>
    </div>
  );
};

export default InfoIcon;
