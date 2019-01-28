import React, { Component } from 'react';
import {
  ViroARScene,
  ViroAmbientLight,
  ViroMaterials,
  Viro3DObject,
  ViroQuad,
  ViroBox,
  ViroText,
  ViroConstants,
  ViroARPlaneSelector
} from 'react-viro';
import TimerMixin from 'react-timer-mixin';
import { StyleSheet } from 'react-native';
import _ from 'lodash';
import smile from './res/res/emoji_smile/emoji_smile.vrx';
import diffuse from './res/res/emoji_smile/emoji_smile_diffuse.png';
import normal from './res/res/emoji_smile/emoji_smile_normal.png';
import specular from './res/res/emoji_smile/emoji_smile_specular.png';

export default class ARView extends Component {
  state = {
    isTracking: false,
    initialized: false,
    planeCenter: [0, 0, 0],
    pushCounter: 0,
    lives: 10
  };

  // Lets you know if there are any errors with loading the camera
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

  // Once the user has selected the plane set state to the dimensions and position
  // using anchor (this function is sometimes refered to as onAnchorFound on the docs)
  onPlaneSelected = (anchor) => {
    const anchoredPosition = [
      anchor.position[0] + anchor.center[0],
      anchor.position[1] + anchor.center[1],
      anchor.position[2] + anchor.center[2]
    ];
    this.setState({
      planeCenter: anchor.center,
      pushCounter: 0
    });
  };

  getScene = () => {
    const { planeCenter, pushCounter, lives } = this.state;
    return (
      <>
        <ViroAmbientLight color="#ffffff" />
        <ViroARPlaneSelector
          onPlaneSelected={this.onPlaneSelected}
          ref={component => (this.arPlaneRef = component)}
          maxPlanes={3}
        >
          {/* Renders the playing surface */}
          <ViroQuad
            position={planeCenter}
            scale={[1, 1, 1]}
            rotation={[-90, 0, 0]}
            physicsBody={{ type: 'Static' }}
            materials="ground"
            renderingOrder={-1}
          />
          {/* Renders the area that respawns character if falls of surface */}
          <ViroQuad
            key="deadSpace"
            onCollision={this.loseLife}
            height={100}
            width={100}
            rotation={[-90, 0, 0]}
            position={[0, -1, 0]}
            materials={['transparent']}
            physicsBody={{ type: 'Static' }}
          />
          {/* Renders the area the player must reach to win  */}
          <ViroBox
            key="goal"
            onCollision={this.resetPlayer}
            height={0.05}
            width={0.05}
            scale={[1, 2, 0.1]}
            physicsBody={{ type: 'Kinematic' }}
            position={[0, 0, -0.4]}
          />
          {this.generatePlayer(planeCenter)}
          {this.getText(lives.toString(), [0, 0.2, -0.4])}
          {lives <= 0 && this.getText('GAME OVER', [0, 0.5, -0.1])}
          {_.times(5, () => this.generateObstacles())}
          {pushCounter % 5 === 0 && pushCounter !== 0 && this.generateObstacles()}
        </ViroARPlaneSelector>
      </>
    );
  };

  loseLife = (collidedTag) => {
    const { lives } = this.state;
    if (collidedTag === 'player') {
      this.setState({ lives: this.state.lives - 1 }, () => {
        if (lives !== 1) {
          this.resetPlayer();
        }
      });
    }
  };

  // When getScene is loaded the emoji will be loaded via this function
  generatePlayer = () => {
    const physicsBody = {
      type: 'Dynamic',
      mass: 20,
      enabled: true,
      useGravity: true,
      restitution: 0.35,
      friction: 0.75,
      shape: {
        type: 'Sphere',
        params: [0.1]
      }
    };
    return (
      <Viro3DObject
        position={[0, 0.2, 0]}
        scale={[0.1, 0.1, 0.1]}
        source={smile}
        resources={[diffuse, normal, specular]}
        type="VRX"
        renderingOrder={0}
        physicsBody={physicsBody}
        ref={obj => (this.playerRef = obj)}
        onClick={this.pushPlayer()}
        viroTag="player"
      />
    );
  };

  // When emoji hits dead zone or goal it resets
  resetPlayer = () => {
    const physicsBody = {
      type: 'Dynamic',
      mass: 20,
      enabled: true,
      useGravity: true,
      restitution: 0.35,
      friction: 0.75,
      shape: {
        type: 'Sphere',
        params: [0.1]
      }
    };
    // Had to set physicsBody to null before resetting to initial props,
    // probably a much better way to do this!
    TimerMixin.setTimeout(() => {
      // passing 'ref={obj => (this.playerRef = obj)}'
      // to the emoji means that it can be accessed on this anywhere else
      // setNativeProps is React Native function
      this.playerRef.setNativeProps({ physicsBody: null });
      this.playerRef.setNativeProps({ position: [0, 0.1, 0] });
      TimerMixin.setTimeout(() => {
        this.playerRef.setNativeProps({ physicsBody });
      });
    });
  };

  handleClick = () => {
    this.setState(state => ({ pushCounter: state.pushCounter + 1 }));
  };

  // Function for onClick event of emoji to move around
  pushPlayer = () => (clickedPos, force) => {
    this.playerRef.getTransformAsync().then((transform) => {
      const pushImpulse = [0, force, 0];
      const pos = transform.position;
      const pushPosition = [clickedPos[0] - pos[0], clickedPos[1] - pos[1], clickedPos[2] - pos[2]];
      this.playerRef.applyImpulse(pushImpulse, pushPosition);
    });
  };

  // generateMultiple = (n, func) => _.times(n, func())

  generateObstacles = () => (
    <ViroBox
      scale={[0.1, 0.1, 0.1]}
      materials={['obstacle']}
      physicsBody={{
        type: 'Dynamic',
        mass: 25,
        enabled: true,
        useGravity: true,
        restitution: 0.35,
        friction: 0.75
      }}
      position={[0, 1, -0.2]}
      ref={obstacle => (this.obstacleRef = obstacle)}
      onCollision={this.resetPlayer}
      viroTag="obstacle"
    />
  );

  getText = (text, pos) => (
    <ViroText
      text={text}
      scale={[0.5, 0.5, 0.5]}
      position={pos}
      style={styles.helloWorldTextStyle}
    />
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
            : this.getText(initialized ? 'Initializing' : 'No Tracking', [0, 0, -0.1])}
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
  },
  obstacleCollision: {
    diffuseColor: 'rgb(255, 0, 0)'
  }
});

module.exports = ARView;
