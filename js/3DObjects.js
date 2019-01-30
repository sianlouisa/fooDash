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

import pizzaObj from './res/assets/pizza/13917_Pepperoni_v2_l2.obj';
import pizzaMtl from './res/assets/pizza/13917_Pepperoni_v2_l2.mtl';
import pizzaDiffuse from './res/assets/pizza/13917_Pepperoni_diffuse.jpg';
import pizzaPlate from './res/assets/pizza/plate_diffuse.jpg';

import pearObj from './res/assets/pear/10197_Pear.obj';
import pearMtl from './res/assets/pear/10197_Pear.mtl';
import pearTex from './res/assets/pear/Pears.JPG';

import pepperObj from './res/assets/pepper/10165_BellPepper_v01_L3.obj';
import pepperMtl from './res/assets/pepper/10165_BellPepper_v01_L3.mtl';
import pepperTex from './res/assets/pepper/GreenPepper_v01.jpg';

import carrotObj from './res/assets/carrot/10170_Carrot_v01_L3.obj';
import carrotMtl from './res/assets/carrot/10170_Carrot_v01_L3.mtl';
import carrotTex from './res/assets/carrot/Carrot_v01.jpg';

import appleObj from './res/assets/apple/10162_Apple_v01_l3.obj';
import appleMtl from './res/assets/apple/10162_Apple_v01_l3.mtl';
import appleTex from './res/assets/apple/Apple.jpg';

const physicsBody = {
  type: 'Dynamic',
  mass: 25,
  enabled: true,
  useGravity: true,
  restitution: 0.35,
  friction: 0.75
};

export const pizza = (pos, ref) => (
  <Viro3DObject
    position={pos}
    scale={[0.02, 0.02, 0.02]}
    rotation={[90, 90, 180]}
    source={pizzaObj}
    resources={[pizzaMtl, pizzaDiffuse, pizzaPlate]}
    type="OBJ"
    ref={ref}
    viroTag="pizza"
    physicsBody={physicsBody}
  />
);

export const cupcake = (pos, ref) => (
  <Viro3DObject
    position={pos}
    scale={[0.01, 0.01, 0.01]}
    rotation={[90, 90, 180]}
    source={cupcakeObj}
    resources={[cupcakeMtl, cupcakeBasket, cupcakeCream, cupcakeFilling]}
    type="OBJ"
    ref={ref}
    viroTag="cupcake"
    physicsBody={physicsBody}
  />
);

export const donut = (pos, ref) => (
  <Viro3DObject
    position={pos}
    scale={[0.01, 0.01, 0.01]}
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
    scale={[0.0007, 0.0007, 0.0007]}
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
    scale={[0.01, 0.01, 0.01]}
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
    scale={[0.0008, 0.0008, 0.0008]}
    rotation={[90, 90, 180]}
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
    scale={[0.0005, 0.0005, 0.0005]}
    rotation={[90, 90, 180]}
    source={appleObj}
    resources={[appleMtl, appleTex]}
    type="OBJ"
    ref={ref}
    viroTag="apple"
    physicsBody={physicsBody}
  />
);
