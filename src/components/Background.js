import React from 'react';
import { Group, Shape } from 'react-art';
import Rectangle from 'react-art/shapes/rectangle';
import range from 'lodash/range';

const NUM_STRIPES = 16;

export default function Background ({
  unitLength,
  xOffset,
  baseColor='#EBA777',
  stripeColor='#E5A374'
}) {
  const width = 16 * unitLength;
  const height = 9 * unitLength;
  const stripeWidth = 16 * unitLength /(NUM_STRIPES * 2);
  const stripeSkew = 2 * stripeWidth;
  return (
    <Group>
      <Rectangle width={width} height={height} fill={baseColor}/>
      <Group x={xOffset % (stripeWidth * 2)}>
        { range(NUM_STRIPES + 1).map((_,i) => (
          <Shape
            key={i}
            x={i * stripeWidth * 2}
            width={stripeWidth}
            height={height}
            fill={stripeColor}
            d={`
              M ${stripeSkew} 0
              L ${stripeSkew + stripeWidth} 0
              L ${stripeWidth} ${height}
              L 0 ${height}
              Z
            `}
          />
        ))}
      </Group>
    </Group>
  );
}