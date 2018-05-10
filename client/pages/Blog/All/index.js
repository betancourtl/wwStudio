import React, { Component } from 'react';
import * as R from 'ramda';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import {
  Row,
  Col,
  Tabs,
  Tab,
  Media,
  Label,
  ButtonToolbar,
  DropdownButton,
  MenuItem
} from 'react-bootstrap';
import PostPagination from '../../../components/PostPagination';
import Hero from '../../../components/Hero';

class All extends Component {
  componentWillMount() {
    this.props.post.getPosts();
  }

  render() {
    return (
      <Row className="blog-all-page">
        <Col xs={12}>
          <Hero
            title="4 Ways to Keep Ambitious Support Team Members Engaged"
            src="https://images.unsplash.com/photo-1496885950879-f0bb5768d2a6?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=b898d20fb2b464bfbdf31f598d8caa37&auto=format&fit=crop&w=1950&q=80"
          />
        </Col>
        <Col xs={12}>
          <ButtonToolbar>
            <DropdownButton
              title={`${this.props.post.meta.query.limit} Per Page`}
              id="dropdown-size-medium"
            >
              {[5, 15, 25, 50, 75, 100].map((x, i) => {
                return (
                  <MenuItem
                    key={x}
                    onClick={() => this.props.post.changeLimit(x)}
                    eventKey={i}
                    children={x}
                  />
                );
              })}

            </DropdownButton>
          </ButtonToolbar>
        </Col>
        <Col xs={12} className="blog-tabs">
          <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
            <Tab eventKey={1} title="Javascript">
              All
            </Tab>
            <Tab eventKey={2} title="Javascript">
              Javascript
            </Tab>
            <Tab eventKey={3} title="React">
              React
            </Tab>
            <Tab eventKey={4} title="PHP">
              PHP
            </Tab>
            <Tab eventKey={5} title="MongoDB">
              MongoDB
            </Tab>
          </Tabs>
        </Col>
        <Col xs={12}>
          {this.props.post.posts.map(post => {
            return (
              <Media key={post.id}>
                <Media.Left>
                  <img width={128} height={128} src="http://placehold.it/128x128" alt="thumbnail" />
                </Media.Left>
                <Media.Body>
                  <Media.Heading>
                    <Link to={`/blog/view/${post.id}`}>{post.title}</Link>
                    {`  |  `}<Link to={`/blog/edit/${post.id}`}>Edit</Link>
                    {`  |  `}<Link to={`/blog/delete/${post.id}`}>Delete</Link>
                  </Media.Heading>
                  <div className="post-labels">
                    {post.categories.map(category => {
                      return (
                        <Label key={category.id} bsStyle="primary">
                          {category.name}
                        </Label>
                      );
                    })}
                  </div>
                  <p>
                    Cras sit amet nibh libero, in gravida nulla. Nulla vel metus
                    scelerisque
                    ante sollicitudin commodo. Cras purus odio, vestibulum in
                    vulputate at,
                    tempus viverra turpis. Fusce condimentum nunc ac nisi
                    vulputate
                    fringilla. Donec lacinia congue felis in faucibus.
                  </p>
                </Media.Body>
              </Media>
            );
          })}
        </Col>
        <Col xs={12} className="text-center">
          <PostPagination
            perPage={this.props.post.meta.query.limit}
            currentPage={this.props.post.meta.query.page}
            totalPages={this.props.post.meta.meta.totalPages}
            toPage={this.props.post.toPage}
            firstPage={this.props.post.firstPage}
            prevPage={this.props.post.prevPage}
            nextPage={this.props.post.nextPage}
            lastPage={this.props.post.lastPage}
          />
        </Col>
      </Row>
    );
  };
}

All.propTypes = {};

All.defaultProps = {};

export default R.compose(
  inject('post'),
  observer
)(All);