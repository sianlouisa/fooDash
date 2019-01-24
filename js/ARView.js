import React, { Component } from 'react';
import {
  ViroARScene,
  ViroAmbientLight,
  ViroMaterials,
  Viro3DObject,
  ViroNode,
  ViroQuad,
  ViroSphere,
  ViroBox,
  ViroText,
  ViroConstants,
  ViroARPlaneSelector,
  ViroCamera
} from 'react-viro';
import TimerMixin from 'react-timer-mixin';
import { StyleSheet } from 'react-native';
import smile from './res/res/emoji_smile/emoji_smile.vrx';
import diffuse from './res/res/emoji_smile/emoji_smile_diffuse.png';
import normal from './res/res/emoji_smile/emoji_smile_normal.png';
import specular from './res/res/emoji_smile/emoji_smile_specular.png';

export default class ARView extends Component {
  state = {
    planePosition: [0, 0, 0],
    isTracking: false,
    initialized: false,
    showController: false
  };

  onPlaneSelected = (anchor) => {
    const anchoredPosition = [
      anchor.position[0] + anchor.center[0],
      anchor.position[1] + anchor.center[1],
      anchor.position[2] + anchor.center[2]
    ];
    this.setState({
      planePosition: anchoredPosition,
      showController: true
    });
    // this.arPlaneRef.setNativeProps({ pauseUpdates: true });
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

  randomObstaclePosition = () => {};

  generateObstales = () => (
    <ViroBox
      scale={[0.05, 0.05, 0.05]}
      materials={['obstacle']}
      physicsBody={{
        type: 'Dynamic',
        mass: 15,
        enabled: true,
        useGravity: true,
        restitution: 0.35,
        friction: 0.75
      }}
      position={[0, 2, 0]}
      renderingOrder={1}
    />
  );

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
        position={[0, 0, 0]}
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

  onInitialized = (state) => {
    if (state === ViroConstants.TRACKING_NORMAL) {
      this.setState({
        isTracking: true,
        initialized: true
      });
    } else if (state === ViroConstants.TRACKING_NONE) {
      this.setState({
        isTracking: false,
        initialized: false
      });
    }
  };

  getText = text => (
    <ViroText
      text={text}
      scale={[0.5, 0.5, 0.5]}
      position={[0, 0, -0.5]}
      style={styles.helloWorldTextStyle}
    />
  );

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

  getScene = () => (
    <>
      <ViroAmbientLight color="#ffffff" />
      <ViroARPlaneSelector
        onPlaneSelected={this.onPlaneSelected}
        onAnchorRemoved={this.onAnchorRemoved}
        onAnchorUpdated={this.onAnchorUpdated}
        ref={component => (this.arPlaneRef = component)}
      >
        <ViroNode position={this.state.planePosition}>
          <ViroQuad
            position={[0, 0, 0]}
            scale={[1, 1, 1]}
            rotation={[-90, 0, 0]}
            physicsBody={{ type: 'Static' }}
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
          {this.generatePlayer()}
        </ViroNode>
      </ViroARPlaneSelector>
      {this.state.showController ? this.getController() : null}
    </>
  );

  getController = () => (
    <ViroCamera active>
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
    </ViroCamera>
  );

  render() {
    const { isTracking, initialized } = this.state;
    return (
      <>
        <ViroARScene
          onTrackingUpdated={this.onInitialized}
          physicsWorld={{
            gravity: [0, -9.81, 0]
          }}
        >
          {isTracking
            ? this.getScene()
            : this.getText(initialized ? 'Initializing' : 'No Tracking')}
        </ViroARScene>
      </>
    );
  }
}

const styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 10,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center'
  }
});

ViroMaterials.createMaterials({
  transparent: {
    diffuseColor: 'rgba(0,0,0,0)'
  },
  spherematerial: {
    diffuseColor: 'rgb(19,42,143)'
  },
  ground: {
    diffuseColor: '#007CB6E6'
  },
  obstacle: {
    diffuseColor: 'rgb(165, 47, 202)'
  }
});

module.exports = ARView;
