import React, { Component } from 'react';
import {
  View, StyleSheet, Text, AsyncStorage
} from 'react-native';
import * as api from '../api';

class Score extends Component {
  render() {
    const { score, navigate } = this.props;
    setTimeout(() => {
      navigate('Leaderboard');
    }, 3500);
    return (
      <>
        <View style={styles.container}>
          <Text style={styles.headerText}>
            Game Over!
          </Text>
          <Text style={styles.text}>
            {`You scored: ${score}`}
          </Text>
        </View>
      </>
    );
  }

  componentDidMount() {
    this.updateScore();
  }

  updateScore = async () => {
    const { score: currentScore } = this.props;
    const currentPlayer = await AsyncStorage.getItem('currentPlayer');
    const { score: highestScore, uid } = JSON.parse(currentPlayer);
    if (currentScore > highestScore) api.updateScore(uid, currentScore);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10
  },
  headerText: {
    fontSize: 50,
    textAlign: 'center'
  },
  text: {
    textAlign: 'center',
    width: '85%'
  },
});

export default Score;
