import React from 'react';
import ReactDOM from 'react-dom';
import 'assets/scss/material-kit-react.scss?v=1.4.0';
import App from './App';
import * as serviceWorker from './serviceWorker';
import store from './redux/store'
import { Provider } from 'react-redux'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, 
  document.getElementById('root')
);

serviceWorker.unregister();
