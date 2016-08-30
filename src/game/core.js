//
// # Units and world size
//
// The game board is defined as a 16 unit x 9 unit rectangle.
//
// The player (the head of the rushing stream of water) is nominally
// centered at (4, 4.5) -- center left of the screen.
//

import { createEnemyProfile, isEnemyAcclerating } from './enemy.js'
import { createLevel, indexForX, segmentForIndex } from './level.js'
import { playerXOffset } from './player.js'

const VELOCITY = {
  SLOW: 2.5,
  FAST: 4
};

export const GAMEMODE = {
  Title: 1,
  Playing: 2,
  GameOver: 3
};

export const HAZARD_RESULTS = {
  FAIL: { text: 'TOO FAST', velocity: 0.5 },
  GOOD: { text: 'GOOD', velocity: 1.2, window: 0.55 },
  GREAT: { text: 'GREAT!', velocity: 1.4, window: 0.25 },
  AMAZING: { text: 'AMAZING!!', velocity: 1.6, window: 0.1 },
};

const HAZARD_EVENT_TIME = 1;
const HAZARD_DETECTION_OFFSET = 0;

export function createInitialState(seed) {
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
    level: createLevel(3, seed),
    enemyPlayer: {
      position: 0,
      accelerating: false,
      lastHazardEvent: undefined,
      enemyXOffset: 0,
    },
    enemyAI: createEnemyProfile(),
    enemyLevel: createLevel(6, seed + 1),
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

  const isEnemyAcceleratingNow = isEnemyAcclerating(
    state.enemyLevel,
    state.enemyPlayer,
    state.enemyAI
  );

  const enemyVelocity = isEnemyAcceleratingNow ? VELOCITY.FAST : VELOCITY.SLOW;
  const newPlayerPosition = position + velocity * hazardVelocityModifier(state) * dt;
  const newEnemyPosition = state.enemyPlayer.position + enemyVelocity * enemyHazardVelocityModifier(state) * dt;

  const updatedMotion = {
    ...state,
    elapsedTime,
    player: {
      ...state.player,
      position: newPlayerPosition,
    },
    enemyPlayer: {
      ...state.enemyPlayer,
      accelerating: isEnemyAcceleratingNow,
      position: isEnemyAtEndOfTrack(newEnemyPosition, state.enemyLevel.curve) ?
        state.enemyLevel.curve[state.enemyLevel.curve.length - 1].endpoint.x :
        newEnemyPosition,
      xOffset: newEnemyPosition - (newPlayerPosition - playerXOffset)
    }
  };

  return updateEnemyHazardEvent(updateHazardEvent(updatedMotion));
}

export function updateGameMode(state, gameMode) {
  return {
    ...state,
    gameMode
  };
}

export function isPlayerAtEndOfTrack(state) {
  return state.player.position >= state.level.curve[state.level.curve.length - 1].endpoint.x;
}

export function isEnemyAtEndOfTrack(position, curve) {
  return position >= curve[curve.length - 1].endpoint.x;
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
        const segment = segmentForIndex(curve, previousIndex);
        const hazardDistance = positionVisualAdjust - segment.endpoint.x;
        if (hazardDistance <= HAZARD_RESULTS.GOOD.window) hazardResult = HAZARD_RESULTS.GOOD;
        if (hazardDistance <= HAZARD_RESULTS.GREAT.window) hazardResult = HAZARD_RESULTS.GREAT;
        if (hazardDistance <= HAZARD_RESULTS.AMAZING.window) hazardResult = HAZARD_RESULTS.AMAZING;
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

function updateEnemyHazardEvent(state) {
  const { enemyPlayer, enemyLevel, elapsedTime } = state;
  const { position, accelerating } = enemyPlayer;
  const { curve, hazards } = enemyLevel;
  const positionVisualAdjust = position + HAZARD_DETECTION_OFFSET;
  const isHazard = hazards[indexForX(curve, positionVisualAdjust)];

  let hazardResult;

  if (accelerating && !currentHazardResult(state)) {
    if (isHazard) {
      hazardResult = HAZARD_RESULTS.FAIL;
    } else {
      const previousIndex = indexForX(enemyLevel.curve, positionVisualAdjust) - 1;
      if (previousIndex >= 0 && hazards[previousIndex]) {
        const segment = segmentForIndex(curve, previousIndex);
        const hazardDistance = positionVisualAdjust - segment.endpoint.x;
        if (hazardDistance <= HAZARD_RESULTS.GOOD.window) hazardResult = HAZARD_RESULTS.GOOD;
        if (hazardDistance <= HAZARD_RESULTS.GREAT.window) hazardResult = HAZARD_RESULTS.GREAT;
        if (hazardDistance <= HAZARD_RESULTS.AMAZING.window) hazardResult = HAZARD_RESULTS.AMAZING;
      }
    }
  }

  if (hazardResult) {
    return {
      ...state,
      enemyPlayer: {
        ...enemyPlayer,
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

function currentEnemyHazardResult(state) {
  const { lastHazardEvent } = state.enemyPlayer;
  if (
    lastHazardEvent
    && (state.elapsedTime - lastHazardEvent.time) / 1000 < HAZARD_EVENT_TIME
  ) {
    return lastHazardEvent.result;
  }
}

function enemyHazardVelocityModifier(state) {
  const hazard = currentEnemyHazardResult(state);
  return hazard ? hazard.velocity : 1;
}
