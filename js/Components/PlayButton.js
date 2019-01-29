import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { TouchableOpacity, Text } from 'react-native';

class PlayButton extends Component {
  state = {};

  render() {
    const { navigateToPlay, buttonStyles } = this.props;
    return (
      <TouchableOpacity onPress={() => navigateToPlay()}>
        <Text style={buttonStyles.toPlay}>Play Again</Text>
      </TouchableOpacity>
    );
  }
}

export default PlayButton;
