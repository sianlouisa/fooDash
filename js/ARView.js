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
import smile from './res/res/emoji_smile/emoji_smile.vrx';
import diffuse from './res/res/emoji_smile/emoji_smile_diffuse.png';
import normal from './res/res/emoji_smile/emoji_smile_normal.png';
import specular from './res/res/emoji_smile/emoji_smile_specular.png';
import { generateRandomPosition } from './utils/generateRandomPosition';
import * as object from './3DObjects';

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

export default class ARView extends Component {
  state = {
    isTracking: false,
    initialized: false,
    planeCenter: [0, 0, 0],
    cupcakePosition: [0, 0.1, -0.2],
    donutPosition: [0.2, 0.1, 0],
    carrotPosition: [0.2, 0.1, -0.2],
    applePosition: [-0.2, 0.1, 0],
    pepperPosition: [0.4, 0.1, 0],
    pearPosition: [-0.4, 0.1, 0],
    pizzaPosition: [0.4, 0.1, -0.4]
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

  deadSpace = (collidedTag) => {
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
      cupcakePosition,
      carrotPosition,
      applePosition,
      pizzaPosition,
      pepperPosition,
      pearPosition
    } = this.state;
    const {
      arSceneNavigator: {
        viroAppProps: { lives, playerWins, playerWon }
      }
    } = this.props;

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
            scale={[2, 2, 2]}
            rotation={[-90, 0, 0]}
            physicsBody={{ type: 'Static' }}
            materials="ground"
            renderingOrder={-1}
          />
          {/* Renders the area that respawns character if falls off surface */}
          <ViroQuad
            key="deadSpace"
            onCollision={this.deadSpace}
            height={100}
            width={100}
            rotation={[-90, 0, 0]}
            position={[0, -1, 0]}
            materials={['transparent']}
            physicsBody={{ type: 'Static' }}
            viroTag="deadSpace"
          />
          {/* Renders the area the player must reach to win  */}
          <ViroBox
            key="goal"
            onCollision={playerWins}
            height={0.05}
            width={0.05}
            scale={[1, 2, 0.1]}
            physicsBody={{ type: 'Kinematic' }}
            position={[0, 0, -0.4]}
          />
          {this.generatePlayer()}
          {!lives && this.getText('GAME OVER', [0, 0, -0.5])}
          {playerWon && this.getText('Winner', [0, 0, -0.5])}
          {/* Tokens */}
          {object.cupcake(cupcakePosition, token => (this.cupcake = token))}
          {object.donut(donutPosition, token => (this.donut = token))}
          {object.pizza(pizzaPosition, token => (this.pizza = token))}
          {/* Obstalces */}
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
    if (collidedTag === 'cupcake') {
      updateScore();
      const newPosition = generateRandomPosition(0.1);
      this.setState({ cupcakePosition: newPosition });
    }
    if (collidedTag === 'donut') {
      updateScore();
      const newPosition = generateRandomPosition(0.1);
      this.setState({ donutPosition: newPosition });
    }
    if (collidedTag === 'pizza') {
      updateScore();
      const newPosition = generateRandomPosition(0.1);
      this.setState({ pizzaPosition: newPosition });
    }
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

  generatePlayer = () => (
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
      onCollision={this.handlePlayerCollision}
      viroTag="player"
    />
  );

  resetPlayer = () => {
    TimerMixin.setTimeout(() => {
      this.playerRef.setNativeProps({ physicsBody: null });
      this.playerRef.setNativeProps({ position: [0, 0.1, 0] });
      TimerMixin.setTimeout(() => {
        this.playerRef.setNativeProps({ physicsBody });
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
  token: {
    diffuseColor: 'rgb(165, 47, 202)'
  },
  obstacle: {
    diffuseColor: 'rgb(0, 0, 255)'
  },
  fallingObstacle: {
    diffuseColor: 'rgb(255, 0, 0)'
  },
  tokenCollision: {
    diffuseColor: 'rgb(255, 0, 0)'
  }
});

module.exports = ARView;
