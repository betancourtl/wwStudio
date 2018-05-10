import React from 'react';

const Review = props => {
  return (
    <div className="review">
      <div className="review-avatar-container">
        <img src={props.src} className="avatar-img" alt="" />
        <span className="review-name">{props.name}</span>
        <span className="review-position">{props.title}</span>
      </div>
      <p className="review-text">{props.text}</p>
    </div>
  );
};

export default Review;
