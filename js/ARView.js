'use strict';

import React, { Component } from 'react';

import { StyleSheet } from 'react-native';

import {
  ViroARScene,
  ViroConstants,
  ViroARPlaneSelector,
  ViroAmbientLight,
  ViroBox,
  ViroMaterials,
  Viro3DObject,
} from 'react-viro';

export default class ARView extends Component {
  constructor() {
    super();

    // Set initial state here
    this.state = {
      isTracking: false,
      initialized: false,
      planeWidth: 0,
      planeLength: 0,
      userSelected: false,
    };

    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
  }

  render() {
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized}>
        <ViroARPlaneSelector onPlaneSelected={this.onPlaneSelected}>
          <ViroAmbientLight color="#ffffff" />
          {this.state.userSelected && (
            <Viro3DObject
              source={require('./res/res/emoji_smile/emoji_smile.vrx')}
              resources={[
                require('./res/res/emoji_smile/emoji_smile_diffuse.png'),
                require('./res/res/emoji_smile/emoji_smile_normal.png'),
                require('./res/res/emoji_smile/emoji_smile_specular.png'),
              ]}
              position={[0, 0.3, -0.2]}
              scale={[0.1, 0.1, 0.1]}
              type="VRX"
              physicsBody={{
                type: 'Dynamic',
                mass: 0.01,
                force: { value: [0, 0, 0.001] },
              }}
              // dragType="FixedToPlane"
              // onDrag={() => {}}
            />
          )}
          <ViroBox
            materials={['metal']}
            physicsBody={{ type: 'Static', restitution: 1, friction: 0.3 }}
            width={this.state.planeWidth}
            length={this.state.planeLength}
            scale={[1, 0.02, 1]}
          />
        </ViroARPlaneSelector>
      </ViroARScene>
    );
  }

  onPlaneSelected = anchorMap => {
    console.log(anchorMap);
    this.setState({
      planeWidth: 0.5,
      planeLength: 0.5,
      userSelected: true,
    });
  };

  _onInitialized = (state, reason) => {
    if (state == ViroConstants.TRACKING_NORMAL) {
      this.setState({
        isTracking: true,
        initialized: true,
      });
    } else if (state == ViroConstants.TRACKING_NONE) {
      this.setState({
        isTracking: false,
      });
    }
  };
}

ViroMaterials.createMaterials({
  transparent: {
    diffuseColor: 'rgba(0,0,0,0)',
  },
  metal: {
    lightingModel: 'Lambert',
    diffuseTexture: require('./res/textures/Metal_grunge_001_COLOR.jpg'),
    normalTexture: require('./res/textures/Metal_grunge_001_NRM.jpg'),
    specularTexture: require('./res/textures/Metal_grunge_001_SPEC.jpg'),
  },
});

module.exports = ARView;
