import {View, Text, FlatList, Pressable} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import Feather from 'react-native-vector-icons/Feather';
import {
  Gesture,
  GestureDetector,
  GestureHandlerGestureEvent,
  GestureHandlerRootView,
  PanGesture,
  PanGestureChangeEventPayload,
} from 'react-native-gesture-handler';
import Animated, {
  cancelAnimation,
  runOnJS,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
const DATA: Item[] = [
  {
    id: 1,
    title: 'Break',
    time: Math.floor(Math.random() * 3600),
  },
  {
    id: 2,
    title: 'Break',
    time: Math.floor(Math.random() * 3600),
  },
  {
    id: 3,
    title: 'Break',
    time: Math.floor(Math.random() * 3600),
  },

  {
    id: 4,
    title: 'Break',
    time: Math.floor(Math.random() * 3600),
  },
  {
    id: 5,
    title: 'Break',
    time: Math.floor(Math.random() * 3600),
  },
  {
    id: 6,
    title: 'Break',
    time: Math.floor(Math.random() * 3600),
  },
];

interface Item {
  id: number;
  title: string;
  time: number;
}

const Draggable_Flatlist = () => {
  const [data, setData] = useState<Item[]>(DATA);
  const transY = DATA.map(() => useSharedValue(0));
  const viewAnimatedStyle = DATA.map((item: object, index: number) => {
    return useAnimatedStyle(() => {
      return {
        transform: [{translateY: transY[index].value}],
      };
    });
  });
  const renderItem = ({item, index}: {item: Item; index: number}) => {
    return (
      <Animated.View
        key={index}
        style={[
          {
            width: '90%',
            height: 50,
            borderRadius: 10,
            marginVertical: 10,
            alignSelf: 'center',
            backgroundColor: 'hsl(50,12%,95%)',
            flexDirection: 'row',
            alignItems: 'center',
          },
          viewAnimatedStyle[index],
        ]}>
        <View
          style={{
            width: '5%',
            height: '100%',
            backgroundColor: 'red',
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,
          }}
        />
        <Text
          style={{
            color: 'black',
            fontSize: 16,
            fontWeight: '600',
            marginLeft: 20,
            flex: 1,
          }}>
          {item.id}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginRight: 10,
          }}>
          <Text
            style={{
              color: 'black',
              fontWeight: '600',
              borderWidth: 1,
              paddingHorizontal: 10,
              paddingVertical: 2,
              borderRadius: 10,
              borderColor: '#bababa',
            }}>{`${Math.floor(item.time / 60)}:${Math.floor(
            item.time % 60,
          )}`}</Text>
          <Pressable
            style={{
              marginLeft: 20,
            }}>
            <Feather name="x" size={18} color={'#bababa'} />
          </Pressable>
        </View>
      </Animated.View>
    );
  };
  const indexTouch = useSharedValue(0);
  const preIndexTouch = useSharedValue(0);
  const [update, setUpdate] = useState(false);
  const onUpdateData = (cur: number, pre: number) => {
    let tmpData = data;
    let itemChoice = tmpData.splice(pre, 1)[0];
    tmpData.splice(cur, 0, itemChoice);
    setData([...tmpData]);
    setUpdate(!update);
  };
  useEffect(() => {
    transY.forEach(e => (e.value = 0));
  }, [update]);
  const moveFirst = useSharedValue(0);
  const moveSecond = useSharedValue(0);
  const minIndex = useSharedValue(0);
  const pan = Gesture.Pan()
    .onBegin(e => {
      indexTouch.value = Math.floor(e.absoluteY / 70);
      preIndexTouch.value = Math.floor(e.absoluteY / 70);
      minIndex.value = Math.floor(e.absoluteY / 70);
      moveFirst.value = e.y;
    })
    .onStart(e => {
      moveSecond.value = e.y;
    })
    .onChange(e => {
      indexTouch.value = Math.floor(e.absoluteY / 70);
      minIndex.value = Math.max(minIndex.value, indexTouch.value);

      if (moveSecond.value - moveFirst.value > 0) {
        if (indexTouch.value > preIndexTouch.value) {
          if (e.changeY > 0) transY[indexTouch.value].value = withTiming(-70);
          else {
            if (indexTouch.value < preIndexTouch.value) {
              transY[indexTouch.value].value = withTiming(-70);
            } else transY[indexTouch.value].value = withTiming(0);
          }
        }
        if (indexTouch.value < preIndexTouch.value) {
          if (e.changeY > 0) transY[indexTouch.value].value = withTiming(70);
          else {
            if (indexTouch.value < preIndexTouch.value) {
              transY[indexTouch.value].value = withTiming(70);
            } else transY[indexTouch.value].value = withTiming(0);
          }
        }
      } else {
        if (indexTouch.value > preIndexTouch.value) {
          if (e.changeY < 0) transY[indexTouch.value].value = withTiming(-70);
          else {
            if (indexTouch.value > preIndexTouch.value)
              transY[indexTouch.value].value = withTiming(-70);
            else transY[indexTouch.value].value = withTiming(0);
          }
        }
        if (indexTouch.value < preIndexTouch.value) {
          if (e.changeY < 0) transY[indexTouch.value].value = withTiming(70);
          else {
            if (indexTouch.value > preIndexTouch.value)
              transY[indexTouch.value].value = withTiming(70);
            else transY[indexTouch.value].value = withTiming(0);
          }
        }
      }

      transY[preIndexTouch.value].value = e.translationY;
    })
    .onEnd(e => {
      cancelAnimation(minIndex);
      minIndex.value = 0;
      let pre: number = preIndexTouch.value;
      let cur: number = Math.floor(indexTouch.value);
      if (pre >= cur) transY[pre].value = withTiming(-(pre - cur) * 70);
      else transY[pre].value = withTiming((cur - pre) * 70);
    })
    .onFinalize(e => {
      'worklet';
      let pre: number = Math.floor(preIndexTouch.value);
      let cur: number = Math.floor(indexTouch.value);
      runOnJS(onUpdateData)(cur, pre);
    });

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <GestureDetector gesture={pan}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
        />
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

export default Draggable_Flatlist;
