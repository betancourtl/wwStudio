import React, { Component } from 'react';
import GoogleAnalytics from 'react-ga';

const trackId = process.env.GA_TRACK_ID;
const withAnalytics = (WrappedComponent, options = {}) => {
  if (trackId) {
    GoogleAnalytics.initialize(trackId);
  } else {
    return WrappedComponent;
  }

  const trackPage = page => {
    GoogleAnalytics.set({
      page,
      ...options,
    });
    GoogleAnalytics.pageview(page);
  };

  return class extends Component {
    componentDidMount() {
      const page = this.props.location.pathname;
      trackPage(page);
      console.log('fired', page);
    }

    componentWillReceiveProps(nextProps) {
      const currentPage = this.props.location.pathname;
      const nextPage = nextProps.location.pathname;

      if (currentPage !== nextPage) {
        trackPage(nextPage);
      }
      console.log('updated ', nextPage);
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
};

export default withAnalytics;