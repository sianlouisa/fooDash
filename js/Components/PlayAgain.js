import React, { Component } from 'react';
import PlayButton from './PlayButton';
// import PropTypes from 'prop-types';

class PlayAgain extends Component {
  state = {}

  navigateToPlay = () => {
    const { navigation } = this.props;
    navigation.navigate('InitialiseAR');
  }

  render() {
    return (
      <PlayButton buttonText="Play Again" navigateToPlay={this.navigateToPlay} />
    );
  }
}

PlayAgain.propTypes = {

};

export default PlayAgain;
