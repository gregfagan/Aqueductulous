import React, { Component } from 'react';
import Game from './Game.js'
import TitleScreen from './TitleScreen.js'

import { GAMEMODE } from '../game/core.js';

export default class Aquaductulous extends Component {
  constructor() {
    super();

    this.showTitle = this.updateGameMode.bind(this, GAMEMODE.Title);
    this.showGame = this.updateGameMode.bind(this, GAMEMODE.Playing);

    this.state = {
      gameMode: GAMEMODE.Title
    }
  }

  updateGameMode(gameMode) {
    this.setState(
      {gameMode: gameMode}
    )
  }

  render() {
    switch (this.state.gameMode) {
      case GAMEMODE.Title:
        return (
          <TitleScreen
            startGameCallback={this.showGame}
          />
        )
      case GAMEMODE.Playing:
        return (
          <Game />
        );
    }
  }
}