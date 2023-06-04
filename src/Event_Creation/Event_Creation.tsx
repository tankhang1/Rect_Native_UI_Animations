import {View, Text, FlatList, Pressable} from 'react-native';
import React, {useState} from 'react';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import {useSharedValue} from 'react-native-reanimated';

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
const TIME = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
];
const Event_Creation = () => {
  const [datePress, setDatePress] = useState(new Date().getDate());
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
  const renderTime = ({item, index}: {item: number; index: number}) => {
    return (
      <View
        style={{
          height: 100,
          flexDirection: 'row',
          alignItems: 'flex-start',
        }}>
        <Text
          style={{
            fontSize: 14,
            fontWeight: '500',
            marginRight: 10,
          }}>
          {index < 11 ? `${item} AM` : `${item} PM`}{' '}
        </Text>
        <View
          style={{
            width: '100%',
            height: 0.5,
            backgroundColor: 'hsl(0,0%,95%)',
          }}
        />
      </View>
    );
  };
  const position = useSharedValue(0);

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
      <GestureDetector gesture={}>
        <FlatList
          data={TIME}
          renderItem={renderTime}
          showsVerticalScrollIndicator={false}
          renderToHardwareTextureAndroid
          getItemLayout={(data, index) => ({
            length: 100,
            offset: 100 * index,
            index,
          })}
          style={{
            marginTop: 20,
          }}
        />
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

export default Event_Creation;
