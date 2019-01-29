import Leaderboard from 'react-native-leaderboard';
import { View, Text, StyleSheet } from 'react-native';
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
    return (
      <>
        <View colors={['#1da2c6', '#1695b7']} style={styles.container}>
          <Text style={styles.header}>Leaderboard</Text>
          <View style={styles.subHeader}>
            <Text style={styles.name}>Name</Text>
            <Text style={styles.score}>Score</Text>
          </View>
          <Leaderboard
            data={this.sortData()}
            sortBy="highScore"
            labelBy="userName"
            containerStyle={styles.leaderboardContainer}
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
        </View>
      </>
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
    alignItems: 'center',
    opacity: 0.8
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
    width: 250,
    borderRadius: 30,
    backgroundColor: '#00b5ec'
  },
  buttonText: {
    fontFamily: 'Arial',
    fontSize: 20,
    color: 'white'
  }
});

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignContent: 'center',

    borderWidth: 1,
    borderColor: 'black'
  },
  container: {
    padding: 15,
    paddingTop: 35,
    alignItems: 'center',
    height: '100%'
  },
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
  subHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    marginTop: 20
  },
  name: {
    color: 'black',
    fontSize: 25,
    flex: 1,
    textAlign: 'right',
    marginRight: 80
  },
  score: {
    color: 'black',
    fontSize: 25,
    flex: 1,
    textAlign: 'left',
    marginLeft: 80
  }
});

export default LeaderBoard;
