import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import {
  View, TouchableOpacity, Text
} from 'react-native';

class PlayButton extends Component {
  state = {}

  render() {
    const { buttonText } = this.props;
    return (
      <View>
        <TouchableOpacity>
          <Text>{buttonText}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

PlayButton.propTypes = {

};

export default PlayButton;
