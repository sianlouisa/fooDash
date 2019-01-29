import React, { Component } from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import Login from './js/Screens/Login';
import Signup from './js/Screens/Signup';
import StartScreen from './js/Screens/StartScreen';
import Instructions from './js/Screens/Instructions';
import InitialiseAR from './js/Components/InitialiseAR';
import AuthLoadingScreen from './js/Screens/AuthLoadingScreen';
import Leaderboard from './js/Screens/Leaderboard';

export default class App extends Component {
  state = {};

  render() {
    return <SwitchNavContainer />;
  }
}

const SwitchNav = createSwitchNavigator(
  {
    Leaderboard,
    StartScreen,
    Signup,
    Login,
    Instructions,
    InitialiseAR,
    AuthLoadingScreen
  },
  {
    initialRouteName: 'Leaderboard'
  }
);

const SwitchNavContainer = createAppContainer(SwitchNav);
