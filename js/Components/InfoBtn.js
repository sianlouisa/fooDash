import React from 'react';
import {ViroButton} from 'react-viro';


const InfoBtn = () => {
  return (
    <ViroButton
    source={require('../res/assets/icon_info.png')}
    position={[0, 0, -1]}
    height={1}
    width={1}
    onClick={() => { }}    
    />
  );
};

export default InfoBtn;
