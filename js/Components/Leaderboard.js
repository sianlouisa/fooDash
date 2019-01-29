import Leaderboard from 'react-native-leaderboard';
import { View, Text, StyleSheet } from 'react-native';
import React, { Component } from 'react';
import * as api from '../api';

class LeaderBoard extends Component {
  state = {
    snapshot: []
  };

  componentDidMount() {
    api.getPlayersScores().then((snapshot) => {
      snapshot.forEach((doc) => {
        this.setState(state => ({ snapshot: [...state.snapshot, doc] }));
      });
    });
  }

  sortData = () => {
    const { snapshot } = this.state;
    return snapshot.map(doc => ({ userName: doc.data().playerName, highScore: doc.data().score }));
  };

  render() {
    const { getParam } = this.props;
    const score = getParam('score', '0');
    return (
      <>
        <View colors={['#1da2c6', '#1695b7']} style={styles.container}>
          <Text style={styles.header}>Leaderboard</Text>
          <View style={styles.something}>
            <Text style={styles.textLeft}>Name</Text>
            <Text style={styles.textRight}>Score</Text>
          </View>
        </View>
        <Leaderboard data={this.sortData()} sortBy="highScore" labelBy="userName" />
      </>
    );
  }
}

const styles = StyleSheet.create({
  header: { fontSize: 25, color: 'white' },
  textLeft: {
    color: 'white',
    fontSize: 25,
    flex: 1,
    textAlign: 'right',
    marginRight: 40
  },
  textRight: {
    color: 'white',
    fontSize: 25,
    flex: 1,
    textAlign: 'left',
    marginLeft: 50
  },
  container: {
    backgroundColor: '#119abf',
    padding: 15,
    paddingTop: 35,
    alignItems: 'center'
  },
  something: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    marginTop: 20
  }
});

export default LeaderBoard;
