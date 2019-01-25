import React from 'react';
import { ViroButton } from 'react-viro';
import pauseIcon from '../res/assets/icon_pause.png';

const PauseBtn = () => (
  <ViroButton
    source={pauseIcon}
    position={[0, 0, -1]}
    height={1}
    width={1}
    onClick={() => { }}
  />
);

export default PauseBtn;
