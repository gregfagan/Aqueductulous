import React, { Component } from 'react';
import { Surface, Text } from 'react-art';

import ShadowText from './ShadowText';
import Background from './Background'
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
const screenify = x => x * unitLength;

export default class TitleScreen extends Component {
  render() {
    const { startGameCallback } = this.props;
    const titleProps = {
      font: { fontSize: 66 },
    };

    const descriptionProps = {
      shadowOffsetRatio: 1/8,
      font: {
        fontSize: 18,
        fontStyle: 'italic',
      },
      fill: '#fff',
      alignment: 'center',
    };

    const title = "AQUEDUCTULOUS!!";
    const description = [
      "Friends! Romans! Countrymen!",
      "Defeat Vitruvius in Caesar's game to become top engineer.",
      "Control the flow rate of your aqueduct by pressing any button.",
      "Watch out though: your builders made mistakes, and some",
      "sections of the track can't handle high speeds. Good luck!"
    ]

    return (
      <div style={containerStyle}>
        <Surface {...screenDimensions}>
          <Background xOffset={0} unitLength={unitLength}/>
          <ShadowText 
            x={360}
            y={50}
            {...titleProps}
          >
            {title}
          </ShadowText>
          <Text x={359} y={146} {...descriptionProps}>
            {description}
          </Text>
          <Button 
            x={screenify(5.5)}
            y={275}
            width={screenify(5)}
            height={screenify(1.6)}
            onPress={startGameCallback}
          >
            Play
          </Button>
        </Surface>
      </div>
    );
  }
}