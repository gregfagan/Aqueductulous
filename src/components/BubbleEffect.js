import React, { Component } from 'react';
import { Group } from 'react-art';
import Circle from 'react-art/shapes/circle';
import Color from 'color';

class Bubble extends Component {
  constructor(props) {
    super(props);
    const { maxSpawnDistance, unitLength } = props;
    this.state = {
      initialPosition: {
        x: 1/2 * maxSpawnDistance * unitLength * Math.random(),
        y: -1/2 * maxSpawnDistance * unitLength + maxSpawnDistance * unitLength * Math.random()
      }
    }
  }

  render() {
    const { initialPosition } = this.state;
    const { size, unitLength, t, color } = this.props;

    return (
      <Circle
        x={initialPosition.x}
        y={initialPosition.y}
        radius={(1/2 + 1/2*t) * size * unitLength}
        fill={Color(color).clearer(0.25 + 0.75 * t).rgbString()}
      />
    )
  }
}
Bubble.defaultProps = {
  size: 1/12,
  color: '#fff',
}

export default class BubbleEffect extends Component {
  constructor() {
    super();
    this.state = { bubbleTimes: [] }
  }

  componentWillReceiveProps(nextProps) {
    const { bubbleTimes } = this.state;
    const { elapsedTime } = nextProps;
    const {
      frequency: bubbleFrequency,
      duration: bubbleDuration
    } = this.bubblePropsForProps(nextProps);

    const lastBubbleTime = bubbleTimes[bubbleTimes.length - 1] || 0;
    const timeSinceLastBubble = (elapsedTime - lastBubbleTime) / 1000;
    const shouldSpawnBubble = Math.random() > (1 - (bubbleFrequency * timeSinceLastBubble));

    let updatedBubbleTimes = bubbleTimes.reduce((result, current, index) => (
      // Remove any expired bubbles from the list
      (((elapsedTime - current) / 1000) < bubbleDuration)
        ? [...result, current]
        : result
    ), []);

    if (shouldSpawnBubble) {
      updatedBubbleTimes = [...updatedBubbleTimes, elapsedTime];
    }

    this.setState({ bubbleTimes: updatedBubbleTimes });
  }

  bubblePropsForProps({ bubbleDuration, bubbleFrequency, intensity }) {
    return {
      duration: bubbleDuration * (1 / (2 * intensity) + 1/2),
      frequency: bubbleFrequency * intensity * intensity,
    }
  }

  render() {
    const { bubbleTimes } = this.state;
    const { duration:bubbleDuration } = this.bubblePropsForProps(this.props);
    const { x, y, maxSpawnDistance, elapsedTime, unitLength } = this.props;

    return (
      <Group x={x} y={y}>
      { bubbleTimes.map(spawnTime => (
        <Bubble
          key={spawnTime}
          t={(elapsedTime - spawnTime)/(1000 * bubbleDuration)}
          maxSpawnDistance={maxSpawnDistance}
          unitLength={unitLength}
        />
      ))}
      </Group>
    )
  }
}
BubbleEffect.defaultProps = {
  bubbleDuration: 0.5,
  bubbleFrequency: 2,
  intensity: 1,
};