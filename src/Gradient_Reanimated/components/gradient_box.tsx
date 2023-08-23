import {View, Text, Image, ImageBackground, StyleSheet} from 'react-native';
import React from 'react';
import {GRADIENT_BOX_HEIGHT} from '../../Gradient_Picker_Reanimated';
import Animated, {
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {gradient} from '../res/listGradient';
import {BlurView} from '@react-native-community/blur';
type Props = {
  index: number;
  gradient: gradient;
  openPicker: SharedValue<number>;
  translateY: SharedValue<number>;
};
const BackgroundImage = Animated.createAnimatedComponent(ImageBackground);
const Gradient_Box = ({index, gradient, openPicker, translateY}: Props) => {
  const boxAnimatedStyle = useAnimatedStyle(() => {
    const offset = Math.abs(translateY.value - index * GRADIENT_BOX_HEIGHT);
    const isSelected = Math.round(translateY.value / GRADIENT_BOX_HEIGHT);
    // console.log('offset', offset);
    return {
      zIndex: isSelected === index ? 100 : index,
      transform: [
        {
          translateY: interpolate(
            openPicker.value,
            [0, 1],
            [0, translateY.value - index * GRADIENT_BOX_HEIGHT],
          ),
        },
        {
          scale: interpolate(
            openPicker.value,
            [0, 1],
            [1, 1.3 / Math.log10(offset / 2 + 25)],
          ),
        },
      ],
    };
  });
  return (
    <Animated.View
      style={[
        {
          width: '80%',
          height: GRADIENT_BOX_HEIGHT,

          position: 'absolute',
          justifyContent: 'center',
          alignItems: 'center',
        },
        boxAnimatedStyle,
      ]}>
      <BlurView
        style={{width: '110%', height: '120%', position: 'absolute'}}
        reducedTransparencyFallbackColor="transparent"
        overlayColor="transparent"
        blurAmount={20}
        blurRadius={10}
        blurType="light"
      />
      <Image
        style={[
          StyleSheet.absoluteFill,
          {width: '100%', height: '100%', borderRadius: 10},
        ]}
        source={gradient.image}
      />
      <Text style={{color: 'black'}}>{gradient.name}</Text>
    </Animated.View>
  );
};

export default Gradient_Box;
