import React from 'react';
import ReactDOM from 'react-dom';
import { AppRouter } from './AppRouter';
import "bootstrap/dist/css/bootstrap.min.css";
import "./style/style.css";

ReactDOM.render(
  <AppRouter/>,
  document.getElementById('root')
);