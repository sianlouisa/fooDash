import React, { Component } from 'react';
import { ViroARSceneNavigator } from 'react-viro';
import { VIRO_API_KEY } from '../../config';
// import PropTypes from 'prop-types';

const api = {
  apiKey: VIRO_API_KEY
};

const InitialARScene = require('../ARView');


class InitialiseAR extends Component {
  state = {
    sharedProps: api
  };

  getARNavigator = () => {
    const { sharedProps } = this.state;
    return <ViroARSceneNavigator {...sharedProps} initialScene={{ scene: InitialARScene }} />;
  }

  render() {
    return this.getARNavigator();
  }
}

InitialiseAR.propTypes = {

};

export default InitialiseAR;
