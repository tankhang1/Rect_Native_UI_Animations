import {
  View,
  Text,
  Modal,
  Pressable,
  StyleSheet,
  Dimensions,
  ScrollView,
  TextInput,
  Keyboard,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import Feather from 'react-native-vector-icons/Feather';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
interface Props {
  openModal: boolean;
  setOpenModal: Function;
  setIsLongPress: Function;
}
const {height: HC} = Dimensions.get('screen');
const COLORS = [
  '#76cff5',
  '#fba01e',
  '#fb0102',
  '#2d2f32',
  '#d41d33',
  '#fcd1d1',
  '#69a4f0',
  '#a5d042',
];
const Bottom_Modal = ({openModal, setOpenModal, setIsLongPress}: Props) => {
  const [eventTitle, setEventTitle] = useState<string>('');
  const [keyboardShow, setKeyboardShow] = useState<boolean>(false);
  const [chooseColor, setChooseColor] = useState<string>('#76cff5');
  const [location, setLocation] = useState<string>('');
  useEffect(() => {
    const subscribeShow = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardShow(true);
    });
    const subscribeunShow = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardShow(false);
    });
    return () => {
      subscribeShow.remove();
      subscribeunShow.remove();
    };
  }, []);
  const pan = Gesture.Pan();
  return (
    <Modal
      visible={openModal}
      onRequestClose={() => {
        setOpenModal(false);
        setIsLongPress(false);
      }}
      transparent
      statusBarTranslucent>
      <GestureHandlerRootView
        style={{
          flex: 1,
        }}>
        <Pressable
          onPress={() => {
            setOpenModal(false);
            setIsLongPress(false);
          }}
          style={[{flex: 1}, {backgroundColor: 'rgba(186,186,186,0.5)'}]}
        />
        <GestureDetector gesture={pan}>
          <Animated.View
            style={[
              {
                backgroundColor: 'white',
                width: '100%',
                height: HC,
                position: 'absolute',
                borderTopEndRadius: 20,
                borderTopLeftRadius: 20,
              },
              keyboardShow
                ? {marginTop: HC / 1.75 - 150}
                : {marginTop: HC / 1.75},
            ]}>
            <View
              style={{
                width: '12.5%',
                height: 5,
                borderRadius: 100,
                marginVertical: 10,
                alignSelf: 'center',
                backgroundColor: 'black',
              }}
            />
            <View
              style={{
                marginVertical: 10,
              }}>
              <ScrollView
                horizontal
                contentContainerStyle={{
                  justifyContent: 'space-around',
                  width: '100%',
                }}>
                {COLORS.map((color: string, index: number) => {
                  return (
                    <Pressable
                      onPress={() => setChooseColor(color)}
                      key={index}
                      style={[
                        {
                          borderRadius: 100,
                          padding: 1.5,
                        },
                        chooseColor === color && {
                          borderColor: color,
                          borderWidth: 1,
                        },
                      ]}>
                      <View
                        style={{
                          width: 20,
                          height: 20,
                          borderRadius: 100,
                          backgroundColor: color,
                        }}
                      />
                    </Pressable>
                  );
                })}
              </ScrollView>
            </View>
            <TextInput
              placeholder="Event title"
              placeholderTextColor={'gray'}
              style={{
                color: 'black',
                fontSize: 16,
                paddingHorizontal: 15,
              }}
              defaultValue={eventTitle}
              onChangeText={setEventTitle}
            />
            {/*Email */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 15,

                marginVertical: 5,
              }}>
              <View
                style={{
                  width: 25,
                  height: 25,
                  borderRadius: 10,
                  backgroundColor: chooseColor,
                  marginRight: 10,
                }}
              />
              <Text
                style={{
                  color: 'black',
                  fontWeight: '600',
                }}>
                doank3442@gmail.com
              </Text>
            </View>
            {/*Calendar */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 15,

                marginVertical: 5,
              }}>
              <Feather
                name="calendar"
                size={25}
                color={'gray'}
                style={{marginRight: 10}}
              />

              <Text
                style={{
                  color: 'black',
                  fontWeight: '600',
                }}>
                06/06/2003
              </Text>
            </View>

            {/*Time */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 15,

                marginVertical: 5,
              }}>
              <Feather
                name="clock"
                size={25}
                color={'gray'}
                style={{marginRight: 10}}
              />

              <Text
                style={{
                  color: 'black',
                  fontWeight: '600',
                  marginRight: 20,
                }}>
                3:00 AM → 3:00 PM
              </Text>
              <Text
                style={{
                  color: 'gray',
                  fontWeight: '500',
                  backgroundColor: '#ebedef',
                  paddingHorizontal: 10,
                  paddingVertical: 2,
                  borderRadius: 100,
                }}>
                30m
              </Text>
            </View>

            {/*Location */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 15,

                marginVertical: 5,
              }}>
              <EvilIcons
                name="location"
                size={25}
                color={'gray'}
                style={{marginRight: 10}}
              />

              <TextInput
                placeholder="Location"
                defaultValue={location}
                onChangeText={setLocation}
                style={{color: 'black', fontSize: 16, width: '100%'}}
                placeholderTextColor={'gray'}
              />
            </View>
          </Animated.View>
        </GestureDetector>
      </GestureHandlerRootView>
    </Modal>
  );
};

export default Bottom_Modal;
