import React from 'react';
import { ViroButton } from 'react-viro';
import infoIcon from '../res/assets/icon_info.png';

const InfoBtn = () => (
  <ViroButton
    source={infoIcon}
    position={[0, 0, -1]}
    height={1}
    width={1}
    onClick={() => { }}
  />
);

export default InfoBtn;
