import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/global-styles.scss';
import {Home} from './templates/Home';
import * as serviceWorker from './serviceWorker';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
