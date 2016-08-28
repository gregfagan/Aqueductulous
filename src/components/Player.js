import React from 'react';
import { Group } from 'react-art';
import Rectangle from 'react-art/shapes/rectangle';
import Circle from 'react-art/shapes/circle';
import BubbleEffect from './BubbleEffect';

function PlayerTrail ({
  position,
  unitLength,
  size,
  color
}) {
  return (
    // TODO: this is going to need to reuse some of the bezier magic
    // that the Level is doing.
    <Rectangle
      y={position.y - 1/2 * size * unitLength}
      width={position.x}
      height={size * unitLength}
      fill={color}
    />
  )
}

function PlayerHead ({ position, size, unitLength, color, elapsedTime, accelerating }) {
  return (
    <Group>
      <Circle
        x={position.x}
        y={position.y}
        radius={size/2 * unitLength}
        fill={color}
      />
      <BubbleEffect
        x={position.x}
        y={position.y}
        maxSpawnDistance={size}
        unitLength={unitLength}
        elapsedTime={elapsedTime}
        intensity={accelerating ? 4 : 1}
      />
    </Group>
  );
}

export default function Player ({
  accelerating,
  unitLength,
  elapsedTime,
  size,
  color
}) {
  const playerCenter = {
    x: 4 * unitLength,
    y: 4.5 * unitLength,
  };

  return (
    <Group>
      <PlayerTrail
        position={playerCenter}
        unitLength={unitLength}
        size={size}
        color={color}
      />
      <PlayerHead
        unitLength={unitLength}
        position={playerCenter}
        size={size}
        color={color}
        elapsedTime={elapsedTime}
        accelerating={accelerating}
      />
    </Group>
  );
}
Player.defaultProps = {
  accelerating: false,
  unitLength: 1,
  elapsedTime: 0,
  size: 0.5,
  color: '#79C9E5',
}