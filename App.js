import React, { Component } from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { ImageBackground } from 'react-native';
import Login from './js/Screens/Login';
import Signup from './js/Screens/Signup';
import StartScreen from './js/Screens/StartScreen';
import Instructions from './js/Screens/Instructions';
import InitialiseAR from './js/Components/InitialiseAR';
import AuthLoadingScreen from './js/Screens/AuthLoadingScreen';
import Leaderboard from './js/Screens/Leaderboard';
import image from './js/res/assets/foodBorder.jpg';

export default class App extends Component {
  state = {};

  render() {
    return (
      <ImageBackground source={image} style={{ height: '100%', width: '100%' }}>
        <SwitchNavContainer />
      </ImageBackground>
    );
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
    initialRouteName: 'Instructions'
  }
);

const SwitchNavContainer = createAppContainer(SwitchNav);
