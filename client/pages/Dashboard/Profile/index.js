import React from 'react';
import PropTypes from 'prop-types';

const Profile = props => {
  return (
    <div className="dashboard-profile-page">
      Dashboard Profile Page
      {props.children}
    </div>
  );
};

Profile.propTypes = {};

Profile.defaultProps = {};

export default Profile;