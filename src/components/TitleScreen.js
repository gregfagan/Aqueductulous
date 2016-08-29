import React, { Component } from 'react';
import { Surface } from 'react-art';

import ShadowText from './ShadowText';
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

export default class TitleScreen extends Component {
  constructor({startGameCallback}) {
    super();

    this.startInvoked = startGameCallback;
  }

  render() {
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
    const description3 = "Press or click to get flowing!";

    return (
      <div
        style={containerStyle}
        tabIndex={0}
        onMouseUp={this.startInvoked}
        onKeyUp={this.startInvoked}
        ref={view => view && view.focus()}
      >
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
          <ShadowText 
            x={359}
            y={291}
            {...descriptionProps}
          >
            {description3}
          </ShadowText>
        </Surface>
      </div>
    );
  }
}