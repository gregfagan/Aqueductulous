import React, { Component } from 'react';
import { Surface } from 'react-art';
import Rectangle from 'react-art/shapes/rectangle';

import { createInitialState } from '../game/core';

import Player from './Player';
import Level from './Level';

export default class Game extends Component {
  constructor() {
    super();
    this.state = createInitialState();
  }

  render() {
    const { player, level } = this.state;
    return (
      <Surface width={720} height={405}>
        <Rectangle width={720} height={405} fill={'#ccc'}>
          <Level {...level}/>
          <Player {...player}/>
        </Rectangle>
      </Surface>
    );
  }
}