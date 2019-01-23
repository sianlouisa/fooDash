import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import PlayButton from './PlayButton';

class StartScreen extends Component {
  state = {}

  render() {
    return (
      <PlayButton buttonText="Play" />
    );
  }
}

StartScreen.propTypes = {

};

export default StartScreen;
