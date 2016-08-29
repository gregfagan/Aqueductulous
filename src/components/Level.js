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
  let curveLeftIndex;
  for (curveLeftIndex = 0; curveLeftIndex < curve.length - 1; curveLeftIndex++) {
    if (curve[curveLeftIndex + 1].endpoint.x > trackGameWindowLeft)
      break;
  }

  let curveRightIndex = 0;
  for (curveRightIndex = curveLeftIndex; curveRightIndex < curve.length; curveRightIndex++) {
    if (curve[curveRightIndex].endpoint.x >= trackGameWindowLeft + 16)
      break;
  }

  // Move cursor to curveLeftIndex's left origin point, which is
  // inferred from the endpoint of curve[curveLeftIndex - 1]. So in the
  // curveLeftIndex == 0 case, the origin is 0, 4.5, the player start point.
  let drawingOriginPoint = {
    x: curveLeftIndex === 0 ? 0 : curve[curveLeftIndex - 1].endpoint.x,
    y: curveLeftIndex === 0 ? 4.5 : curve[curveLeftIndex - 1].endpoint.y
  }

  // Cuz typing this repeatedly sucks.
  function screenifyX(x) { return (x - trackGameWindowLeft) * unitLength; }
  function screenifyY(y) { return y * unitLength; }

  let visibleCurve = curve.slice(curveLeftIndex, curveRightIndex + 1)
  let visibleHazards = hazards.slice(curveLeftIndex, curveRightIndex + 1);

  // Draw each curve segment separately...
  // Draw origin, draw first curve
  // Each subsequent curve uses the previous curve endpoint as the origin

  let hazardColor = 0xF00;
  let regularColor = 0xFFF;

  return (
    <Group>
      <Shape
        d={`
          M ${ screenifyX(drawingOriginPoint.x) } ${ screenifyY(drawingOriginPoint.y) }
          C ${ screenifyX(visibleCurve[0].controlPoint1.x) } ${ screenifyY(visibleCurve[0].controlPoint1.y) }
            ${ screenifyX(visibleCurve[0].controlPoint2.x) } ${ screenifyY(visibleCurve[0].controlPoint2.y) }
            ${ screenifyX(visibleCurve[0].endpoint.x) } ${ screenifyY(visibleCurve[0].endpoint.y) }
        `}
        stroke={ visibleHazards[0] ? hazardColor : regularColor }
        strokeWidth={10}
      />
      { visibleCurve.map((value, index, array) => {
          if (index !== 0) {
          return (
            <Shape
              d={`
                M ${ screenifyX(array[index - 1].endpoint.x) }
                  ${ screenifyY(array[index - 1].endpoint.y) }
                C ${ screenifyX(value.controlPoint1.x) } ${ screenifyY(value.controlPoint1.y) }
                  ${ screenifyX(value.controlPoint2.x) } ${ screenifyY(value.controlPoint2.y) }
                  ${ screenifyX(value.endpoint.x) } ${ screenifyY(value.endpoint.y) }
                `}
              stroke={ visibleHazards[index] ? hazardColor : regularColor }
              strokeWidth={10}
            />
            );
          }
        })
      }
    </Group>
  );
}
