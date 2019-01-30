import React, { Component } from 'react';
import { ViroARSceneNavigator } from 'react-viro';
import {
  StyleSheet, Text, View, StatusBar, TouchableHighlight
} from 'react-native';
import { VIRO_API_KEY } from '../../config';
import { generateRandomPosition } from '../utils/generateRandomPosition';
// import PropTypes from 'prop-types';s
import Score from './Score';
import ArLoad from './ArLoad';

const InitialARScene = require('../ARView');

class InitialiseAR extends Component {
  state = {
    apiKey: VIRO_API_KEY,
    lives: 200,
    gameStarted: false,
    playerWon: false,
    staticPosition: [0.1, 0, -0.2],
    dynamicPosition: [0.2, 3, -0.4],
    score: 0,
    isLoading: true
  };

  componentDidUpdate(prevState) {
    const { gameStarted } = this.state;
    if (prevState.gameStarted !== gameStarted) {
      setTimeout(() => {
        this.setState({ isLoading: false });
      }, 4000);
    }
  }

  updateScore = () => {
    this.setState(({ score }) => ({ score: score + 10 }));
  };

  reduceLife = () => {
    this.setState((state) => {
      const lives = state.lives ? state.lives - 1 : 0;
      return { lives };
    });
  };

  startGame = () => {
    this.setState({ gameStarted: true });
    setInterval(() => {
      this.setState({
        staticPosition: generateRandomPosition(0)
      });
    }, 5000);
  };

  resetGame = () => {
    this.setState({ lives: 3, score: 0 });
  };

  playerWins = (collidedTag) => {
    const { lives } = this.state;
    if (collidedTag === 'player' && !lives) {
      this.setState({ playerWon: true });
    }
  };

  getARNavigator = () => {
    const {
      apiKey,
      lives,
      playerWon,
      staticPosition,
      score,
      dynamicPosition,
      isLoading,
      gameStarted
    } = this.state;
    const { navigation: { navigate } } = this.props;
    return (
      <>
        <View style={localStyles.flex}>
          <StatusBar hidden />
          <ViroARSceneNavigator
            apiKey={apiKey}
            viroAppProps={{
              lives,
              startGame: this.startGame,
              reduceLife: this.reduceLife,
              gameOver: this.gameOver,
              updateScore: this.updateScore,
              playerWins: this.playerWins,
              playerWon,
              staticPosition,
              dynamicPosition
            }}
            initialScene={{ scene: InitialARScene }}
          />
          {lives && !playerWon
            ? (
              <>
                <View style={localStyles.topMenu}>
                  <TouchableHighlight style={localStyles.buttons}>
                    <Text style={localStyles.buttonText}>{`Lives: ${lives}`}</Text>
                  </TouchableHighlight>

                  <TouchableHighlight style={localStyles.buttonsScore}>
                    <Text style={localStyles.buttonText}>{`Score: ${score}`}</Text>
                  </TouchableHighlight>

                  <TouchableHighlight style={localStyles.buttons} onPress={this.resetGame}>
                    <Text style={localStyles.buttonText}>Reset</Text>
                  </TouchableHighlight>
                </View>
              </>
            )
            : <Score navigate={navigate} score={score} />
          }
          {isLoading && gameStarted && <ArLoad />}
        </View>
      </>
    );
  };

  render() {
    return this.getARNavigator();
  }
}


const localStyles = StyleSheet.create({
  viroContainer: {
    flex: 1,
    backgroundColor: 'black'
  },
  flex: {
    flex: 1
  },
  arView: {
    flex: 1
  },
  topMenu: {
    width: '100%',
    padding: 5,
    position: 'absolute',
    top: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleText: {
    paddingTop: 30,
    paddingBottom: 20,
    color: '#fff',
    textAlign: 'center',
    fontSize: 25
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20
  },
  buttons: {
    height: 40,
    width: 85,
    paddingTop: 5,
    paddingBottom: 5,
    marginLeft: 10,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: 'rgba(123,123,231,.4)',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(123,087,231,.4)'
  },
  buttonsScore: {
    height: 40,
    width: 100,
    paddingTop: 5,
    paddingBottom: 5,
    marginLeft: 10,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: 'rgba(123,123,231,.4)',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(123,087,231,.4)'
  },
  exitButton: {
    height: 50,
    width: 100,
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#68a0cf',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff'
  }
});

InitialiseAR.propTypes = {};

export default InitialiseAR;
