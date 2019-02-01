import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

const LogoutBtn = (props) => {
  const { logout, buttonStyle } = props;
  return (
    <TouchableOpacity onPress={logout} style={buttonStyle.buttonContainer}>
      <Text style={buttonStyle.text}>Logout</Text>
    </TouchableOpacity>
  );
};

export default LogoutBtn;
