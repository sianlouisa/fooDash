import React, { Component } from 'react';
import { ViroARSceneNavigator } from 'react-viro';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import Login from './js/Components/Login';
import Signup from './js/Components/Signup';
import { VIRO_API_KEY } from './config';
import StartScreen from './js/Components/StartScreen';
import PlayAgain from './js/Components/PlayAgain';

const api = {
  apiKey: VIRO_API_KEY
};

const InitialARScene = require('./js/ARView');

export default class App extends Component {
  state = {
    sharedProps: api
  };

  getARNavigator = () => {
    const { sharedProps } = this.state;
    return <ViroARSceneNavigator {...sharedProps} initialScene={{ scene: InitialARScene }} />;
  }

  render() {
    return <SwitchNavContainer />;
  }
  // render() {
  //   return this.getARNavigator();
  // }
}

const SwitchNav = createSwitchNavigator({
  PlayAgain,
  StartScreen,
  Signup,
  Login,
});

const SwitchNavContainer = createAppContainer(SwitchNav);
