import React, { Component } from 'react';
import Game from './Game.js'
import TitleScreen from './TitleScreen.js'
import GameOver from './GameOver.js'

import { GAMEMODE } from '../game/core.js';

export default class Aquaductulous extends Component {
  constructor() {
    super();

    this.showTitle = this.updateGameMode.bind(this, GAMEMODE.Title);
    this.showGame = this.updateGameMode.bind(this, GAMEMODE.Playing);
    this.showGameOver = result => {
      this.updateGameMode(GAMEMODE.GameOver, result);
    }

    this.state = {
      gameMode: GAMEMODE.Title,
      gameResult: undefined, /*{
        time: 0,
        won: false,
      }*/
    }
  }

  updateGameMode(gameMode, gameResult) {
    this.setState({gameMode, gameResult});
  }

  render() {
    const { gameMode, gameResult } = this.state;

    switch (gameMode) {
      case GAMEMODE.Title:
        return (
          <TitleScreen
            startGameCallback={this.showGame}
          />
        )
      case GAMEMODE.Playing:
        return (
          <Game
            showGameOverCallback={this.showGameOver} 
          />
        );
      case GAMEMODE.GameOver:
        return (
          <GameOver
            result={gameResult}
            startGameCallback={this.showGame}
          />
        );
      default:
        return null;
    }
  }
}