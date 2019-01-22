import React, { Component } from 'react';
import { ViroARSceneNavigator } from 'react-viro';
import VIRO_API_KEY from './config.js';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import Login from './js/Components/Login';
import Signup from './js/Components/Signup.js';
// let sharedProps = {
//   apiKey: VIRO_API_KEY,
// };

// let InitialARScene = require('./js/ARView');

// export default class App extends Component {

//     state = {
//       sharedProps: sharedProps,
//     };

//   render() {
//     return this._getARNavigator();
//   }

//   _getARNavigator = () => {
//     return (
//       <ViroARSceneNavigator
//         {...this.state.sharedProps}
//         initialScene={{ scene: InitialARScene }}
//       />
//     );
//   }
// }

// module.exports = App;

export default class App extends Component {
  state = {};

  render() {
    return <SwitchNavContainer />;
  }
}

const SwitchNav = createSwitchNavigator({
  Signup: Signup,
  Login: Login,
});

const SwitchNavContainer = createAppContainer(SwitchNav);