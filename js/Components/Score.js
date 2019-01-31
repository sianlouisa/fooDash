import React, { Component } from 'react';
import {
  View, StyleSheet, Text, AsyncStorage
} from 'react-native';
import * as api from '../api';

class Score extends Component {
  componentDidMount() {
    this.updateScore();
    const { navigate } = this.props;
    setTimeout(() => {
      navigate('Leaderboard');
    }, 3500);
  }

  updateScore = async () => {
    const { score: currentScore } = this.props;
    const currentPlayer = await AsyncStorage.getItem('currentPlayer');
    const { score: highestScore, uid } = JSON.parse(currentPlayer);
    if (currentScore > highestScore) {
      await AsyncStorage.mergeItem('currentPlayer', JSON.stringify({ score: currentScore }));
      api.updateScore(uid, currentScore);
    }
  }

  render() {
    const { score, navigate } = this.props;
    setTimeout(() => {
      navigate('Leaderboard');
    }, 3500);
    return (
      <>
        <View style={styles.container}>
          <Text style={styles.headerText}>
            GAME OVER
          </Text>
          <Text style={styles.text}>
            {`You scored: ${score}`}
          </Text>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 10,
    position: 'absolute',
    top: 200,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerText: {
    fontSize: 50,
    textAlign: 'center',
    color: 'white'
  },
  text: {
    fontSize: 30,
    textAlign: 'center',
    width: '85%',
    color: 'white'
  },
});

export default Score;
