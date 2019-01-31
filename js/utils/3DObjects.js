import React from 'react';
import { Viro3DObject } from 'react-viro';

import donutObj from '../res/assets/donut/Donut1.obj';
import donutMtl from '../res/assets/donut/Donut1.mtl';
import donutDiffuse from '../res/assets/donut/Bread (Diffuse).bmp';
import donutInverted from '../res/assets/donut/Bread (Displacement) (Inverted).bmp';
import donutDisplace from '../res/assets/donut/Bread (Displacement).bmp';

import pizzaObj from '../res/assets/pizza/13917_Pepperoni_v2_l2.obj';
import pizzaMtl from '../res/assets/pizza/13917_Pepperoni_v2_l2.mtl';
import pizzaDiffuse from '../res/assets/pizza/13917_Pepperoni_diffuse.jpg';
import pizzaPlate from '../res/assets/pizza/plate_diffuse.jpg';

import pearObj from '../res/assets/pear/10197_Pear.obj';
import pearMtl from '../res/assets/pear/10197_Pear.mtl';
import pearTex from '../res/assets/pear/Pears.JPG';

import pepperObj from '../res/assets/pepper/10165_BellPepper_v01_L3.obj';
import pepperMtl from '../res/assets/pepper/10165_BellPepper_v01_L3.mtl';
import pepperTex from '../res/assets/pepper/GreenPepper_v01.jpg';

import carrotObj from '../res/assets/carrot/10170_Carrot_v01_L3.obj';
import carrotMtl from '../res/assets/carrot/10170_Carrot_v01_L3.mtl';
import carrotTex from '../res/assets/carrot/Carrot_v01.jpg';

import appleObj from '../res/assets/apple/10162_Apple_v01_l3.obj';
import appleMtl from '../res/assets/apple/10162_Apple_v01_l3.mtl';
import appleTex from '../res/assets/apple/Apple.jpg';

import candyObj from '../res/assets/candycane/candyCane.obj';
import candyMtl from '../res/assets/candycane/candyCane.mtl';
import candyDiffuse from '../res/assets/candycane/candy_cane_diffuse.jpg';
import candyBump from '../res/assets/candycane/candy_cane_bump.jpg';

import rabbitObj from '../res/assets/chocrabbit/12953_ChocolateRabbit_v1.obj';
import rabbitMtl from '../res/assets/chocrabbit/12953_ChocolateRabbit_v1.mtl';
import rabbitTex from '../res/assets/chocrabbit/chocolate_rabbitDiffuseMap.jpg';

const physicsBody = {
  type: 'Dynamic',
  mass: 25,
  enabled: true,
  useGravity: true,
  restitution: 0.35,
  friction: 0.75
};

export const rabbit = (pos, ref) => (
  <Viro3DObject
    position={pos}
    scale={[0.008, 0.008, 0.008]}
    rotation={[90, 90, 180]}
    source={rabbitObj}
    resources={[rabbitMtl, rabbitTex]}
    type="OBJ"
    ref={ref}
    viroTag="rabbit"
    physicsBody={physicsBody}
  />
);

export const candyCane = (pos, ref) => (
  <Viro3DObject
    position={pos}
    scale={[0.007, 0.007, 0.007]}
    rotation={[0, 0, 0]}
    source={candyObj}
    resources={[candyMtl, candyDiffuse, candyBump]}
    type="OBJ"
    ref={ref}
    viroTag="candycane"
    physicsBody={physicsBody}
  />
);

export const pizza = (pos, ref) => (
  <Viro3DObject
    position={pos}
    scale={[0.008, 0.008, 0.008]}
    rotation={[90, 90, 180]}
    source={pizzaObj}
    resources={[pizzaMtl, pizzaDiffuse, pizzaPlate]}
    type="OBJ"
    ref={ref}
    viroTag="pizza"
    physicsBody={physicsBody}
  />
);

export const donut = (pos, ref) => (
  <Viro3DObject
    position={pos}
    scale={[0.006, 0.006, 0.006]}
    rotation={[0, 0, 0]}
    source={donutObj}
    resources={[donutMtl, donutDiffuse, donutInverted, donutDisplace]}
    type="OBJ"
    ref={ref}
    viroTag="donut"
    physicsBody={physicsBody}
  />
);

export const pepper = (pos, ref) => (
  <Viro3DObject
    position={pos}
    scale={[0.0004, 0.0004, 0.0004]}
    rotation={[90, 90, 180]}
    source={pepperObj}
    resources={[pepperMtl, pepperTex]}
    type="OBJ"
    ref={ref}
    viroTag="pepper"
    physicsBody={physicsBody}
  />
);

export const pear = (pos, ref) => (
  <Viro3DObject
    position={pos}
    scale={[0.006, 0.006, 0.006]}
    rotation={[90, 90, 180]}
    source={pearObj}
    resources={[pearMtl, pearTex]}
    type="OBJ"
    ref={ref}
    viroTag="pear"
    physicsBody={physicsBody}
  />
);

export const carrot = (pos, ref) => (
  <Viro3DObject
    position={pos}
    scale={[0.0007, 0.0007, 0.0007]}
    rotation={[0, 0, 0]}
    source={carrotObj}
    resources={[carrotMtl, carrotTex]}
    type="OBJ"
    ref={ref}
    viroTag="carrot"
    physicsBody={physicsBody}
  />
);

export const apple = (pos, ref) => (
  <Viro3DObject
    position={pos}
    scale={[0.00037, 0.00037, 0.00037]}
    rotation={[90, 90, 180]}
    source={appleObj}
    resources={[appleMtl, appleTex]}
    type="OBJ"
    ref={ref}
    viroTag="apple"
    physicsBody={physicsBody}
  />
);
