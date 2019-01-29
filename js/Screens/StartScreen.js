import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import PlayButton from '../Components/PlayButton';

class StartScreen extends Component {
  state = {};

  navigateToPlay = () => {
    const {
      navigation: { navigate }
    } = this.props;
    navigate('InitialiseAR');
  };

  render() {
    return <PlayButton buttonText="Play" navigateToPlay={this.navigateToPlay} />;
  }
}

StartScreen.propTypes = {};

export default StartScreen;
