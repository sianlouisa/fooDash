import React, { Component } from 'react';
import {
  ViroARScene,
  ViroConstants,
  ViroARPlaneSelector,
  ViroAmbientLight,
  ViroBox,
  ViroMaterials,
  Viro3DObject
} from 'react-viro';

import smile from './res/res/emoji_smile/emoji_smile.vrx';
import diffuse from './res/res/emoji_smile/emoji_smile_diffuse.png';
import normal from './res/res/emoji_smile/emoji_smile_normal.png';
import specular from './res/res/emoji_smile/emoji_smile_specular.png';
import planeDiffuse from './res/textures/Metal_grunge_001_COLOR.jpg';
import planeNormal from './res/textures/Metal_grunge_001_NRM.jpg';
import planeSpecular from './res/textures/Metal_grunge_001_SPEC.jpg';

export default class ARView extends Component {
  constructor() {
    super();

    // Set initial state here
    this.state = {
      isTracking: false,
      initialized: false,
      planeWidth: 0,
      planeLength: 0,
      userSelected: false
    };

    // bind 'this' to functions
    this.onInitialized = this.onInitialized.bind(this);
  }

  onPlaneSelected = (anchor) => {
    this.setState({
      planeWidth: anchor.width,
      planeLength: anchor.height,
      userSelected: true
    });
  };

  onInitialized = (state) => {
    if (state === ViroConstants.TRACKING_NORMAL) {
      this.setState({
        isTracking: true,
        initialized: true
      });
    } else if (state === ViroConstants.TRACKING_NONE) {
      this.setState({
        isTracking: false
      });
    }
  };

  render() {
    const { userSelected, planeWidth, planeLength } = this.state;
    return (
      <ViroARScene onTrackingUpdated={this.onInitialized}>
        <ViroARPlaneSelector onPlaneSelected={this.onPlaneSelected}>
          <ViroAmbientLight color="#ffffff" />
          {userSelected && (
            <Viro3DObject
              source={smile}
              resources={[diffuse, normal, specular]}
              position={[0, 0.15, 0]}
              scale={[0.1, 0.1, 0.1]}
              type="VRX"
              physicsBody={{
                type: 'Dynamic',
                mass: 1,
                velocity: [0.1, 0, 0],
                shape: {
                  type: 'Compound',
                }
              }}
            />
          )}
          <ViroBox
            materials={['metal']}
            physicsBody={{ type: 'Static', restitution: 1, friction: 0 }}
            width={planeWidth}
            length={planeLength}
            scale={[1, 0.02, 1]}
          />
        </ViroARPlaneSelector>
      </ViroARScene>
    );
  }
}

ViroMaterials.createMaterials({
  transparent: {
    diffuseColor: 'rgba(0,0,0,0)'
  },
  metal: {
    lightingModel: 'Lambert',
    diffuseTexture: planeDiffuse,
    normalTexture: planeNormal,
    specularTexture: planeSpecular
  }
});

module.exports = ARView;
