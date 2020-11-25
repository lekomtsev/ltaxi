import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App/App'
import { store } from './helpers'
import { Provider } from 'react-redux'
// import reportWebVitals from './reportWebVitals'
import './assets/scss/main.scss'

// setup fake backend
import { configureFakeBackend } from './helpers';
configureFakeBackend();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(console.log);
