import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Row,
  Col,
  Button,
  FormGroup,
  FormControl,
  ControlLabel,
} from 'react-bootstrap';
import Draft from '../../Draft/index';
import { getMultipleSelectedInputValues } from '../../../utils/form/index';

const getValidationState = (title = '') => {
  const length = title.length;
  if (length > 5) return 'success';
  else if (length > 3) return 'warning';
  else if (length > 0) return 'error';
  return null;
};

class PostForm extends Component {
  componentWillMount() {
    this.props.fetchAllCategories();
  }

  render() {
    return (
      <Row className="blog-create-page">
        <Col xs={9}>
          <FormGroup
            controlId="formBasicText"
            validationState={getValidationState(this.props.title)}
          >
            <ControlLabel>Title:</ControlLabel>
            <FormControl
              type="text"
              value={this.props.title}
              placeholder="Enter text"
              onChange={this.props.changeTitle}
            />
            <FormControl.Feedback />
          </FormGroup>
          <Draft
            editorState={this.props.editorState}
            onChange={this.props.changeEditorState}
          />
          <Button
            bsStyle="success"
            onClick={this.props.onSubmit}
          >
            {this.props.submitBtnText}
          </Button>
        </Col>
        <Col xs={3}>
          <FormGroup controlId="formControlsSelectMultiple">
            <ControlLabel>Select Categories</ControlLabel>
            <FormControl
              inputRef={ref => this.categoriesRef = ref}
              componentClass="select"
              multiple
              value={this.props.categoryValues}
              onChange={() => {
                const node = this.categoriesRef;
                const values = getMultipleSelectedInputValues(node);
                console.log('values', values);
                this.props.changeCategories(values);
              }}
            >
              {this.props.categories.map(category => {
                return (
                  <option
                    key={category.id}
                    value={category.id}
                  >
                    {category.name}
                  </option>
                );
              })}
            </FormControl>
          </FormGroup>
        </Col>
      </Row>
    );
  };
}

PostForm.defaultProps = {
  submitBtnText: 'Save',
};

PostForm.propTypes = {
  title: PropTypes.string,
  editorState: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  changeTitle: PropTypes.func.isRequired,
  changeCategories: PropTypes.func.isRequired,
  categoryValues: PropTypes.array.isRequired,
  changeEditorState: PropTypes.func.isRequired,
  fetchAllCategories: PropTypes.func.isRequired,
  submitBtnText: PropTypes.string,
};

export default PostForm;
