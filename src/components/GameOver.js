import React, { Component } from 'react';
import { Surface, Text } from 'react-art';

import Button from './Button';

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
  render() {
    const { result, onRematch, onNewGame } = this.props;
    return (
      <div 
        style={containerStyle}
        tabIndex={0}
      >
        <Surface {...screenDimensions}>
          <Text 
            x={screenify(8)}
            y={screenify(1.5)}
            fill={"#FFF"}
            font={'bold 40px "Arial"'}
            alignment={"middle"}
          >
            {`YOU ${result.won ? 'WIN' : 'LOSE'}!`}
          </Text>
          <Text 
            x={screenify(8)}
            y={screenify(2.5)}
            fill={"#FFF"}
            font={'16px "Arial"'}
            alignment={"middle"}
          >
            {`${(result.time/1000).toFixed(2)} seconds`}
          </Text>
          <Button
            x={screenify(5.5)} y={screenify(3.5)}
            width={screenify(5)} height={screenify(1.5)}
            onPress={onRematch}
          >
            Rematch
          </Button>
          <Button
            x={screenify(5.5)} y={screenify(5.5)}
            width={screenify(5)} height={screenify(1.5)}
            onPress={onNewGame}
          >
            New Game
          </Button>
        </Surface>
      </div>
    );
  }
}