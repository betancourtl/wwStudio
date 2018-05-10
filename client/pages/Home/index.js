import React from 'react';
import { Container } from 'react-flexbox-grids';
import Guides from 'react-guides';
import Header from '../Header';
import Section1 from '../Section1';
import Section2 from '../Section2';
import Section3 from '../Section3';
import Footer from '../Footer';
import PropTypes from 'prop-types';
import './styles.scss';

const Home = props => {
  return (
    <div className="home-page">
      {/*<Guides />*/}
      <Header />
      <Section1 />
      <Section2 />
      <Section3 />
      <Footer />
    </div>
  );
};

Home.propTypes = {};

Home.defaultProps = {};

export default Home;