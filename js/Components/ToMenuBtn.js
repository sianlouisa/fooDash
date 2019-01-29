import React, { Component } from 'react';
import { TouchableOpacity, Text } from 'react-native';

class ToMenuBtn extends Component {
  navigateToPlay = () => {
    const {
      navigation: { navigate }
    } = this.props;
    navigate('StartScreen');
  };

  render() {
    const { navigateToMenu, buttonStyles } = this.props;
    return (
      <TouchableOpacity onPress={() => navigateToMenu()}>
        <Text style={buttonStyles.toMenu}>Menu</Text>
      </TouchableOpacity>
    );
  }
}

export default ToMenuBtn;
