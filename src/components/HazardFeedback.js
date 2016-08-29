import React from 'react';
import { Text } from 'react-art';

export default function HazardFeedback ({ elapsedTime, unitLength }) {
  return (
    <Text
      x={4 * unitLength}
      y={3.5 * unitLength}
      font={{ fontSize: 16 }}
      fill='#fff'
      alignment='center'
    >
      Hello, world.
    </Text>
  );
}