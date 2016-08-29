import React from 'react';
import { Group, Text } from 'react-art';

export default function ShadowText ({children, color, shadowColor, shadowOffsetRatio, font, alignment, ...rest}) {
  const offset = font.fontSize * shadowOffsetRatio;
  const completeFont = { ...ShadowText.defaultProps.font, ...font };
  return (
    <Group {...rest}>
      <Text
        x={-offset} y={offset}
        fill={shadowColor}
        alignment={alignment}
        font={completeFont}
      >
        {children}
      </Text>
      <Text
        fill={color}
        alignment={alignment}
        font={completeFont}
      >
        {children}
      </Text>
    </Group>
  )
}
ShadowText.defaultProps = {
  color: '#fff',
  shadowColor: '#79C9E5',
  alignment: 'center',
  shadowOffsetRatio: 1/16,
  font: {
    fontSize: 24,
    fontStyle: '',
    fontFamily: 'sans-serif',
    fontWeight: 'bold',
  }
}