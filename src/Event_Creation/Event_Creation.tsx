import {View, Text, Pressable, StyleSheet, StatusBar} from 'react-native';
import React, {useState, useCallback} from 'react';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
  FlatList,
} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedProps,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';
import {Svg, Rect} from 'react-native-svg';
import {Dimensions} from 'react-native';
import {Modal} from 'react-native';
import Bottom_Modal from './Bottom_Modal';
const {width: WC} = Dimensions.get('screen');
const DATE_DAY = [
  {
    date: 31,
    day: 'S',
  },
  {
    date: 1,
    day: 'M',
  },
  {
    date: 2,
    day: 'T',
  },
  {
    date: 3,
    day: 'W',
  },
  {
    date: 4,
    day: 'T',
  },
  {
    date: 5,
    day: 'F',
  },
  {
    date: 6,
    day: 'S',
  },
];
interface Item {
  date: number;
  day: String;
}
type Props = {
  item: Item;
  index: number;
};
export interface addNewEvent {
  x: number;
  y: number;
  height: number;
  title: string;
  location: string;
  color: string;
  calendar: string;
}
const TIME = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
];
const Event_Creation = () => {
  const position = useSharedValue(0);
  const [isLongPress, setIsLongPress] = useState(false);
  const [locateXY, setLocateXY] = useState({x: 80, y: 70});
  const [onNewEvent, setAddNewEvent] = useState<addNewEvent[]>([]);
  const translateY_View = useSharedValue(30);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [datePress, setDatePress] = useState(new Date().getDate());
  const [openModal, setOpenModal] = useState<boolean>(false);

  const renderDate_Day = ({item, index}: Props) => {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontSize: 14,
            color: 'gray',
            fontWeight: '500',
          }}>
          {item.day}
        </Text>
        <Pressable
          onPress={() => setDatePress(item.date)}
          style={[
            {
              width: 30,
              height: 30,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 100,
              marginTop: 5,
            },
            datePress === item.date && {backgroundColor: 'black'},
          ]}>
          <Text
            style={[
              {
                fontSize: 16,
                color: 'black',
                fontWeight: '500',
              },
              datePress === item.date && {color: 'white'},
            ]}>
            {item.date}
          </Text>
        </Pressable>
      </View>
    );
  };
  const RenderPlan = ({renderIndex}: {renderIndex: number}) => {
    onNewEvent.map((event, index) => {
      if ((renderIndex + 1) * 60 >= event.y && renderIndex * 60 <= event.y)
        return (
          <View
            style={{
              width: WC - 100,
              top: Math.abs(-index * 60 + event.y) - TIME.length + 2,
              height: event.height,
              position: 'absolute',
              left: event.x,
              backgroundColor: event.color,
              borderRadius: 10,
              zIndex: 99,
              paddingHorizontal: 10,
              paddingVertical: 10,
            }}>
            <Text style={{color: 'white'}} adjustsFontSizeToFit>
              Title: {event.title}
            </Text>
            <Text style={{color: 'white'}} adjustsFontSizeToFit>
              Date: {event.calendar}
            </Text>

            <Text style={{color: 'white'}} adjustsFontSizeToFit>
              Location: {event.location}
            </Text>
          </View>
        );
    });
  };
  const renderTime = ({item, index}: {item: number; index: number}) => {
    return (
      <View
        style={{
          height: 60,
          width: '100%',
          flexDirection: 'row',
          alignItems: 'flex-start',
        }}>
        <Text
          style={{
            fontSize: 14,
            marginRight: 10,
            color: 'hsl(210,11%,60%)',
            width: 70,
          }}>
          {index < 11 ? `${item} AM` : `${item} PM`}{' '}
        </Text>
        <View
          style={{
            width: '80%',

            height: 0.5,
            opacity: 0.075,
            backgroundColor: 'gray',
          }}
        />
        {onNewEvent.map((event, eventIndex) => {
          if ((index + 1) * 60 >= event.y && index * 60 <= event.y)
            return (
              <View
                key={eventIndex}
                style={{
                  width: WC - 100,
                  top: Math.abs(-index * 60 + event.y) - TIME.length + 2,
                  height: event.height,
                  position: 'absolute',
                  left: event.x,
                  backgroundColor: event.color,
                  borderRadius: 10,

                  paddingHorizontal: 10,
                  paddingVertical: 10,
                }}>
                <Text style={{color: 'white'}} adjustsFontSizeToFit>
                  Title: {event.title}
                </Text>
                <Text style={{color: 'white'}} adjustsFontSizeToFit>
                  Date: {event.calendar}
                </Text>

                <Text style={{color: 'white'}} adjustsFontSizeToFit>
                  Location: {event.location}
                </Text>
              </View>
            );
        })}
      </View>
    );
  };

  const [eventIndex, setEventIndex] = useState<number>(0);
  const pan = Gesture.Pan()
    .runOnJS(true)
    .onUpdate(e => {
      translateY_View.value = e.translationY + 30;
    })

    .onEnd(e => {
      setOpenModal(true);
      setEventIndex(onNewEvent.length);
      setAddNewEvent([
        ...onNewEvent,
        {
          x: locateXY.x - 10,
          y: locateXY.y - headerHeight,
          height: e.translationY + 30,
          title: '',
          location: '',
          calendar: '',
          color: '',
        },
      ]);

      translateY_View.value = 30;
    });
  const tap = Gesture.Tap()
    .runOnJS(true)
    .onBegin(e => {
      console.log('Tap', e.y + headerHeight);
      setLocateXY({x: 80, y: e.y + headerHeight});
    });
  const viewAnimated = useAnimatedStyle(() => {
    return {
      height: translateY_View.value,
    };
  });

  return (
    <GestureHandlerRootView
      style={{
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 10,
      }}>
      <Text
        style={{
          fontSize: 26,
          color: 'black',
          fontWeight: '700',
        }}>
        Today
      </Text>
      {/*List Day & Date*/}
      <View>
        <FlatList
          data={DATE_DAY}
          renderItem={renderDate_Day}
          renderToHardwareTextureAndroid
          horizontal
          contentContainerStyle={{
            justifyContent: 'space-around',
            flex: 1,
          }}
        />
      </View>

      {/*List time */}
      <Pressable
        onLayout={e => setHeaderHeight(e.nativeEvent.layout.y)}
        onLongPress={() => setIsLongPress(true)}
        style={{
          flex: 1,
        }}>
        <GestureDetector gesture={tap}>
          <Animated.FlatList
            data={TIME}
            renderItem={renderTime}
            showsVerticalScrollIndicator={false}
            renderToHardwareTextureAndroid
            getItemLayout={(data, index) => ({
              length: 60,
              offset: 60 * index,
              index,
            })}
            style={{
              marginTop: 20,
            }}
          />
        </GestureDetector>
      </Pressable>

      <Modal
        visible={isLongPress}
        transparent
        onRequestClose={e => setIsLongPress(false)}>
        <GestureHandlerRootView
          style={{
            flex: 1,
          }}>
          <Pressable
            style={[StyleSheet.absoluteFill]}
            onPress={() => setIsLongPress(false)}
          />
          <GestureDetector gesture={pan}>
            <Animated.View
              onLayout={e =>
                console.log(
                  'layout',
                  e.nativeEvent.layout.y,
                  e.nativeEvent.layout.height,
                )
              }
              style={[
                {
                  width: WC - 100,
                  backgroundColor: 'green',
                  borderRadius: 10,
                  position: 'absolute',
                  left: locateXY.x,
                  top: locateXY.y,
                },
                viewAnimated,
              ]}></Animated.View>
          </GestureDetector>
        </GestureHandlerRootView>
      </Modal>
      <Bottom_Modal
        openModal={openModal}
        setOpenModal={setOpenModal}
        setIsLongPress={setIsLongPress}
        eventIndex={eventIndex}
        onNewEvent={onNewEvent}
        setOnNewEvent={setAddNewEvent}
      />
    </GestureHandlerRootView>
  );
};

export default Event_Creation;
