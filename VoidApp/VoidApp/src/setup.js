// 'use strict';
//
// import 'babel-polyfill'

import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import React from 'react';


import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import {Provider} from 'react-redux';

//app
import App from './components/apps/App.js'

//api
// import ParseAPI from './api/ParseAPI.js';

// import * as usersActions from './actions/UsersActions.js';

import {reducer} from './reducers'

const loggerMiddleware = createLogger()

import * as sensorsActions from './actions/SensorsActions'

const store = createStore(
    reducer,
    // applyMiddleware(thunkMiddleware)
    applyMiddleware(thunkMiddleware, loggerMiddleware)
)
// ParseAPI.initParse();

export default function setup() {

  class RootApp extends React.Component{

      render() {
          if (__DEV__){
              console.log('rendering app');
          }
          return (
              <Provider store={store}>

                  <App />

              </Provider>
          );
      }

  }

  // ParseAPI.initParse();

  store.dispatch(sensorsActions.loadSensors());

  return RootApp;

}




// AppRegistry.registerComponent('RootApp', () => RootApp);

// store.dispatch(usersActions.initializeAuthorization());
