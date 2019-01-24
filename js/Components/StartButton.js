import React from 'react';
// import PropTypes from 'prop-types';
import { ViroButton } from 'react-viro';
import playIcon from '../res/assets/icon_play.png';

const StartButton = () => (
  <ViroButton
    source={playIcon}
    position={[0, 0, -5]}
    height={1}
    width={1}
    onClick={() => { }}
  />
);

StartButton.propTypes = {

};

export default StartButton;
