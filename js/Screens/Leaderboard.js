import Leaderboard from 'react-native-leaderboard';
import {
  View, Text, StyleSheet, ActivityIndicator
} from 'react-native';
import React, { Component } from 'react';
import * as api from '../api';
import PlayAgainBtn from '../Components/PlayAgainBtn';
import ToMenuBtn from '../Components/ToMenuBtn';

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

  navigateToPlay = () => {
    const { navigation } = this.props;
    navigation.navigate('InitialiseAR');
  };

  navigateToMenu = () => {
    const { navigation } = this.props;
    navigation.navigate('StartScreen');
  };

  sortData = () => {
    const { snapshot } = this.state;
    return snapshot.map(doc => ({ userName: doc.data().playerName, highScore: doc.data().score }));
  };

  render() {
    // const score = getParam('score', '0');
    const { snapshot } = this.state;
    return (
      <View style={leaderboardStyles.container}>
        {snapshot.length === 0 ? (
          <ActivityIndicator size="large" color="#00b5ec" style={{ marginTop: 250 }} />
        ) : (
          <>
            <Text style={leaderboardStyles.header}>Leaderboard</Text>
            <View style={leaderboardStyles.nameScoreContainer}>
              <Text style={leaderboardStyles.name}>Name</Text>
              <Text style={leaderboardStyles.score}>Score</Text>
            </View>
            <Leaderboard
              data={this.sortData()}
              sortBy="highScore"
              labelBy="userName"
              containerStyle={leaderboardStyles.leaderboardContainer}
            />
            <View style={buttonStyles.main}>
              <PlayAgainBtn
                buttonText="Play Again"
                navigateToPlay={this.navigateToPlay}
                buttonStyles={buttonStyles}
              />
              <ToMenuBtn
                buttonText="Main Menu"
                navigateToMenu={this.navigateToMenu}
                buttonStyles={buttonStyles}
              />
            </View>
          </>
        )}
      </View>
    );
  }
}

const buttonStyles = StyleSheet.create({
  main: {
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 100,
    height: 45,
    marginBottom: 100,
    flexDirection: 'column',
    alignItems: 'center'
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 200,
    borderRadius: 30,
    backgroundColor: '#00b5ec'
  },
  buttonText: {
    color: 'white'
  }
});

const leaderboardStyles = StyleSheet.create({
  container: {
    padding: 15,
    paddingTop: 35,
    alignItems: 'center',
    height: '100%'
  },
  leaderboardContainer: {},
  nameScoreContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20
  },
  header: {
    fontSize: 40,
    marginBottom: 20
  },
  name: {
    flex: 1,
    textAlign: 'left',
    fontSize: 24,
    paddingLeft: 10
  },
  score: {
    flex: 1,
    textAlign: 'right',
    fontSize: 24,
    paddingRight: 10
  }
});

export default LeaderBoard;
