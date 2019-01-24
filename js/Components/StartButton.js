import React from 'react';
// import PropTypes from 'prop-types';
import { ViroButton } from 'react-viro';

const StartButton = props => (
  <ViroButton
    source={require('../res/assets/icon_play.png')}
    position={[0, 0, -5]}
    height={1}
    width={1}
    onClick={() => { }}
  />
);

StartButton.propTypes = {

};

export default StartButton;
