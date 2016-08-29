import React, { Component } from 'react';
import { Surface, Text } from 'react-art';

import { updateGameMode, GAMEMODE } from '../game/core.js'

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

export default class TitleScreen extends Component {
  constructor({startGameCallback}) {
    super();

    this.startInvoked = startGameCallback;
  }

  render() {
    return (
      <div
        style={containerStyle}
        tabIndex={0}
        onMouseUp={this.startInvoked}
        onKeyUp={this.startInvoked}
        ref={view => view && view.focus()}
      >
        <Surface {...screenDimensions}>
          <Text 
            x={360}
            fill={0xA6BD8A}
            font={'bold 72px "Arial"'}
            alignment={'middle'}
          >
            AQUADUCTULOUS
          </Text>
        </Surface>
      </div>
    );
  }
}