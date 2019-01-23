import React, { Component } from 'react';
import {
  ViroARScene,
  ViroConstants,
  ViroARPlaneSelector,
  ViroAmbientLight,
  ViroBox,
  ViroMaterials,
  Viro3DObject,
  ViroNode,
  ViroLightingEnvironment,
  ViroQuad,
  ViroARPlane
} from 'react-viro';

import smile from './res/res/emoji_smile/emoji_smile.vrx';
import diffuse from './res/res/emoji_smile/emoji_smile_diffuse.png';
import normal from './res/res/emoji_smile/emoji_smile_normal.png';
import specular from './res/res/emoji_smile/emoji_smile_specular.png';
import planeDiffuse from './res/textures/Metal_grunge_001_COLOR.jpg';
import planeNormal from './res/textures/Metal_grunge_001_NRM.jpg';
import planeSpecular from './res/textures/Metal_grunge_001_SPEC.jpg';

export default class ARView extends Component {
  state = {
    isTracking: false,
    initialized: false,
    planeWidth: 1,
    planeLength: 1,
    planeCenter: [0, 0, 0],
    planePosition: [0, 0, 0],
    planeRotation: [0, 0, 0],
    foundPlane: false,
    quadRendered: false
  };

  onPlaneSelected = (anchor) => {
    const worldCenterPosition = [
      anchor.position[0] + anchor.center[0],
      anchor.position[1] + anchor.center[1],
      anchor.position[2] + anchor.center[2]
    ];
    this.setState({
      // planePosition: anchor.position,
      foundPlane: true,
      planeWidth: anchor.width,
      planeLength: anchor.height,
      planeCenter: anchor.center,
      planeRotation: anchor.rotation,
      planePosition: worldCenterPosition
    });
    this.arPlaneRef.setNativeProps({ pauseUpdates: true });
  };

  render() {
    const { planePosition, planeLength } = this.state;

    const playerStartPosition = planeLength - planeLength - planeLength / 2 + 0.1;

    return (
      <ViroARScene
        onTrackingUpdated={this.onInitialized}
        physicsWorld={{
          gravity: [0, -9.81, 0]
        }}
      >
        <ViroAmbientLight color="#ffffff" />
        <ViroARPlane
          onPlaneSelected={this.onPlaneSelected}
          ref={component => (this.arPlaneRef = component)}
        >
          <ViroNode position={planePosition}>
            <ViroQuad
              position={[0, 0, 0]}
              scale={[1, 1, 1]}
              rotation={[-90, 0, 0]}
              physicsBody={{ type: 'Static', restitution: 0.75 }}
              materials="ground"
              renderingOrder={-1}
            />
            <ViroNode position={planePosition}>
              <Viro3DObject
                position={[0, 0.1, playerStartPosition]}
                scale={[0.1, 0.1, 0.1]}
                rotation={[0, 0, 0]}
                source={smile}
                resources={[diffuse, normal, specular]}
                type="VRX"
                renderingOrder={0}
                physicsBody={{
                  type: 'Dynamic',
                  mass: 4,
                  useGravity: true,
                  enabled: true,
                  restitution: 0.65,
                  // velocity: [0, 0, 0.1],
                  shape: {
                    type: 'Sphere',
                    params: [0.14]
                  }
                }}
              />
            </ViroNode>
          </ViroNode>
        </ViroARPlane>
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
  },
  ground: {
    diffuseColor: '#007CB6E6'
  }
});

module.exports = ARView;
