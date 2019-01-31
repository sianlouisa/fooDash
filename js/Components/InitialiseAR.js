import React, { Component } from 'react';
import { ViroARSceneNavigator } from 'react-viro';
import {
  StyleSheet, Text, View, StatusBar, TouchableHighlight
} from 'react-native';
import { VIRO_API_KEY } from '../../config';
import Score from './Score';
import ArLoad from './ArLoad';
import PickPlane from './PickPlane';

const InitialARScene = require('../ARView');

class InitialiseAR extends Component {
  state = {
    apiKey: VIRO_API_KEY,
    gameStarted: false,
    lives: 3,
    score: 0,
    isLoading: true,
    endGame: false
  };

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
    this.setState({ gameStarted: true }, () => {
      setTimeout(() => {
        this.setState({ isLoading: false });
      }, 4000);
    });
  };

  handleEndGame = () => {
    this.setState({ endGame: true })
  };

  getARNavigator = () => {
    const {
      apiKey,
      lives,
      score,
      isLoading,
      gameStarted,
      endGame
    } = this.state;
    const { navigation: { navigate } } = this.props;
    return (
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
            score
          }}
          initialScene={{ scene: InitialARScene }}
        />
        {lives && !endGame
          ? (
            <>
              <View style={localStyles.topMenu}>
                <TouchableHighlight style={localStyles.buttons}>
                  <Text style={localStyles.buttonText}>{`Lives: ${lives}`}</Text>
                </TouchableHighlight>

                <TouchableHighlight style={localStyles.buttonsScore}>
                  <Text style={localStyles.buttonText}>{`Score: ${score}`}</Text>
                </TouchableHighlight>

                <TouchableHighlight style={localStyles.buttons} onPress={this.handleEndGame}>
                  <Text style={localStyles.buttonText}>End game</Text>
                </TouchableHighlight>
              </View>
            </>
          )
          : <Score navigate={navigate} score={score} />
        }
        {!gameStarted && <PickPlane />}
        {isLoading && gameStarted && <ArLoad />}
      </View>
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
