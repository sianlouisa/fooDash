import React, { Component } from 'react';
import { ViroARSceneNavigator } from 'react-viro';
import VIRO_API_KEY from './config.js';

let sharedProps = {
  apiKey: VIRO_API_KEY,
};

let InitialARScene = require('./js/ARView');

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      sharedProps: sharedProps,
    };
    this._getARNavigator = this._getARNavigator.bind(this);
  }

  render() {
    return this._getARNavigator();
  }

  _getARNavigator() {
    return (
      <ViroARSceneNavigator
        {...this.state.sharedProps}
        initialScene={{ scene: InitialARScene }}
      />
    );
  }
}

module.exports = App;
