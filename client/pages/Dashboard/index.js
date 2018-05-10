import React from 'react';
import PropTypes from 'prop-types';

const Dashboard = props => {
  return (
    <div className="dashboard-page">
      Dashboard
      {props.children}
    </div>
  );
};

Dashboard.propTypes = {};

Dashboard.defaultProps = {};

export default Dashboard;