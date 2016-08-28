//
// # Units and world size
//
// The game board is defined as a 16 unit x 9 unit rectangle.
//
// The player (the head of the rushing stream of water) is nominally
// centered at (4, 4.5) -- center left of the screen.
//

import { createLevel } from './level.js'

const VELOCITY = {
  SLOW: 4,
  FAST: 8
};

export function createInitialState() {
  return {
    elapsedTime: 0,
    player: {
      position: 0,
      accelerating: false,
    },
    level: createLevel(),
  }
}

export function updateInput(state, accelerating) {
  return {
    ...state,
    player: {
      ...state.player,
      accelerating
    }
  }
}

export function updateTime(state, elapsedTime) {
  const dt = (elapsedTime - state.elapsedTime) / 1000;
  const { position, accelerating } = state.player; 
  const velocity = accelerating ? VELOCITY.FAST : VELOCITY.SLOW;
  return {
    ...state,
    elapsedTime,
    player: {
      ...state.player,
      position: position + velocity * dt,
    }
  };
}