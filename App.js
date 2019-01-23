import React, { Component } from 'react';
import { ViroARSceneNavigator } from 'react-viro';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import Login from './js/Components/Login';
import Signup from './js/Components/Signup';
import { VIRO_API_KEY } from './config';

const api = {
  apiKey: VIRO_API_KEY
};

const InitialARScene = require('./js/ARView');

export default class App extends Component {
  state = {
    sharedProps: api
  };

//   render() {
//     return <SwitchNavContainer />;
//   }

  getARNavigator = () => {
    const { sharedProps } = this.state;
    return <ViroARSceneNavigator {...sharedProps} initialScene={{ scene: InitialARScene }} />;
  }
  
  render() {
    return this.getARNavigator();
  }
}

const SwitchNav = createSwitchNavigator({
  Signup: Signup,
  Login: Login,
});

const SwitchNavContainer = createAppContainer(SwitchNav);