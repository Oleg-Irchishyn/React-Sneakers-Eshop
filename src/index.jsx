import store from './redux/store';
import React from 'react';
import ReactDOM from 'react-dom';
import 'font-awesome/css/font-awesome.min.css';
import 'semantic-ui-css/semantic.min.css'
import './styles/index.scss';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';


ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root'),
);
