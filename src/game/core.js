import { createLevel } from './level.js'

const VELOCITY = {
  SLOW: 1.5,
  FAST: 3
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