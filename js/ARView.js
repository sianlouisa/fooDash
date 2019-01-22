import React, { Component } from 'react';
import {
  ViroARScene,
  ViroConstants,
  ViroARPlaneSelector,
  ViroAmbientLight,
  ViroBox,
  ViroMaterials,
  Viro3DObject,
  ViroNode
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
      planePosition: [],
      planeWidth: 1,
      planeLength: 1,
      planeCenter: [],
      userSelected: false,
    };

    // bind 'this' to functions
    this.onInitialized = this.onInitialized.bind(this);
  }

  onPlaneSelected = (anchor) => {
    this.setState({
      planePosition: anchor.position,
      planeWidth: anchor.width,
      planeLength: anchor.height,
      planeCenter: anchor.center,
      userSelected: true,
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
    const {
      userSelected, planeCenter,
    } = this.state;

    return (
      <ViroARScene onTrackingUpdated={this.onInitialized}>
        <ViroARPlaneSelector onPlaneSelected={this.onPlaneSelected} minWidth={0.5} minHeight={0.5}>
          <ViroAmbientLight color="#ffffff" />
          <ViroNode position={planeCenter}>

            <ViroBox
              position={[0, 0, 0]}
              materials={['metal']}
              physicsBody={{ type: 'Static' }}
              width={0.5}
              length={0.5}
              scale={[1, 0.02, 1]}
            />
            {userSelected && planeCenter !== 1 && (
              <Viro3DObject
                position={[0, 0, 0]}
                scale={[0.1, 0.1, 0.1]}
                source={smile}
                resources={[diffuse, normal, specular]}
                type="VRX"
                physicsBody={{
                  type: 'Dynamic',
                  mass: 1,
                  // velocity: [0.1, 0, 0],
                  shape: {
                    type: 'Compound',
                  }
                }}
              />
            )}
          </ViroNode>
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
