import React, { Component } from 'react';
import { Surface } from 'react-art';
import Rectangle from 'react-art/shapes/rectangle';

import { createInitialState, updateAcceleration } from '../game/core';

import Player from './Player';
import Level from './Level';

// TODO: Make this dynamic/responsive
const screenDimensions = {
  width: 720,
  height: 405
}

export default class Game extends Component {
  constructor() {
    super();
    this.state = createInitialState();
    this.beginAcceleration = this.setState.bind(this, updateAcceleration(this.state, true), null);
    this.endAcceleration = this.setState.bind(this, updateAcceleration(this.state, false), null);
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
          <Rectangle {...screenDimensions} fill={'#aaa'} />
          <Level {...level}/>
          <Player {...player} screenDimensions={screenDimensions}/>
        </Surface>
      </div>
    );
  }
}