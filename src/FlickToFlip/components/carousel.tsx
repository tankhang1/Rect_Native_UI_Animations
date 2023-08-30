import {View, Text, ScrollView, Dimensions} from 'react-native';
import React from 'react';
import {listUser} from '../res/res';
import CarouselItem from './carouselItem';
import Animated, {
  SharedValue,
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
const {width} = Dimensions.get('window');
const CENTERX = (width - 100) / 2;
type Props = {
  arrowDownValue: SharedValue<number>;
  isScroll: boolean;
  setIsScroll: React.Dispatch<React.SetStateAction<boolean>>;
  isPanY: SharedValue<number>;
  setIsFlip: React.Dispatch<React.SetStateAction<boolean>>;
};
const Carousel = ({
  arrowDownValue,
  isScroll,
  setIsScroll,
  isPanY,
  setIsFlip,
}: Props) => {
  const scrollX = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollX.value = event.contentOffset.x;
  });

  return (
    <Animated.ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      onScroll={scrollHandler}
      snapToInterval={101}
      scrollEnabled={isScroll}>
      <View
        style={{
          width: CENTERX,
        }}
      />
      {listUser.map((user, index) => {
        return (
          <View key={index}>
            <CarouselItem
              item={user}
              scrollX={scrollX}
              index={index}
              setIsScroll={setIsScroll}
              arrowDownValue={arrowDownValue}
              isPanY={isPanY}
              setIsFlip={setIsFlip}
            />
          </View>
        );
      })}
      <View
        style={{
          width: CENTERX,
        }}
      />
    </Animated.ScrollView>
  );
};

export default Carousel;
