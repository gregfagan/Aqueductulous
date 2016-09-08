import React from 'react';
import ReactDOM from 'react-dom';
import Aqueductulous from './components/Aqueductulous'
import './index.css';

document.addEventListener("touchstart", () => {}, true);

ReactDOM.render(
  <Aqueductulous />,
  document.getElementById('root')
);
