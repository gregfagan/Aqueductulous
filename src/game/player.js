import { yForX } from './level';

export const xOffset = 4;

export function playerCenter(position, level, unitLength=1) {
  return {
    x: xOffset * unitLength,
    y: yForX(level.curve, position) * unitLength,
  }
}