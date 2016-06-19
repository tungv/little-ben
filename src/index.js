import React from 'react';
import ReactDOM from 'react-dom';
import { AddActivityButton } from './activity';

const mainContainer = document.getElementById('main');
ReactDOM.render((
  <AddActivityButton text="test" onClick={() => alert('test')} />
), mainContainer);
