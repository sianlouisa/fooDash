import React, { Component } from 'react';
import {
  ViroARScene,
  ViroAmbientLight,
  ViroMaterials,
  Viro3DObject,
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
    showController: false,
    planeHeight: 0,
    planeWidth: 0,
    planeCenter: [0, 0, 0],
    isGeneratedPlayer: false,
    anchoredPosition: [0, 0, 0]
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
      showController: true,
      planeHeight: anchor.height,
      planeWidth: anchor.width,
      planePosition: anchor.position,
      planeCenter: anchor.center,
      anchoredPosition
    });
  };

  getScene = () => {
    const { planeCenter } = this.state;
    return (
      <>
        <ViroAmbientLight color="#ffffff" />
        <ViroARPlaneSelector
          onPlaneSelected={this.onPlaneSelected}
          ref={component => (this.arPlaneRef = component)}
          maxPlanes={3}
          onClick={this.placePlane}
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
            onCollision={this.resetPlayer}
            height={100}
            width={100}
            rotation={[-90, 0, 0]}
            position={[0, -1, 0]}
            materials={['transparent']}
            physicsBody={{ type: 'Static' }}
          />
          {/* Renders the area the player must reach to win (currently just resetting the player) */}
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
          {this.generateObstacles()}
        </ViroARPlaneSelector>
        {/* {this.state.showController ? this.getController() : null} */}
      </>
    );
  };

  // When getScene is loaded the emoji will be loaded via this function
  generatePlayer = (position) => {
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
        onClick={this.pushPlayer(3)}
        onCollision={this.resetPlayer}
      />
    );
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
    // Had to set physicsBody to null before resetting to initial props, probably a much better way to do this!
    TimerMixin.setTimeout(() => {
      // passing 'ref={obj => (this.playerRef = obj)}' to the emoji means that it can be accessed on this anywhere else
      // setNativeProps is React Native function
      this.playerRef.setNativeProps({ physicsBody: null });
      this.playerRef.setNativeProps({ position: [0, 0.1, 0] });
      TimerMixin.setTimeout(() => {
        this.playerRef.setNativeProps({ physicsBody });
      });
    });
  };

  randomObstaclePosition = () => {
    const { planeHeight, planeWidth } = this.state;
    const positionX = Math.floor(Math.random() * planeHeight - planeHeight / 2);
    const positionY = 1;
    const positionZ = Math.floor(Math.random() * planeWidth - planeWidth / 2);
    const randomPosition = [];
    randomPosition.push(positionX, positionY, positionZ);
    return randomPosition;
  };

  generateObstacles = () => this.obstacle();

  obstacle = () => {
    const { planeCenter } = this.state;
    return (
      <ViroBox
        scale={[0.1, 0.1, 0.1]}
        materials={['obstacle']}
        physicsBody={{
          type: 'Dynamic',
          mass: 10,
          enabled: true,
          useGravity: true,
          restitution: 0.35,
          friction: 0.75
        }}
        position={this.randomObstaclePosition()}
        ref={obstacle => (this.obstacleRef = obstacle)}
      />
    );
  };

  getText = text => (
    <ViroText
      text={text}
      scale={[0.5, 0.5, 0.5]}
      position={[0, 0, -0.5]}
      style={styles.helloWorldTextStyle}
    />
  );

  // Was the D pad controller but not rendering currently as it is causing bugs with the plane
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
  },
  obstacleCollision: {
    diffuseColor: 'rgb(255, 0, 0)'
  }
});

module.exports = ARView;
