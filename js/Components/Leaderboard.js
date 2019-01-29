import Leaderboard from 'react-native-leaderboard';
import {
  View, Text, StyleSheet, ImageBackground
} from 'react-native';
import React, { Component } from 'react';
import * as api from '../api';
import background from '../res/jf-background.jpg';

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
        <ImageBackground source={background} style={styles.backgroundImg}>
          <View colors={['#1da2c6', '#1695b7']} style={styles.container}>
            <Text style={styles.header}>Leaderboard</Text>
            <View style={styles.something}>
              <Text style={styles.textLeft}>Name</Text>
              <Text style={styles.textRight}>Score</Text>
            </View>
          </View>
          <Leaderboard
            data={this.sortData()}
            sortBy="highScore"
            labelBy="userName"
            containerStyle={styles.leaderboardContainer}
          />
        </ImageBackground>
      </>
    );
  }
}

const styles = StyleSheet.create({
  leaderboardContainer: {
    width: '100%',
    textAlign: 'center',
    margin: 'auto',
    padding: '10%',
    paddingTop: 0
  },
  backgroundImg: {
    width: '100%',
    height: '100%'
  },
  header: { fontSize: 25, color: 'black' },
  textLeft: {
    color: 'black',
    fontSize: 25,
    flex: 1,
    textAlign: 'right',
    marginRight: 80
  },
  textRight: {
    color: 'black',
    fontSize: 25,
    flex: 1,
    textAlign: 'left',
    marginLeft: 80
  },
  container: {
    padding: 15,
    paddingTop: 35,
    alignItems: 'center',
    height: '20%'
  },
  something: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    marginTop: 20,
    opacity: 0.5
  }
});

export default LeaderBoard;
