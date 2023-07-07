import {View, Text, Pressable, Dimensions} from 'react-native';
import React, {useState} from 'react';
import {
  Canvas,
  Group,
  RoundedRect,
  Skia,
  runTiming,
  useComputedValue,
  useValue,
  vec,
} from '@shopify/react-native-skia';
import {toMatrix3, processTransform3d} from 'react-native-redash';

const CONFETII_WIDTH = 10;
const CONFETII_HEIGHT = 30;
const NUM_OF_CONFETII = 20;

const {width, height} = Dimensions.get('screen');

interface Piece {
  startingXOffset: number;
  startingYOffset: number;
  offsetId: number;
  colorCode: number;
}
const relativeRotation = (yPosition: number, offset: number) => {
  const rand = Math.sin((yPosition - height) * (Math.PI / 540));
  const otherRand = Math.cos((yPosition - height) * (Math.PI / 540));
  return offset % 2 === 0 ? rand : otherRand;
};
const Colors = ['#184771', '#d41d33', '#d68183', '#f9ba74', '#4c9c57'];
const ConfettiPiece = ({
  startingXOffset,
  startingYOffset,
  offsetId,
  colorCode,
}: Piece) => {
  const yPosition = useValue(startingYOffset);
  const yCenter = useValue(0);
  const origin = useComputedValue(() => {
    yCenter.current = yPosition.current + CONFETII_HEIGHT / 2;
    const centerX = startingXOffset + CONFETII_WIDTH / 2;
    return vec(centerX, yCenter.current);
  }, [yPosition]);

  const matrix = useComputedValue(() => {
    const rotateZ =
      relativeRotation(yPosition.current, Math.round(offsetId)) * 3;
    const rotateY =
      relativeRotation(yPosition.current, Math.round(offsetId)) * 2;
    const rotateX =
      relativeRotation(yPosition.current, Math.round(offsetId)) * 2;
    const mat3 = toMatrix3(
      processTransform3d([{rotateX}, {rotateY}, {rotateZ}]),
    );
    return Skia.Matrix(mat3);
  }, [yPosition]);
  runTiming(yPosition, height * 3, {
    duration: 4000,
  });
  return (
    <Group origin={origin} matrix={matrix}>
      <RoundedRect
        x={startingXOffset}
        y={yPosition}
        height={CONFETII_HEIGHT}
        width={CONFETII_WIDTH}
        r={8}
        color={Colors[colorCode]}
      />
    </Group>
  );
};

const Confetti = () => {
  const [confettiPieces, setConfettiPieces] = useState<Piece[]>([]);
  const startAnimation = () => {
    const pieces: Piece[] = [];
    for (let i = 0; i < NUM_OF_CONFETII; i++) {
      const startingXOffset = Math.random() * width;
      const startingYOffset = -Math.random() * (height * 3);
      const offsetId = i * Math.random();
      pieces.push({
        offsetId,
        colorCode: Math.floor(Math.random() * Colors.length),
        startingXOffset,
        startingYOffset,
      });
    }
    setConfettiPieces(pieces);
  };

  return (
    <View
      style={{
        flex: 1,
      }}>
      <Canvas
        style={{
          flex: 1,
        }}>
        {confettiPieces.map(piece => (
          <ConfettiPiece key={piece.offsetId} {...piece} />
        ))}
      </Canvas>
      <Text
        style={{
          fontSize: 36,
          color: 'black',
          alignSelf: 'center',
          fontWeight: '700',
          position: 'absolute',
          top: height / 2 - 100,
        }}>
        Congratulations
      </Text>
      <Pressable
        onPress={startAnimation}
        style={{
          width: '70%',
          paddingVertical: 10,
          borderRadius: 10,
          position: 'absolute',
          bottom: 30,
          alignSelf: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#5e015a',
        }}>
        <Text
          style={{
            color: 'white',
            fontSize: 24,
          }}>
          START
        </Text>
      </Pressable>
    </View>
  );
};

export default Confetti;
