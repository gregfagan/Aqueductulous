import React from 'react';
import { Text } from 'react-art';

import { playerCenter } from '../game/player';

export default function HazardFeedback ({ player, level, elapsedTime, unitLength, yOffset, effectDuration }) {
  const { position, lastHazardEvent } = player;
  
  if (!lastHazardEvent) return <Text />;
  const timeSinceEvent = (elapsedTime - lastHazardEvent.time) / 1000;
  if (timeSinceEvent > effectDuration) return <Text />;
  // const t = timeSinceEvent / effectDuration;

  const center = playerCenter(position, level, unitLength);
  return (
    <Text
      x={center.x}
      y={center.y + yOffset * unitLength}
      font={{ fontSize: 22 }}
      fill='#fff'
      alignment='center'
    >
      { lastHazardEvent.result.text }
    </Text>
  );
}
HazardFeedback.defaultProps = {
  yOffset: -1.5,
  effectDuration: 1, 
}