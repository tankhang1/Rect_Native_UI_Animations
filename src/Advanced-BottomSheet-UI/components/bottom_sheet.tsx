import {View, Text, Dimensions, ScrollView} from 'react-native';
import React, {useState, useTransition} from 'react';
import {LIST_RES} from '../res/listRes';
import BottomItem from './bottomItem';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedProps,
  useAnimatedStyle,
  useFrameCallback,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
const {width, height} = Dimensions.get('window');
type Props = {
  setResPicker: React.Dispatch<React.SetStateAction<res>>;
};
const IconAnimated = Animated.createAnimatedComponent(AntDesign);
const BottomSheet = ({setResPicker}: Props) => {
  const [isHorizontal, setIsHorizontal] = useState(true);
  const offsetY = useSharedValue(0);
  const transY = useSharedValue(0);
  const panGesture = Gesture.Pan()
    .onBegin(e => {
      offsetY.value = transY.value;
    })
    .onUpdate(e => {
      transY.value = offsetY.value + e.translationY;
      //    console.log(transY.value);
    })
    .onEnd(e => {
      if (transY.value < -height + 400) {
        transY.value = withTiming(-height + 200);
      }
      if (transY.value > -100) {
        transY.value = withTiming(0);
      }
    });

  useFrameCallback(() => {
    'worklet';
    if (transY.value < -10 && isHorizontal === true) {
      runOnJS(setIsHorizontal)(false);
    }
    if (transY.value >= -10 && isHorizontal === false) {
      runOnJS(setIsHorizontal)(true);
    }
  }, true);
  const bottomSheetStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: transY.value}],
    };
  });
  const arrowAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotateZ: `${interpolate(
            transY.value,
            [0, (-height + 200) / 2, -height + 200],
            [0, 90, 180],
          )}deg`,
        },
      ],
    };
  });
  return (
    <GestureHandlerRootView
      style={{
        flex: 1,
        backgroundColor: 'transparent',
        position: 'absolute',
        bottom: 0,
        top: 0,
        left: 0,
        right: 0,
      }}>
      <Animated.View
        style={[
          {
            backgroundColor: 'white',
            position: 'absolute',
            width,
            height,
            bottom: -height + 150,
            paddingVertical: 10,
            borderTopStartRadius: 30,
            borderTopEndRadius: 30,
            shadowColor: '#000',
            shadowOffset: {
              width: 15,
              height: 50,
            },
            shadowOpacity: 0.5,
            shadowRadius: 10,

            elevation: 20,
            zIndex: 10000,
          },
          bottomSheetStyle,
        ]}>
        <GestureDetector gesture={panGesture}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width,
              paddingHorizontal: 10,
            }}>
            <Text
              style={{
                color: 'black',
                fontSize: 18,
                fontWeight: '600',
                maxWidth: '90%',
              }}>
              To the world you may be one person, but to one person you may be
              the world
            </Text>
            <View style={{width: 10}} />
            <IconAnimated
              name="arrowup"
              color={'black'}
              size={24}
              style={arrowAnimatedStyle}
            />
          </View>
        </GestureDetector>

        <View>
          <ScrollView
            horizontal={isHorizontal}
            style={{
              paddingVertical: 20,
            }}
            showsHorizontalScrollIndicator={false}>
            {LIST_RES.map((res, index) => (
              <BottomItem
                key={index}
                item={res}
                setResPicker={setResPicker}
                transY={transY}
              />
            ))}
          </ScrollView>
        </View>
      </Animated.View>
    </GestureHandlerRootView>
  );
};

export default BottomSheet;
