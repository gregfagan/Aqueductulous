import { createLevel } from './level.js'

export function createInitialState() {
  return {
    elapsedTime: 0,
    player: {
      position: 0,
      velocity: 0,
      accelerating: false,
    },
    level: createLevel(),
  }
}

export function updateAcceleration(state, accelerating) {
  return {
    ...state,
    player: {
      ...state.player,
      accelerating
    }
  }
}

export function updateTime(state) {
  // TODO: implement
  return state;
}