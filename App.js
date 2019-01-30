import React, { Component } from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import Login from './js/Screens/Login';
import Signup from './js/Screens/Signup';
import StartScreen from './js/Screens/StartScreen';
// import PlayAgain from './js/Screens/PlayAgain';
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
    // PlayAgain,
    StartScreen,
    Signup,
    Login,
    Instructions,
    InitialiseAR,
    AuthLoadingScreen
  },
  {
    initialRouteName: 'InitialiseAR',
  }
);

const SwitchNavContainer = createAppContainer(SwitchNav);
