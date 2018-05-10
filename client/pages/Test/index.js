import React, { Component } from 'react';
import Header from '../../components/Header';
import { Grid, Row } from 'react-bootstrap';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';

@inject('loginForm')
@observer
class Test extends Component {
  render() {
    const form = this.props.loginForm;

    const email = form.$('email');
    const password = form.$('password');
    return (
      <form
        ref={r => this.form = r}
        onSubmit={form.onSubmit}
      >

        <div>
          <input
            type="text"
            {...email.bind()}
          />
          <p>{email.error}</p>
        </div>

        <div>
          <input
            type="text"
            {...password.bind()}
          />
          <p>{password.error}</p>
        </div>

        <button
          onSubmit={(e) => {
            e.preventDefault();
            this.form.submit(e);
          }}>
          Submit
        </button>

      </form>
    );
  }
}

Test.propTypes = {};

Test.defaultProps = {};

export default Test;