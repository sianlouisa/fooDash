import React, { Component } from 'react';
import { ViroARSceneNavigator } from 'react-viro';
import VIRO_API_KEY from './config';

const api = {
  apiKey: VIRO_API_KEY
};

const InitialARScene = require('./js/ARView');

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      sharedProps: api
    };
    this.getARNavigator = this.getARNavigator.bind(this);
  }

  getARNavigator() {
    const { sharedProps } = this.state;
    return <ViroARSceneNavigator {...sharedProps} initialScene={{ scene: InitialARScene }} />;
  }

  render() {
    return (
      this.getARNavigator();
      )
  }
}

module.exports = App;
