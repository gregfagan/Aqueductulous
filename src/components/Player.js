import React from 'react';
import { Group } from 'react-art';
import Circle from 'react-art/shapes/circle';

export default function Player ({
  position,
  velocity,
  accelerating,
  screenDimensions
}) {
  const playerCenter = {
    x: screenDimensions.width * 0.25,
    y: screenDimensions.height * 0.5
  };
  const playerSize = screenDimensions.height * 0.05;

  return (
    <Group x={playerCenter.x} y={playerCenter.y}>
      <Circle radius={playerSize} fill='#92FF6A'/>
    </Group>
  );
}