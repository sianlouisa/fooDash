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
  ViroARPlane,
  ViroText,
  ViroSphere,
  ViroARCamera
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

  handleUpClick = (pos) => {
    this.forceRef.applyImpulse([0, 0, -0.5], pos);
  };

  handleLeftClick = (pos) => {
    this.forceRef.applyImpulse([-0.5, 0, 0], pos);
  };

  handleRightClick = (pos) => {
    this.forceRef.applyImpulse([0.5, 0, 0], pos);
  };

  handleDownClick = (pos) => {
    this.forceRef.applyImpulse([0, 0, 0.5], pos);
  };

  generatePlayer = () => {
    const { planeLength } = this.state;
    const physicsBody = {
      type: 'Dynamic',
      mass: 4,
      useGravity: true,
      enabled: true,
      velocity: [0, 0, 0],
      shape: {
        type: 'Sphere',
        params: [0.14]
      }
    };
    // const playerStartPosition = planeLength - planeLength - planeLength / 2 + 0.1;

    return (
      <Viro3DObject
        position={[0, 0.1, 0]}
        scale={[0.1, 0.1, 0.1]}
        rotation={[0, 0, 0]}
        source={smile}
        resources={[diffuse, normal, specular]}
        type="VRX"
        renderingOrder={0}
        physicsBody={physicsBody}
        ref={obj => (this.forceRef = obj)}
      />
    );
  };

  render() {
    const { planePosition } = this.state;

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
              position={[0, 0, -0.3]}
              scale={[1.5, 1.5, 1.5]}
              rotation={[-90, 0, 0]}
              physicsBody={{ type: 'Static', restitution: 0.75, friction: 0.7 }}
              materials="ground"
              renderingOrder={-1}
            />
            <ViroQuad
              key="deadSpace"
              // onCollision={this.generatePlayer}
              height={100}
              width={100}
              rotation={[-90, 0, 0]}
              position={[0, -1, 0]}
              materials={['transparent']}
              physicsBody={{ type: 'Static' }}
            />
            <ViroNode position={planePosition}>{this.generatePlayer()}</ViroNode>
          </ViroNode>
        </ViroARPlane>
        <ViroARCamera active position={[0, 0, -0.2]}>
          <ViroSphere
            onClick={this.handleLeftClick}
            position={[-0.04, -0.05, -0.2]}
            materials={['spherematerial']}
            scale={[0.01, 0.01, 0.01]}
          />
          <ViroSphere
            onClick={this.handleRightClick}
            position={[-0.04, -0.1, -0.2]}
            materials={['spherematerial']}
            scale={[0.01, 0.01, 0.01]}
          />
          <ViroSphere
            onClick={this.handleDownClick}
            position={[-0.055, -0.075, -0.2]}
            materials={['spherematerial']}
            scale={[0.01, 0.01, 0.01]}
          />
          <ViroSphere
            onClick={this.handleUpClick}
            position={[-0.02, -0.075, -0.2]}
            materials={['spherematerial']}
            scale={[0.01, 0.01, 0.01]}
          />
        </ViroARCamera>
      </ViroARScene>
    );
  }
}

ViroMaterials.createMaterials({
  transparent: {
    diffuseColor: 'rgba(0,0,0,0)'
  },
  spherematerial: {
    diffuseColor: 'rgb(19,42,143)'
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
