import {View, Text, useWindowDimensions} from 'react-native';
import React from 'react';
import {Canvas, Drawing, Skia, useImage} from '@shopify/react-native-skia';
import {makeImageParticles} from './utils/utils';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
const FRICTION = 0.88;
const MOVE_SPEED = 0.88;
const Pixelated_Image = () => {
  const {width: stageWidth, height: stageHeight} = useWindowDimensions();
  const image = useImage(
    'https://i.pinimg.com/564x/3e/1a/3e/3e1a3e1b3be38426c449ac75f30392d3.jpg',
  );
  if (!image) return <></>;

  const particles = makeImageParticles(image, 35, 15, stageWidth, stageHeight);

  const pan = Gesture.Pan()
    .runOnJS(true)
    .onChange(e => {
      for (let i = 0; i < particles.length; i++) {
        const particle = particles[i];
        const dx = e.x - particle.x;
        const dy = e.y - particle.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const minDist = 100;
        if (dist < minDist) {
          const angle = Math.atan2(dy, dx);
          const tx = particle.x + Math.cos(angle) * minDist;
          const ty = particle.y + Math.sin(angle) * minDist;
          const ax = tx - e.y;
          const ay = ty - e.y;
          particle.vx -= ax;
          particle.vy -= ay;
        }
      }
    });
  return (
    <GestureHandlerRootView
      style={{
        flex: 1,
      }}>
      <GestureDetector gesture={pan}>
        <Canvas
          mode="continuous"
          style={{
            width: stageWidth,
            height: stageHeight,
          }}>
          <Drawing
            drawing={({canvas}) => {
              canvas.clear(Skia.Color('black'));
              for (let i = 0; i < particles.length; i++) {
                const particle = particles[i];
                particle.x += (particle.savedX - particle.x) * MOVE_SPEED;
                particle.y += (particle.savedY - particle.y) * MOVE_SPEED;

                particle.vx *= FRICTION;
                particle.vy *= FRICTION;

                particle.x += particle.vx;
                particle.y += particle.vy;

                canvas.save();
                canvas.translate(particle.x, particle.y);
                canvas.drawPicture(particle.picture);
                canvas.restore();
              }
            }}></Drawing>
        </Canvas>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

export default Pixelated_Image;
