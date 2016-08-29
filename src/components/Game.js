import React, { Component } from 'react';
import { Surface } from 'react-art';

import { createInitialState, updateInput, updateTime } from '../game/core';

import Player from './Player';
import Level from './Level';
import Background from './Background';

const containerStyle = {
  position: 'absolute',
  top: 0, left: 0, right: 0, bottom: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#666361',
};

// TODO: Make this dynamic/responsive
const screenDimensions = {
  width: 720,
  height: 405
}

const unitLength = screenDimensions.width / 16;

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

  componentWillUnmount() {
    cancelAnimationFrame(this.raf);
  }

  updateInput(accelerating) {
    this.setState(updateInput(this.state, accelerating));
  }

  render() {
    const { player, level, elapsedTime } = this.state;
    return (
      <div
        style={containerStyle}
        tabIndex={0}
        onMouseDown={this.beginAcceleration}
        onMouseUp={this.endAcceleration}
        onKeyDown={this.beginAcceleration}
        onKeyUp={this.endAcceleration}
        ref={view => view && view.focus()}
      >
        <Surface {...screenDimensions}>
          <Background xOffset={-player.position * unitLength} unitLength={unitLength}/>
          <Level {...level} xOffset={player.position} unitLength={unitLength}/>
          <Player
            {...player}
            level={level}
            unitLength={unitLength}
            elapsedTime={elapsedTime}
          />
        </Surface>
      </div>
    );
  }
}