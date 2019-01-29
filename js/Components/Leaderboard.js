import Leaderboard from 'react-native-leaderboard';
import {
  View, Text, StyleSheet, ImageBackground
} from 'react-native';
import React, { Component } from 'react';
import * as api from '../api';
import background from '../res/jf-background.jpg';
import PlayButton from './PlayButton';
import ToMenuBtn from './ToMenuBtn';

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
        <ImageBackground source={background} style={styles.backgroundImg}>
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
            <View style={styles.buttonContainer}>
              <PlayButton
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
        </ImageBackground>
      </>
    );
  }
}

const buttonStyles = StyleSheet.create({
  toMenu: {
    textAlign: 'right',
    fontSize: 24,
    marginLeft: 70,
    borderWidth: 1,
    borderColor: '#000000'
  },
  toPlay: {
    textAlign: 'left',
    fontSize: 24,
    marginRight: 70,
    borderWidth: 1,
    borderColor: '#000000'
  }
});

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'center'
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
