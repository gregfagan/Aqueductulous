import React from 'react';
import { Group, Shape } from 'react-art';
import Circle from 'react-art/shapes/circle';

export default function Level ({curve, hazards, xOffset, unitLength}) {
  const playerGameXGap = 4; // Distance of player from left screen edge in game units.
  const trackGameWindowLeft = xOffset - playerGameXGap; // The left most visible part of the track in game units -- uhh handle the < 0 case.

  // Find the element in the curve array that is closest to 
  // trackGameWindowLeft without going past it.
  // Doing a stupid linear search for now
  // Also there's probably a smarter more concise ES2015 way to do this FML
  let curveLeftIndex = 0;
  for (let i = 1; i < curve.length; i++) {
    if (curve[i].endpoint.x > trackGameWindowLeft) {
      curveLeftIndex = i - 1;
      break;
    }
  }

  let curveRightIndex = 0;
  for (let i = 1; i < curve.length; i++) {
    if (curve[i].endpoint.x >= trackGameWindowLeft + 16) {
      curveRightIndex = i;
      break;
    }
  }

  // Move cursor to curveLeftIndex's left origin point, which is
  // inferred from the endpoint of curve[curveLeftIndex - 1]. So in the
  // curveLeftIndex == 0 case, the origin is 0, 4.5, the player start point.
  let drawingOriginPoint = {
    x: curveLeftIndex === 0 ? 0 : curve[curveLeftIndex - 1].endpoint.x,
    y: curveLeftIndex === 0 ? 4.5 : curve[curveLeftIndex - 1].endpoint.y
  }

  return (
    <Group>
      <Shape
        d={`
          M ${ (drawingOriginPoint.x - trackGameWindowLeft) * unitLength }
            ${ drawingOriginPoint.y * unitLength }
          ${ curve.map( (value, index, array) => {
            if (index >= curveLeftIndex && index <= curveRightIndex )
            return (`
              C ${ (value.controlPoint1.x - trackGameWindowLeft) * unitLength } ${ value.controlPoint1.y * unitLength }
                ${ (value.controlPoint2.x - trackGameWindowLeft) * unitLength } ${ value.controlPoint2.y * unitLength }
                ${ (value.endpoint.x - trackGameWindowLeft) * unitLength } ${ value.endpoint.y * unitLength }
            `);
          })}
        `}
        stroke={0xFFF}
      />
    </Group>
  );
}