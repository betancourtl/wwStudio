import React, { Component } from 'react';
import { Grid, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';

class App extends Component {

  render() {
    return (
      <Grid fluid className="app">
        {this.props.children}
      </Grid>
    );
  }
}

App.propTypes = {};

App.defaultProps = {};

export default App;