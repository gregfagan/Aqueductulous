export function createLevel(seed) {
  
  // TODO: implement

  return {
    // Bezier points (x, y)
    curve: [[0, 0], [1, 0], [2, 0], [3, 0]],
    // Indexes into bezier point array (start, end)
    hazards: [[1, 2]]
  }
}