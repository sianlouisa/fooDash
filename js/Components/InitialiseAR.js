import React, { Component } from 'react';
import { ViroARSceneNavigator } from 'react-viro';
import {
  StyleSheet, Text, View, StatusBar, TouchableHighlight
} from 'react-native';
import { VIRO_API_KEY } from '../../config';
// import PropTypes from 'prop-types';

const InitialARScene = require('../ARView');

class InitialiseAR extends Component {
  state = {
    apiKey: VIRO_API_KEY,
    lives: 3,
    gameStarted: false,
    score: 0
  };


  updateScore = () => {
    this.setState({ score: this.state.score + 10 });
  }

  reduceLife = () => {
    this.setState({ lives: this.state.lives - 1 });
  };

  startGame = () => {
    this.setState({ gameStarted: true });
  };

  resetGame = () => {
    this.setState({ lives: 3 });
  };

  getARNavigator = () => {
    const { apiKey, lives, gameStarted, score } = this.state;
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
            }}
            initialScene={{ scene: InitialARScene }}
          />
          {gameStarted && (
            <>
              <View style={localStyles.topMenu}>
                <TouchableHighlight style={localStyles.buttons}>
                  <Text style={localStyles.buttonText}>{`Lives: ${lives}`}</Text>
                </TouchableHighlight>

                <TouchableHighlight style={localStyles.buttons}>
                  <Text style={localStyles.buttonText}>{`Score: ${score}`} </Text>
                </TouchableHighlight>

                <TouchableHighlight style={localStyles.buttons} onClick={this.resetGame}>
                  <Text style={localStyles.buttonText}>Reset</Text>
                </TouchableHighlight>
              </View>
            </>
          )}
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
    height: 80,
    width: 150,
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: 10,
    marginBottom: 10,
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
