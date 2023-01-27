import React from 'react';
import ReactDOM from 'react-dom/client';
import { render } from 'react-dom';
import './index.css';
import App from './App';
import Menu from './Menu'
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
const navRoot = ReactDOM.createRoot(document.getElementById('navRoot'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
// navRoot.render(
//   <React.StrictMode>
//     <Menu />
//   </React.StrictMode>
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
