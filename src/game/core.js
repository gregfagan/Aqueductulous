//
// # Units and world size
//
// The game board is defined as a 16 unit x 9 unit rectangle.
//
// The player (the head of the rushing stream of water) is nominally
// centered at (4, 4.5) -- center left of the screen.
//

import { createLevel, indexForX, segmentForIndex } from './level.js'

const VELOCITY = {
  SLOW: 2,
  FAST: 4
};

export const GAMEMODE = {
  Title: 1,
  Playing: 2,
  Finished: 3
}

const HAZARD_RESULTS = {
  FAIL: { text: 'OOPS', velocity: 0.5 },
  GOOD: { text: 'GOOD', velocity: 1.2, window: 3 },
  GREAT: { text: 'GREAT', velocity: 1.4, window: 2 },
  AMAZING: { text: 'AMAZING', velocity: 1.6, window: 1 },
};

const HAZARD_EVENT_TIME = 1;
const HAZARD_DETECTION_OFFSET = 0.25;

export function createInitialState() {
  return {
    elapsedTime: 0,
    player: {
      position: 0,
      accelerating: false,
      lastHazardEvent: undefined, /*{
        time: undefined,
        result: undefined,
      }, */
    },
    level: createLevel()
  }
}

export function updateInput(state, accelerating) {
  // Don't accept input after a failure
  const hazard = currentHazardResult(state); 
  if (hazard === HAZARD_RESULTS.FAIL) return state;

  return updateHazardEvent({
    ...state,
    player: {
      ...state.player,
      accelerating
    }
  });
}

export function updateTime(state, elapsedTime) {
  const dt = (elapsedTime - state.elapsedTime) / 1000;
  const { position, accelerating } = state.player; 
  const velocity = accelerating ? VELOCITY.FAST : VELOCITY.SLOW;
  const updatedMotion = {
    ...state,
    elapsedTime,
    player: {
      ...state.player,
      position: position + velocity * hazardVelocityModifier(state) * dt,
    }
  };
}

export function updateGameMode(state, gameMode) {
  return {
    ...state,
    gameMode
  };

  return updateHazardEvent(updatedMotion);
}

function updateHazardEvent(state) {
  const { player, level, elapsedTime } = state;
  const { position, accelerating } = player;
  const { curve, hazards } = level;
  const positionVisualAdjust = position + HAZARD_DETECTION_OFFSET;
  const isHazard = hazards[indexForX(curve, positionVisualAdjust)];

  let hazardResult;

  if (accelerating && !currentHazardResult(state)) {
    if (isHazard) {
      hazardResult = HAZARD_RESULTS.FAIL;
    } else {
      const previousIndex = indexForX(level.curve, positionVisualAdjust) - 1;
      if (previousIndex >= 0 && hazards[previousIndex]) {
        const segment = segmentForIndex(curve, previousIndex - 1);
        const hazardDistance = positionVisualAdjust - segment.endpoint.x;
        if (hazardDistance < HAZARD_RESULTS.GOOD.window) hazardResult = HAZARD_RESULTS.GOOD;
        if (hazardDistance < HAZARD_RESULTS.GREAT.window) hazardResult = HAZARD_RESULTS.GREAT;
        if (hazardDistance < HAZARD_RESULTS.AMAZING.window) hazardResult = HAZARD_RESULTS.AMAZING;
      }
    }
  }

  if (hazardResult) {
    return {
      ...state,
      player: {
        ...player,
        accelerating: hazardResult === HAZARD_RESULTS.FAIL ? false : accelerating,
        lastHazardEvent: { time: elapsedTime, result: hazardResult },
      }
    }
  }

  return state;
}

function currentHazardResult(state) {
  const { lastHazardEvent } = state.player;
  if (
    lastHazardEvent
    && (state.elapsedTime - lastHazardEvent.time) / 1000 < HAZARD_EVENT_TIME
  ) {
    return lastHazardEvent.result;
  }
}

function hazardVelocityModifier(state) {
  const hazard = currentHazardResult(state);
  return hazard ? hazard.velocity : 1;
}