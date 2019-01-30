import React from 'react';
import { Viro3DObject } from 'react-viro';

import cupcakeObj from './res/assets/cupcake/12187_Cupcake_v1_L3.obj';
import cupcakeMtl from './res/assets/cupcake/12187_Cupcake_v1_L3.mtl';
import cupcakeBasket from './res/assets/cupcake/Cupcake_basket.jpg';
import cupcakeCream from './res/assets/cupcake/Cupcake_cream_diffuse.jpg';
import cupcakeFilling from './res/assets/cupcake/Cupcake_filling.jpg';

import donutObj from './res/assets/donut/Donut1.obj';
import donutMtl from './res/assets/donut/Donut1.mtl';
import donutDiffuse from './res/assets/donut/Bread (Diffuse).bmp';
import donutInverted from './res/assets/donut/Bread (Displacement) (Inverted).bmp';
import donutDisplace from './res/assets/donut/Bread (Displacement).bmp';

import pearObj from './res/assets/pear/10197_Pear.obj';
import pearMtl from './res/assets/pear/10197_Pear.mtl';
import pearTex from './res/assets/pear/Pears.JPG';

import pepperObj from './res/assets/pepper/10165_BellPepper_v01_L3.obj';
import pepperMtl from './res/assets/pepper/10165_BellPepper_v01_L3.mtl';
import pepperTex from './res/assets/pepper/GreenPepper_v01.jpg';

export const cupcake = (pos, collision, ref) => (
  <Viro3DObject
    position={pos}
    scale={[0.01, 0.01, 0.01]}
    rotation={[90, 90, 180]}
    source={cupcakeObj}
    resources={[cupcakeMtl, cupcakeBasket, cupcakeCream, cupcakeFilling]}
    type="OBJ"
    ref={ref}
    viroTag="cupcake"
    physicsBody={{
      type: 'Dynamic',
      mass: 1,
      enabled: true,
      useGravity: true,
      restitution: 0.35,
      friction: 0.75
    }}
  />
);

export const donut = (pos, collision, ref) => (
  <Viro3DObject
    position={pos}
    scale={[0.008, 0.008, 0.008]}
    rotation={[0, 0, 0]}
    source={donutObj}
    resources={[donutMtl, donutDiffuse, donutInverted, donutDisplace]}
    type="OBJ"
    ref={ref}
    viroTag="donut"
    physicsBody={{
      type: 'Dynamic',
      mass: 1,
      enabled: true,
      useGravity: true,
      restitution: 0.35,
      friction: 0.75
    }}
  />
);

export const pepper = (pos, collision, ref) => (
  <Viro3DObject
    position={pos}
    scale={[0.0005, 0.0005, 0.0005]}
    rotation={[90, 90, 180]}
    source={pepperObj}
    resources={[pepperMtl, pepperTex]}
    type="OBJ"
    ref={ref}
    viroTag="pepper"
    physicsBody={{
      type: 'Dynamic',
      mass: 25,
      enabled: true,
      useGravity: true,
      restitution: 0.35,
      friction: 0.75
    }}
  />
);

export const pear = (pos, collision, ref) => (
  <Viro3DObject
    position={pos}
    scale={[0.008, 0.008, 0.008]}
    rotation={[90, 90, 180]}
    source={pearObj}
    resources={[pearMtl, pearTex]}
    type="OBJ"
    ref={ref}
    viroTag="pear"
    physicsBody={{
      type: 'Dynamic',
      mass: 25,
      enabled: true,
      useGravity: true,
      restitution: 0.35,
      friction: 0.75
    }}
  />
);
