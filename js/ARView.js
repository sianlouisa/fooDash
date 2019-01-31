import React, { Component } from 'react';
import {
  ViroARScene,
  ViroAmbientLight,
  ViroMaterials,
  Viro3DObject,
  ViroQuad,
  ViroText,
  ViroConstants,
  ViroARPlaneSelector
} from 'react-viro';
import TimerMixin from 'react-timer-mixin';
import { StyleSheet } from 'react-native';
import smile from './res/res/emoji_smile/emoji_smile.vrx';
import diffuse from './res/res/emoji_smile/emoji_smile_diffuse.png';
import normal from './res/res/emoji_smile/emoji_smile_normal.png';
import specular from './res/res/emoji_smile/emoji_smile_specular.png';
import tableCloth from './res/assets/tableCloth.jpg';
import { generateRandomPosition } from './utils/generateRandomPosition';
import * as object from './utils/3DObjects';

const playerPhysicsBody = {
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

export default class ARView extends Component {
  state = {
    isTracking: false,
    planeCenter: [0, 0, 0],
    donutPosition: [0.2, 0.1, 0],
    carrotPosition: [0.2, 0.1, -0.2],
    applePosition: [-0.2, 0.1, 0],
    pepperPosition: [0.4, 0.1, 0],
    pearPosition: [-0.4, 0.1, 0],
    pizzaPosition: [0.4, 0.1, -0.4],
    scaleFactor: 0,
  };

  // Lets you know if there are any errors with loading the camera
  onInitialized = (state) => {
    if (state === ViroConstants.TRACKING_NORMAL) {
      this.setState({
        isTracking: true,
      });
    }
  };

  onPlaneSelected = (anchor) => {
    const {
      arSceneNavigator: {
        viroAppProps: { startGame }
      }
    } = this.props;
    this.setState({
      planeCenter: anchor.center
    });
    startGame();
  };

  handleDeadSpaceCollision = (collidedTag) => {
    const {
      arSceneNavigator: {
        viroAppProps: { reduceLife, lives }
      }
    } = this.props;
    if (collidedTag === 'player') {
      reduceLife();
    }
    if (lives !== 1) {
      this.resetPlayer();
    }
  };

  handleObstacleCollision = (collidedTag) => {
    const {
      arSceneNavigator: {
        viroAppProps: { reduceLife }
      }
    } = this.props;
    if (collidedTag === 'player') {
      reduceLife();
    }
  };

  getScene = () => {
    const {
      planeCenter,
      donutPosition,
      carrotPosition,
      applePosition,
      pizzaPosition,
      pepperPosition,
      pearPosition,
      candyCanePosition,
      rabbitPosition
    } = this.state;
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
            scale={[1, 1, 1]}
            rotation={[-90, 0, 0]}
            physicsBody={{ type: 'Static' }}
            materials={['gameSurface']}
            renderingOrder={-1}
          />
          {/* Renders the area that respawns character if falls off surface */}
          <ViroQuad
            key="deadSpace"
            onCollision={this.handleDeadSpaceCollision}
            scale={[2, 2, 2]}
            rotation={[-90, 0, 0]}
            position={[0, -1, 0]}
            materials={['transparent']}
            physicsBody={{ type: 'Static' }}
            viroTag="deadSpace"
          />
          {this.generatePlayer(planeCenter)}
          {/* Tokens */}
          {object.donut(donutPosition, token => (this.donut = token))}
          {object.pizza(pizzaPosition, token => (this.pizza = token))}
          {object.rabbit(rabbitPosition, token => this.rabbit = token)}
          {object.candyCane(candyCanePosition, token => this.candycane = token)}
          {/* Obstacles */}
          {object.pepper(pepperPosition, obstacle => (this.pepper = obstacle))}
          {object.pear(pearPosition, obstacle => (this.pear = obstacle))}
          {object.carrot(carrotPosition, obstacle => (this.carrot = obstacle))}
          {object.apple(applePosition, obstacle => (this.apple = obstacle))}
        </ViroARPlaneSelector>
      </>
    );
  };

  handlePlayerCollision = (collidedTag) => {
    const {
      arSceneNavigator: {
        viroAppProps: { updateScore, reduceLife }
      }
    } = this.props;
    // Tokens
    if (collidedTag === 'rabbit') {
      updateScore();
      const newPosition = generateRandomPosition(0.1);
      this.setState({ rabbitPosition: newPosition });
    }
    if (collidedTag === 'candycane') {
      updateScore();
      const newPosition = generateRandomPosition(0.1);
      this.setState({ candyCanePosition: newPosition });
    }
    if (collidedTag === 'donut') {
      this.growPlayer()
      updateScore();
      const newPosition = generateRandomPosition(0.1);
      this.setState({ donutPosition: newPosition });
    }
    if (collidedTag === 'pizza') {
      this.growPlayer()
      updateScore();
      const newPosition = generateRandomPosition(0.1);
      this.setState({ pizzaPosition: newPosition });
    }
    // Obstacles
    if (collidedTag === 'pepper') {
      reduceLife();
      const newPosition = generateRandomPosition(0.1);
      this.setState({ pepperPosition: newPosition });
    }
    if (collidedTag === 'pear') {
      reduceLife();
      const newPosition = generateRandomPosition(0.1);
      this.setState({ pearPosition: newPosition });
    }
    if (collidedTag === 'carrot') {
      reduceLife();
      const newPosition = generateRandomPosition(0.1);
      this.setState({ carrotPosition: newPosition });
    }
    if (collidedTag === 'apple') {
      reduceLife();
      const newPosition = generateRandomPosition(0.1);
      this.setState({ applePosition: newPosition });
    }
  };

  generatePlayer = () => {
    const { scaleFactor } = this.state;
    const scale = [0.1, 0.1, 0.1].map(no => no + (0.05 * scaleFactor))
    return (
      <Viro3DObject
        position={[0, 0.2, 0]}
        scale={scale}
        source={smile}
        resources={[diffuse, normal, specular]}
        type="VRX"
        renderingOrder={0}
        physicsBody={physicsBody}
        ref={obj => (this.playerRef = obj)}
        onClick={this.pushPlayer()}
        onCollision={this.handlePlayerCollision}
        viroTag="player"
      />
    );
  }

  growPlayer = () => {
    this.setState((state) => ({ scaleFactor: state.scaleFactor + 1 }))
  }

  resetPlayer = () => {
    TimerMixin.setTimeout(() => {
      this.playerRef.setNativeProps({ playerPhysicsBody: null });
      this.playerRef.setNativeProps({ position: [0, 0.1, 0] });
      TimerMixin.setTimeout(() => {
        this.playerRef.setNativeProps({ playerPhysicsBody });
      });
    });
  };

  pushPlayer = () => (clickedPos, force) => {
    this.playerRef.getTransformAsync().then((transform) => {
      const pushImpulse = [0, force, 0];
      const pos = transform.position;
      const pushPosition = [clickedPos[0] - pos[0], clickedPos[1] - pos[1], clickedPos[2] - pos[2]];
      this.playerRef.applyImpulse(pushImpulse, pushPosition);
    });
  };

  getText = (text, pos) => (
    <ViroText
      text={text}
      scale={[0.5, 0.5, 0.5]}
      position={pos}
      style={styles.helloWorldTextStyle}
    />
  );

  render() {
    const { isTracking } = this.state;
    return (
      <>
        <ViroARScene
          onTrackingUpdated={this.onInitialized}
          physicsWorld={{
            gravity: [0, -9.81, 0]
          }}
        >
          {isTracking && this.getScene()}
        </ViroARScene>
      </>
    );
  }
}

ViroMaterials.createMaterials({
  transparent: {
    diffuseColor: 'rgba(0,0,0,0)'
  },
  gameSurface: {
    diffuseTexture: tableCloth
  }
});

const styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 10,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center'
  }
});

module.exports = ARView;
