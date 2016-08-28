import React from 'react';
import { Group, Shape } from 'react-art';
import Rectangle from 'react-art/shapes/rectangle';
import range from 'lodash/range';

const NUM_STRIPES = 6;

export default function Background ({width, height, xOffset}) {
  const stripeWidth = width/(NUM_STRIPES * 2);
  const stripeSkew = stripeWidth / 2;
  return (
    <Group>
      <Rectangle width={width} height={height} fill='#aaa'/>
      <Group x={xOffset % (stripeWidth * 2)}>
        { range(NUM_STRIPES + 1).map((_,i) => (
          <Shape
            key={i}
            x={i * stripeWidth * 2}
            width={stripeWidth}
            height={height}
            fill='#999'
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