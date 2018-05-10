import React, { Component } from 'react';
import Header from '../../components/Header';
import { Grid, Row } from 'react-bootstrap';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';

@inject('session')
@observer
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