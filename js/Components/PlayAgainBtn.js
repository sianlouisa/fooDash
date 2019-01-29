import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { TouchableOpacity, Text } from 'react-native';

class PlayAgainBtn extends Component {
  state = {};

  render() {
    const { navigateToPlay, buttonStyles } = this.props;
    return (
      <TouchableOpacity onPress={() => navigateToPlay()} style={buttonStyles.buttonContainer}>
        <Text style={buttonStyles.buttonText}>Play Again</Text>
      </TouchableOpacity>
    );
  }
}

export default PlayAgainBtn;
