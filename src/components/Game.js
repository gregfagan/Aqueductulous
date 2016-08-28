import React, { Component } from 'react';
import { Surface } from 'react-art';

import { createInitialState, updateInput, updateTime } from '../game/core';

import Player from './Player';
import Level from './Level';
import Background from './Background';

// TODO: Make this dynamic/responsive
const screenDimensions = {
  width: 720,
  height: 405
}

const unitLength = screenDimensions.width / 6;

export default class Game extends Component {
  constructor() {
    super();
    this.state = createInitialState();
    this.beginAcceleration = this.updateInput.bind(this, true);
    this.endAcceleration = this.updateInput.bind(this, false);

    const startTime = performance.now();
    this.updateTime = currentTime => {
      this.setState(updateTime(this.state, currentTime - startTime));
      this.raf = requestAnimationFrame(this.updateTime);
    }
    this.raf = requestAnimationFrame(this.updateTime);
  }

  updateInput(accelerating) {
    this.setState(updateInput(this.state, accelerating));
  }

  render() {
    const { player, level } = this.state;
    return (
      <div
        tabIndex={0}
        onMouseDown={this.beginAcceleration}
        onMouseUp={this.endAcceleration}
        onKeyDown={this.beginAcceleration}
        onKeyUp={this.endAcceleration}
      >
        <Surface {...screenDimensions}>
          <Background xOffset={-player.position * unitLength} {...screenDimensions} />
          <Level {...level}/>
          <Player {...player} screenDimensions={screenDimensions}/>
        </Surface>
      </div>
    );
  }
}