import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

const StartButton = (props) => {
  const { navigateToPlay, buttonStyle } = props;
  return (
    <TouchableOpacity onPress={navigateToPlay} style={buttonStyle.buttonContainer}>
      <Text style={buttonStyle.text}>Play</Text>
    </TouchableOpacity>
  );
};

export default StartButton;
