/**
 * Created by sabir on 01.12.16.
 */

import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  StatusBar
} from 'react-native';

//apps
import IndexApp from './IndexApp.js';

import DevApp from './DevApp.js';

import AppNavigator from '../navigator/AppNavigator'

class App extends React.Component {

    static defaultProps = {
        mode: 'prod'
    }

    static propTypes = {
        currentUser: PropTypes.object,
        initialized: PropTypes.bool
    }

    state = {}

    //ES5 - componentWillMount
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    componentWillReceiveProps() {

    }


    render() {
      if (this.props.mode == 'dev'){
          return (
              <DevApp />
          );
      }
      return (
          <View style={{flex: 1}} >
              <StatusBar
                  translucent={true}
                  backgroundColor="rgba(0, 0, 0, 0.2)"
                  barStyle="light-content"
              />
              <AppNavigator />
          </View>
      );
    }
}


const mapStateToProps = (state) => {
    return {
        bluetooth: state.bluetooth
    }
}


App = connect(mapStateToProps, null)(App)

export default App
