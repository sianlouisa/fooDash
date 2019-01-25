import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import {
  View, TouchableOpacity, Text
} from 'react-native';

class PlayButton extends Component {
  state = {}

  render() {
    const { buttonText, navigateToPlay } = this.props;
    return (
      <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}>
        <TouchableOpacity onPress={() => navigateToPlay()}>
          <Text>{buttonText}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

PlayButton.propTypes = {

};

export default PlayButton;
