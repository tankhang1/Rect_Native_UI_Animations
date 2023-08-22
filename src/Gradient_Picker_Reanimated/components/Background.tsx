import {View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';
import {gradients} from '../assets/res/listGradient';

const Background = ({gradientIdx}: {gradientIdx: number}) => {
  return (
    <Image
      source={gradients[gradientIdx].image}
      style={{position: 'absolute', width: '100%', height: '100%'}}
      resizeMode="stretch"
    />
  );
};

export default Background;
