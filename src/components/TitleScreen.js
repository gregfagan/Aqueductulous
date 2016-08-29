import React, { Component } from 'react';
import { Surface } from 'react-art';

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
      font: { fontSize: 72 },
    };

    const descriptionProps = {
      shadowOffsetRatio: 1/8,
      font: {
        fontSize: 24,
        fontStyle: 'italic',
      }
    };

    const title = "AQUADUCTULOUS!!";
    const description1 = "Friends! Romans! Countrymen!";
    const description2 = "They're all relying on YOU to quench their thirst!";

    return (
      <div style={containerStyle}>
        <Surface {...screenDimensions}>
          <Background xOffset={0} unitLength={unitLength}/>
          <ShadowText 
            x={360}
            y={105}
            {...titleProps}
          >
            {title}
          </ShadowText>
          <ShadowText 
            x={359}
            y={201}
            {...descriptionProps}
          >
            {description1}
          </ShadowText>
          <ShadowText 
            x={359}
            y={231}
            {...descriptionProps}
          >
            {description2}
          </ShadowText>
          <Button 
            x={screenify(5.5)}
            y={291}
            width={screenify(5)}
            height={screenify(1.5)}
            onPress={startGameCallback}
          >
            Play
          </Button>
        </Surface>
      </div>
    );
  }
}