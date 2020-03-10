import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App';
import "./components/index.css"

ReactDOM.render(
  <BrowserRouter basename="/react-spa-test">
    <App />
  </BrowserRouter>,
  document.getElementById('root'),
);
