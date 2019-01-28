import React, { Component } from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import Login from './js/Screens/Login';
import Signup from './js/Screens/Signup';
import StartScreen from './js/Screens/StartScreen';
import PlayAgain from './js/Screens/PlayAgain';
import Instructions from './js/Screens/Instructions';
import InitialiseAR from './js/Components/InitialiseAR';

export default class App extends Component {
  state = {};

  render() {
    return <SwitchNavContainer />;
  }
}

const SwitchNav = createSwitchNavigator(
  {
    PlayAgain,
    StartScreen,
    Signup,
    Login,
    Instructions,
    InitialiseAR,
  },
  {
    initialRouteName: 'Login',
  }
);

const SwitchNavContainer = createAppContainer(SwitchNav);
