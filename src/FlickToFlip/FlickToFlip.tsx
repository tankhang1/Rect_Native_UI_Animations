import {View, Text, Image} from 'react-native';
import React from 'react';
import {ArrowDown} from './svg/arrowdown';
import Carousel from './components/carousel';
import Animated, {
  FadeOutDown,
  SlideInUp,
  SlideOutUp,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
const FLICK = 'Flick to Flip Camera';
const FINISH = 'FINISH';
const FlickToFlip = () => {
  const [isScroll, setIsScroll] = React.useState(true);
  const [isFlip, setIsFlip] = React.useState(false);
  const [title, setTitle] = React.useState(FLICK);
  const arrowDownValue = useSharedValue(1);
  const isPanY = useSharedValue(0);

  const arrowAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: arrowDownValue.value,
    };
  });
  const flipY = useSharedValue(0);
  React.useEffect(() => {
    if (isFlip) {
      flipY.value = withDelay(500, withTiming(1));
      setTitle(FINISH);
    } else {
      flipY.value = 0;
      setTitle(FLICK);
    }
  }, [isFlip]);
  const flipAnimation = useAnimatedStyle(() => {
    return {
      transform: [
        {rotateX: `${interpolate(flipY.value, [0, 1], [0, 180])}deg`},
      ],
    };
  });
  const opacityAnimation = useAnimatedStyle(() => {
    return {
      opacity: flipY.value,
    };
  });
  return (
    <View
      style={{
        backgroundColor: 'hsl(60,100%,50%)',
        flex: 1,
      }}>
      <View style={{height: 80}} />
      <View
        style={{
          height: 370,
        }}>
        {!isScroll && (
          <View>
            <Animated.View entering={SlideInUp}>
              <Animated.View
                style={[
                  {
                    alignSelf: 'center',
                    position: 'absolute',
                  },
                  opacityAnimation,
                ]}>
                <Image
                  style={{
                    width: 300,
                    height: 300,
                    borderWidth: 1,
                    borderRadius: 250,

                    backgroundColor: 'red',
                  }}
                  source={{
                    uri: 'https://i.pinimg.com/564x/c8/42/8e/c8428e8931c08340461b4c9e0056fc80.jpg',
                  }}
                />
              </Animated.View>
              <Animated.View
                style={[
                  {
                    alignSelf: 'center',
                    backfaceVisibility: 'hidden',
                  },
                  flipAnimation,
                ]}>
                <Image
                  style={{
                    width: 300,
                    height: 300,
                    borderWidth: 1,
                    borderRadius: 250,

                    backgroundColor: 'white',
                  }}
                  source={{
                    uri: 'https://i.pinimg.com/736x/6d/00/f8/6d00f80319f6371f5111e456fdbfac48.jpg',
                  }}
                />
              </Animated.View>
            </Animated.View>
            <View style={{height: 30}} />
            <Text
              style={{
                textAlign: 'center',
                fontSize: 18,
                color: 'black',
                fontWeight: '600',
              }}>
              {title}
            </Text>
          </View>
        )}
        {isScroll && (
          <Animated.View style={arrowAnimatedStyle}>
            <Text
              style={{
                color: 'hsl(0,0%,60%)',
                fontSize: 16,
                fontWeight: '600',
                alignSelf: 'center',
              }}>
              Pull down to reveal the camera
            </Text>

            <View
              style={{
                alignSelf: 'center',
                marginVertical: 15,
              }}>
              <ArrowDown />
            </View>
          </Animated.View>
        )}
      </View>

      <Carousel
        arrowDownValue={arrowDownValue}
        setIsScroll={setIsScroll}
        isScroll={isScroll}
        isPanY={isPanY}
        setIsFlip={setIsFlip}
      />
    </View>
  );
};

export default FlickToFlip;
