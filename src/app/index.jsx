import ReactDOM from 'react-dom';
import React from 'react';
import faker from 'faker';
import Cookies from 'js-cookie';
import Main from './components/Main.jsx';

const tempData = window.gon;
const fakeName = faker.name.findName();
Cookies.set('username', fakeName);

ReactDOM.render(
  <Main data= {tempData} />,
  document.getElementById('chat'),
);