import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

const InstructionsBtn = (props) => {
  const { navigateToInstructions, buttonStyle } = props;
  return (
    <TouchableOpacity onPress={() => navigateToInstructions()} style={buttonStyle.buttonContainer}>
      <Text style={buttonStyle.text}>Instructions</Text>
    </TouchableOpacity>
  );
};

export default InstructionsBtn;
