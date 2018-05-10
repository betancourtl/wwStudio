import React, { Component } from 'react';
import * as R from 'ramda';
import { inject, observer } from 'mobx-react';
import { Table, Button, FormGroup, FormControl } from 'react-bootstrap';
import PropTypes from 'prop-types';

class Categories extends Component {
  componentWillMount() {
    this.props.category.getCategories();
  }

  getValidationState = category => {
    const length = category.length;
    if (length > 10) return 'success';
    else if (length > 1) return 'warning';
    else if (length > 0) return 'error';
    return null;
  };

  render() {
    return (
      <div className="dashboard-posts-categories-page">
        <Table responsive striped bordered condensed hover>
          <thead>
          <tr>
            <th>#</th>
            <th>Id</th>
            <th>Category</th>
            <th>Delete</th>
          </tr>
          </thead>
          <tbody>
          {this.props.category.categories.map((category, i) => {
            return (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{category.id}</td>
                <td>
                  <form>
                    <FormGroup
                      controlId="formBasicText"
                      validationState={this.getValidationState(category.name)}
                    >
                      <FormControl
                        type="text"
                        value={category.name}
                        placeholder="Enter text"
                        onChange={e => {
                          this.props.category.changeCategory(
                            category.id,
                            e.target.value,
                          )
                        }}
                      />
                      <FormControl.Feedback />
                    </FormGroup>
                  </form>
                </td>
                <td>
                  <Button
                    bsStyle="danger"
                    onClick={() => this.props.category.deleteCategory(category.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
          </tbody>
        </Table>
        <Button
          bsStyle="success"
          onClick={() => this.props.category.createCategory()}
        >
          Add Category
        </Button>
      </div>
    );
  }
}

Categories.propTypes = {};

Categories.defaultProps = {};

export default R.compose(
  inject('category'),
  observer,
)(Categories);