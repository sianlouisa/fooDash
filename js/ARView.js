import React, { Component } from 'react';
import {
  ViroARScene,
  ViroAmbientLight,
  ViroMaterials,
  Viro3DObject,
  ViroNode,
  ViroQuad,
  ViroARPlane,
  ViroSphere,
  ViroARCamera
} from 'react-viro';
import TimerMixin from 'react-timer-mixin';
import smile from './res/res/emoji_smile/emoji_smile.vrx';
import diffuse from './res/res/emoji_smile/emoji_smile_diffuse.png';
import normal from './res/res/emoji_smile/emoji_smile_normal.png';
import specular from './res/res/emoji_smile/emoji_smile_specular.png';

export default class ARView extends Component {
  state = {
    planePosition: [0, 0, 0]
  };

  render() {
    const { planePosition } = this.state;

    return (
      <>
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
                scale={[1.5, 1.5, 1.5]}
                rotation={[-90, 0, 0]}
                physicsBody={{ type: 'Static', restitution: 0.75, friction: 0.7 }}
                materials="ground"
                renderingOrder={-1}
              />
              <ViroQuad
                key="deadSpace"
                onCollision={this.resetPlayer}
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

          <ViroARCamera active position={[0, 0, 0]}>
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
      </>
    );
  }

  onPlaneSelected = (anchor) => {
    const anchoredPosition = [
      anchor.position[0] + anchor.center[0],
      anchor.position[1] + anchor.center[1],
      anchor.position[2] + anchor.center[2]
    ];
    this.setState({
      planePosition: anchoredPosition
    });
    this.arPlaneRef.setNativeProps({ pauseUpdates: true });
  };

  handleUpClick = (pos) => {
    this.playerRef.applyImpulse([0, 0, -0.5], pos);
  };

  handleLeftClick = (pos) => {
    this.playerRef.applyImpulse([-0.5, 0, 0], pos);
  };

  handleRightClick = (pos) => {
    this.playerRef.applyImpulse([0.5, 0, 0], pos);
  };

  handleDownClick = (pos) => {
    this.playerRef.applyImpulse([0, 0, 0.5], pos);
  };

  resetPlayer = () => {
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
    TimerMixin.setTimeout(() => {
      this.playerRef.setNativeProps({ physicsBody: null });
      this.playerRef.setNativeProps({ position: [0, 0.1, 0] });
      TimerMixin.setTimeout(() => {
        this.playerRef.setNativeProps({ physicsBody });
      });
    });
  };

  generatePlayer = () => {
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
        ref={obj => (this.playerRef = obj)}
      />
    );
  };
}

ViroMaterials.createMaterials({
  transparent: {
    diffuseColor: 'rgba(0,0,0,0)'
  },
  spherematerial: {
    diffuseColor: 'rgb(19,42,143)'
  },
  ground: {
    diffuseColor: '#007CB6E6'
  }
});

module.exports = ARView;
