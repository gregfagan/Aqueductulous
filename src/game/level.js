import Bezier from 'bezier-js';

export function createLevel(seed)
{
  const MAX_X = 160;
  const MAX_Y = 6.5;
  const MIN_Y = 2.5;

  const MIN_ENDPT_TO_CP2_DELTA = 2;
  const MAX_ENDPT_TO_CP2_DELTA = 8;

  const MAX_2ND_CP_X_DELTA = 5;
  const MIN_2ND_CP_X_DELTA = 0.5;

  const HAZARD_PERCENTAGE = 0.49;

  let curve = [];

  // Generate first bezier curve. Start with something gentle.
  curve.push(makeCubicBezier(0, 4.5, 2, 4.5, 5, Math.random() * 2 + 3.5));

  let lastIdx = 0;
  while (curve[lastIdx].endpoint.x <= MAX_X)
  {
    // Generate the first control point, which will be a reflection of the
    // previous curve's second control point.
    let ctrlPt1X = 2 * curve[lastIdx].endpoint.x - curve[lastIdx].controlPoint2.x;
    let ctrlPt1Y = 2 * curve[lastIdx].endpoint.y - curve[lastIdx].controlPoint2.y;

    // Randomly generate the second control point. This should be to the
    // left of endpoint to generate a pleasing curve, and to the right
    // of this curve's first control point.
    let ctrlPt2X = Math.random() * (MAX_2ND_CP_X_DELTA - MIN_2ND_CP_X_DELTA) + ctrlPt1X + MIN_2ND_CP_X_DELTA;
    let ctrlPt2Y = Math.random() * (MAX_Y - MIN_Y) + MIN_Y;

    // Generate next endpoint. This should be to the right of this curve's
    // second control point.
    let endPtX = Math.random() *
      (MAX_ENDPT_TO_CP2_DELTA - MIN_ENDPT_TO_CP2_DELTA) + ctrlPt2X + MIN_ENDPT_TO_CP2_DELTA;

    let endPtY = Math.random() * (MAX_Y - MIN_Y) + MIN_Y;

    curve.push(makeCubicBezier(ctrlPt1X, ctrlPt1Y, ctrlPt2X, ctrlPt2Y, endPtX, endPtY));
    lastIdx++;
  }

  // Generate hazards
  let hazards = [];

  curve.forEach( (value, index, array) => {
    if (Math.random() <= HAZARD_PERCENTAGE)
      hazards[index] = true;
    else
      hazards[index] = false;
  });

  return {
    curve,
    hazards: hazards
  }
}

function makeCubicBezier(ctrlPt1X, ctrlPt1Y, ctrlPt2X, ctrlPt2Y, endPtX, endPtY) {
  return {
    controlPoint1: {x: ctrlPt1X, y: ctrlPt1Y},
    controlPoint2: {x: ctrlPt2X, y: ctrlPt2Y},
    endpoint: {x: endPtX, y: endPtY}
  }
}

export function indexForX(curve, x) {
  let idx = 0;
  
  while(idx < curve.length - 1 && curve[idx].endpoint.x < x) {
    idx++;
  }

  return idx;
}

function segmentForIndex(curve, idx) {
  const startpoint = idx > 0
    ? curve[idx - 1].endpoint
    : {x: 0, y: 4.5};

  const segment = curve[idx];
  return {
    startpoint,
    ...segment
  };
}

function bezierForIndex(curve, idx) {
  const segment = segmentForIndex(curve, idx);

  return new Bezier(
    segment.startpoint,
    segment.controlPoint1,
    segment.controlPoint2,
    segment.endpoint
  );
}

export function yForX(curve, x) {
  const idx = indexForX(curve, x);
  const bezier = bezierForIndex(curve, idx);
  const t = bezier.intersects({
    p1: {x, y: 0},
    p2: {x, y: 9}
  })[0];
  
  return t
    ? bezier.get(t).y
    : 4.5;
}

export function pathForBezier(bezier, unitLength=1) {
  const screenBezierPoints = bezier.points.map(point => ({
      x: point.x * unitLength,
      y: point.y * unitLength
    }));
  
  return screenBezierPoints
    ? new Bezier(screenBezierPoints).toSVG()
    : '';
}

export function trailingPathForX(curve, x, trailLength, unitLength=1) {
  const idx = indexForX(curve, x);
  const bezier = bezierForIndex(curve, idx);
  const t = bezier.intersects({
    p1: {x, y: 0},
    p2: {x, y: 9}
  })[0];

  if (t) {
    const segment = bezier.split(0, t);
    
    const previousSegment = idx > 0 && segment.points[0].x > x - trailLength
      ? pathForBezier(bezierForIndex(curve, idx - 1), unitLength) + ' '
      : ''

    return previousSegment + pathForBezier(segment, unitLength);
  }

  return '';
}

export function tangentForX(curve, x) {
  const idx = indexForX(curve, x);
  const bezier = bezierForIndex(curve, idx);
  const t = bezier.intersects({
    p1: {x, y: 0},
    p2: {x, y: 9}
  })[0];
  
  return t ? bezier.derivative(t) : {x:0, y:0};
}