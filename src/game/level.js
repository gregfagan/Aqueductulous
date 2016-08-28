export function createLevel(seed) {
  // TODO: Find a seedable random number generator
  
  const maxX = 160; // Make this tunable, this is our arbitrary track length
  
  // Min/Max Y-values, making these multiples of 9 because of our 16:9 aspect ratio.
  // Maybe make these tunable to the actual aspect ratio.
  // NOTE: Choosing to follow computer graphics convention to have Y increase in the
  // downward direction rather than the upward direction as in cartesian coordinates.
  const maxY = 36;
  const minY = -36;

  const maxControlPointXDisplacement = 10;

  let curve;

  // Starting point of the track is at game coordinates 0,0,
  // and the control point makes a linear horizontal line.
  curve[0] = makeCurvePoint(0, 0, 0, 0);

  let trackPositionX = 0;
  let lastCurveIndex = 0;
  
  while (trackPositionX < maxX)
  {
    // Generate next control point at least as far as the latest control point.
    // This ensures that the track does not curve back around to the left.
    if (trackPositionX < curve[lastCurveIndex].trackLocation.x)
      trackPositionX = curve[lastCurveIndex].trackLocation.x;
    else
      trackPositionX++;

    // Randomly determine whether we:
    //  0) continue the last curve.
    //  1) change to a new curve
    // TODO: Do we need to swap directions? If our endpoints' Y-coordinate and 
    // our control points' Y-coordinate never exceed our bounds, then we can
    // just generate to our hearts content at random. Whether that's *pleasing*
    // to play with and look at, well who knows.
    // TODO: Support a reflected curve? Think through the implications to make sure
    // they don't break the track generation.
    const curveChange = Math.floor(Math.random() * 2);

    if (curveChange != 0)
    {
      const newCurveIndex = lastCurveIndex + 1;

      // We are changing the curve, generate a Y coordinate for the start point
      // of this new bezier curve.
      const trackPositionY = Math.floor(Math.random() * (maxY - minY) + minY);

      // Generate a new control point
      const controlPointX = Math.ceil(
        Math.random() * 
        (Math.min(trackPositionX + maxControlPointXDisplacement, maxX) - trackPositionX) +
        trackPositionX); // Want at least +1
      
      const controlPointY = Math.floor(Math.random() * (maxY - minY) + minY);

      curve[newCurveIndex] = makeCurvePoint(trackPositionX, trackPositionY, controlPointX, controlPointY);

      lastCurveIndex = newCurveIndex;
    }
  }

  return {
    // Bezier points (x, y)
    curve,
    // Indexes into bezier point array (start, end)
    hazards: [[1, 2]]
  }
}

function makeCurvePoint(trackPositionX, trackPositionY, controlPointX, controlPointY)
{
  return {
    trackPosition: { x: trackPositionX, y: trackPositionY },
    controlPoint: { x: controlPointX, y: controlPointY }
  }
}