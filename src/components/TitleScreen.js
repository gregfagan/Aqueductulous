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

export default class TitleScreen extends Component {
  constructor({startGameCallback}) {
    super();

    this.startInvoked = startGameCallback;
  }

  render() {
    const titleTextStyle = {
      font: 'bold 72px "Arial"',
      alignment: "middle"
    };

    const descriptionTextStyle = {
      fill: "#FFF",
      font: 'bold italic 24px "Arial"',
      alignment: "middle"
    };

    const descriptionTextStyleShadow = {
      fill: "#79C9E5",
      font: 'bold italic 24px "Arial"',
      alignment: "middle"
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
          <Text 
            x={360}
            y={105}
            fill={"#79C9E5"}
            {...titleTextStyle}
          >
            {title}
          </Text>
          <Text 
            x={365}
            y={100}
            fill={"#FFF"}
            {...titleTextStyle}
          >
            {title}
          </Text>
          <Text 
            x={359}
            y={201}
            {...descriptionTextStyleShadow}>
            {description1}
          </Text>
          <Text 
            x={360}
            y={200}
            {...descriptionTextStyle}
          >
            {description1}
          </Text>
          <Text 
            x={359}
            y={231}
            {...descriptionTextStyleShadow}>
            {description2}
          </Text>
          <Text 
            x={360}
            y={230}
            {...descriptionTextStyle}
          >
            {description2}
          </Text>
          <Text 
            x={359}
            y={291}
            {...descriptionTextStyleShadow}
          >
            {description3}
          </Text>
          <Text 
            x={360}
            y={290}
            {...descriptionTextStyle}
          >
            {description3}
          </Text>
        </Surface>
      </div>
    );
  }
}