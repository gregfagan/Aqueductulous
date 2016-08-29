import React, { Component } from 'react';
import { Shape, Group } from 'react-art';
import Color from 'color';

function Wave ({t, streamWidth, size, color, unitLength}) {
  const halfWidth = streamWidth/2 * unitLength;
  const s = size * (1-1/2*t);
  const distance = s * halfWidth;
  const x = halfWidth/2 - (5/4*Math.max(0, t - 0.2)) * size/2 * unitLength;
  const c = Color(color).clearer(t).rgbString();
  return (
    <Group x={x}>
      <Shape
        fill={c}
        y={-halfWidth}
        d={`
          M 0 0
          l ${-distance} 0
          l 0 ${-distance}
          Z
        `}
      />
      <Shape
        fill={c}
        y={halfWidth}
        d={`
          M 0 0
          l ${-distance} 0
          l 0 ${distance}
          Z
        `}
      />
    </Group>
  );
}
Wave.defaultProps = {
  size: 1,
  color: '#fff',
}

export default class SplashEffect extends Component {
  constructor() {
    super();
    this.state = { waveTimes: [] }
  }

  componentWillReceiveProps(nextProps) {
    const { waveTimes } = this.state;
    const { elapsedTime, frequency, duration, active } = nextProps;

    const lastWaveTime = waveTimes[waveTimes.length - 1] || 0;
    const timeSinceLastWave = (elapsedTime - lastWaveTime) / 1000;
    const shouldSpawnWave = active && timeSinceLastWave > (1/frequency);

    let updatedWaveTimes = waveTimes.reduce((result, current, index) => (
      // Remove any expired waves from the list
      (((elapsedTime - current) / 1000) < duration)
        ? [...result, current]
        : result
    ), []);

    if (shouldSpawnWave) {
      updatedWaveTimes = [...updatedWaveTimes, elapsedTime];
    }

    this.setState({ waveTimes: updatedWaveTimes });
  }

  render() {
    const { waveTimes } = this.state;
    const { x, y, streamWidth, duration, unitLength, elapsedTime } = this.props;

    return (
      <Group x={x} y={y}>
      { waveTimes.map(waveStartTime => (
        <Wave
          key={waveStartTime}
          streamWidth={streamWidth}
          unitLength={unitLength}
          t={(elapsedTime - waveStartTime) / (1000 * duration)}
        />
      ))}
      </Group>
    )
  }
}
SplashEffect.defaultProps = {
  duration: 0.75,
  frequency: 5, // waves per second
}