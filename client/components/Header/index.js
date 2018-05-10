import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Navbar, NavItem, Nav, NavDropdown, MenuItem } from 'react-bootstrap';
import { HideIfNotAuthorized } from '../Hide';

const Header = (props) => {
  const { authenticated, email } = props;
  return (
    <Navbar inverse fluid collapseOnSelect>
      <Navbar.Header>
        <Navbar.Brand>
          <Link to="/">React-mobx-boilerplate</Link>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav>
          <NavDropdown eventKey={5} title="Blog" id="basic-nav-dropdown">
            <MenuItem eventKey={1} onClick={() => props.history.push('/blog')}>Blog</MenuItem>
            {authenticated &&
            <MenuItem eventKey={2} onClick={() => props.history.push('/blog/create')}>
              New Post
            </MenuItem>
            }
          </NavDropdown>

          <HideIfNotAuthorized>
            <NavDropdown eventKey={5} title="Dashboard" id="basic-nav-dropdown">
              <MenuItem eventKey={5.1} onClick={() => props.history.push('/dashboard/profile')}>Profile</MenuItem>
              <MenuItem eventKey={5.2} onClick={() => props.history.push('/dashboard/posts')}>Posts</MenuItem>
              <MenuItem eventKey={5.3} onClick={() => props.history.push('/dashboard/posts/categories')}>Categories</MenuItem>
              <MenuItem eventKey={5.4} onClick={() => props.history.push('/dashboard/media')}>Media</MenuItem>
            </NavDropdown>
          </HideIfNotAuthorized>

          <NavItem eventKey={6} onClick={() => props.history.push('/about')}>About</NavItem>
        </Nav>
        <Nav pullRight>
          <NavDropdown eventKey={7} title={email} id="basic-nav-dropdown">
            {!authenticated &&
            <MenuItem onClick={() => props.history.push('/login')} eventKey={7.1}>Login</MenuItem>}
            {!authenticated &&
            <MenuItem onClick={() => props.history.push('/register')} eventKey={7.2}>Register</MenuItem>}
            {!authenticated && <MenuItem divider />}
            <MenuItem onClick={() => props.history.push('/logout')} eventKey={7.3}>Log
              Out</MenuItem>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
};

export default withRouter(Header);