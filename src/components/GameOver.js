import React, { Component } from 'react';
import { Surface, Text } from 'react-art';

import Background from './Background'

const containerStyle = {
  position: 'absolute',
  top: 0, left: 0, right: 0, bottom: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#666361',
};

// TODO: Make this dynamic/responsive
const screenDimensions = {
  width: 720,
  height: 405
}

const unitLength = screenDimensions.width / 16;

function screenify(x) { return x * unitLength; }

export default class GameOver extends Component {
  constructor({showTitleScreenCallback}) {
    super();
    this.titleScreenInvoked = showTitleScreenCallback;
  }

  render() {
    return (
      <div 
        style={containerStyle}
        tabIndex={0}
        onMouseUp={this.titleScreenInvoked}
        onKeyUp={this.titleScreenInvoked}
        ref={view => view && view.focus()}
      >
        <Surface {...screenDimensions}>
          <Text 
            x={screenify(8)}
            y={screenify(3)}
            fill={"#FFF"}
            font={'bold 24px "Arial"'}
            alignment={"middle"}
          >
            GAME OVER!
          </Text>
        </Surface>
      </div>
    );
  }
}