import {View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';
import {GradientType, gradients} from '../assets/res/listGradient';

const GradientLabel = ({gradient}: {gradient: GradientType}) => {
  return (
    <View style={{width: '80%', borderRadius: 12}}>
      <Image
        source={gradient.image}
        style={{
          height: 48,
          width: '100%',
          borderRadius: 8,
          borderColor: 'rgb(15,23,42)',
          borderWidth: 1,
        }}
        resizeMode="cover"
      />
      <View
        style={{
          position: 'absolute',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          height: '100%',
          paddingHorizontal: 10,
        }}>
        <Text style={{color: 'white'}}>{gradient.name}</Text>
        <Text style={{color: 'white'}}>
          #
          {String(gradients.length - gradients.indexOf(gradient)).padStart(
            2,
            '0',
          )}
        </Text>
      </View>
    </View>
  );
};

export default GradientLabel;
