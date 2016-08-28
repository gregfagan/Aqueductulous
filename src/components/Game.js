import React, { Component } from 'react';
import { Surface } from 'react-art';
import Rectangle from 'react-art/shapes/rectangle';

import { createInitialState } from '../game/core';

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
  }

  render() {
    const { player, level } = this.state;
    return (
      <Surface {...screenDimensions}>
        <Rectangle {...screenDimensions} fill={'#aaa'} />
        <Level {...level}/>
        <Player {...player} screenDimensions={screenDimensions}/>
      </Surface>
    );
  }
}