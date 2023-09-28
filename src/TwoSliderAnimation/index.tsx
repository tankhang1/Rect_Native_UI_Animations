import {View} from 'react-native';
import React from 'react';
import Thumb from './components/Thumb';
import Track from './components/Track';
import {useDerivedValue, useSharedValue} from 'react-native-reanimated';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const TwoSliderAnimation = () => {
  const thumbLeft = useSharedValue(0);
  const thumbRight = useSharedValue(0);

  const trackTrans = useSharedValue(0);

  const thumbLeftContranst = useDerivedValue(
    () => thumbLeft.value - trackTrans.value,
  );
  const thumbRightContranst = useDerivedValue(
    () => thumbRight.value - trackTrans.value,
  );
  const track = useDerivedValue(() =>
    Math.abs(thumbRight.value - thumbLeft.value),
  );
  const trackOffset = useSharedValue(0);
  return (
    <GestureHandlerRootView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          width: 320,
          height: 4,
          backgroundColor: '#CEDFFE',
          borderRadius: 4,
        }}>
        <Thumb
          thumbValue={thumbLeft}
          thumbOtherValue={thumbRight}
          trackTrans={trackTrans}
        />
        <Track
          trackValue={track}
          thumbLeftValue={thumbLeft}
          thumbRightValue={thumbRight}
          trackTrans={trackTrans}
          offset={trackOffset}
        />
        <Thumb
          isLeft={false}
          thumbOtherValue={thumbLeft}
          thumbValue={thumbRight}
          trackTrans={trackTrans}
        />
      </View>
    </GestureHandlerRootView>
  );
};

export default TwoSliderAnimation;
