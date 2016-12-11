/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  NativeAppEventEmitter,
  Platform,
  PermissionsAndroid
} from 'react-native';

import BleManager from 'react-native-ble-manager';

import BLEApp from './src/components/apps/BLEApp';

export default class VoidApp extends Component {



  render() {


    return (
      <View style={styles.container}>
        


        <BLEApp />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('VoidApp', () => VoidApp);
