import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

const LeaderboardBtn = (props) => {
  const { navigateToLeaderboard, buttonStyle } = props;
  return (
    <TouchableOpacity onPress={navigateToLeaderboard} style={buttonStyle.buttonContainer}>
      <Text style={buttonStyle.text}>Leaderboard</Text>
    </TouchableOpacity>
  );
};

export default LeaderboardBtn;
