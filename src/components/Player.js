import React from 'react';
import { Group } from 'react-art';
import Rectangle from 'react-art/shapes/rectangle';
import Wedge from 'react-art/shapes/wedge';
import BubbleEffect from './BubbleEffect';
import SplashEffect from './SplashEffect';

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
  const radius = size/2 * unitLength;
  return (
    <Group>
      <Wedge
        x={position.x - radius}
        y={position.y - radius}
        outerRadius={radius}
        startAngle={0}
        endAngle={180}
        fill={color}
      />
      { accelerating &&
        <Wedge
          x={position.x - radius * 1.1}
          y={position.y - radius * 1.1}
          innerRadius={radius}
          outerRadius={radius * 1.1}
          startAngle={0}
          endAngle={180}
          fill='#fff'
        />
      }
      <BubbleEffect
        { ...position }
        maxSpawnDistance={size}
        unitLength={unitLength}
        elapsedTime={elapsedTime}
        intensity={accelerating ? 4 : 1}
      />
      <SplashEffect
        { ...position }
        streamWidth={size}
        elapsedTime={elapsedTime}
        unitLength={unitLength}
        active={accelerating}
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