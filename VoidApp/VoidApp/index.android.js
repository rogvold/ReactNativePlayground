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

// import BLEApp from './src/components/apps/BLEApp.js';
import BleManager from 'react-native-ble-manager';
// var BleManager = require('react-native-ble-manager').default;

export default class VoidApp extends Component {

  constructor(){
      super()

      this.state = {
          ble: null,
          scanning:false,
          polarsMap: {}
      }
  }

  consumePolar = (bleData) => {
      if (bleData == undefined){
        return;
      }
      var name = bleData.name;
      if (name == undefined || name.trim() == ''){
        return;
      }
      var map = this.state.polarsMap;
      if (name.toLowerCase().indexOf('polar') > -1){
          map[name] = bleData;
      }
      this.setState({
        polarsMap: map
      });
  }

  componentDidMount() {
      BleManager.start({showAlert: false});
      this.handleDiscoverPeripheral = this.handleDiscoverPeripheral.bind(this);

      NativeAppEventEmitter
          .addListener('BleManagerDiscoverPeripheral', this.handleDiscoverPeripheral );

      if (Platform.OS === 'android' && Platform.Version >= 23) {
          PermissionsAndroid.checkPermission(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION).then((result) => {
              if (result) {
                console.log("Permission is OK");
              } else {
                PermissionsAndroid.requestPermission(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION).then((result) => {
                  if (result) {
                    console.log("User accept");
                  } else {
                    console.log("User refuse");
                  }
                });
              }
        });
      }
  }

  handleScan() {
      BleManager.scan([], 30, true)
          .then((results) => console.log('Scanning...') );
  }


  toggleScanning(bool){
      if (bool) {
          this.setState({scanning:true})
          this.scanning = setInterval( ()=> this.handleScan(), 3000);
      } else{
          this.setState({scanning:false, ble: null})
          clearInterval(this.scanning);
      }
  }

  handleDiscoverPeripheral(data){
      console.log('Got ble data', data);
      // this.setState({ ble: data })
      this.consumePolar(data);
  }

  getPolars = () => {
    var map = this.state.polarsMap;
    if (map == undefined){
      map = {};
    }
    var arr = [];
    for (var key in map){
      arr.push(map[key]);
    }
    return arr;
  }


  render() {
    const container = {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    }

    const bleList = this.state.ble
        ? <Text style={{padding: 10}} > Device found: {this.state.ble.name} , {JSON.stringify(this.state.ble)} </Text>
        : <Text>no devices nearby</Text>


    const polars = this.getPolars();

    return (
      <View style={styles.container}>

        <Text style={styles.instructions}>
          Android works!
        </Text>

        <View>

          <TouchableHighlight style={{padding:20, backgroundColor:'#ccc'}} onPress={() => this.toggleScanning(!this.state.scanning) }>
              <Text>Scan Bluetooth ({this.state.scanning ? 'on' : 'off'})</Text>
          </TouchableHighlight>

          {polars.length == 0 ?
            <Text style={{fontSize: 20}} >
              No polars found
            </Text> : 
            <View>
              {polars.map((polar, k) => {
                  var key = 'polar_' + k + '_' + polar.name;

                  return (
                    <View style={{padding: 10, borderRadius: 4,
                                                borderWidth: 0.5,
                                                borderColor: '#d6d7da'}} key={key} >
                        <Text style={{textAlign: 'center'}} >
                            {polar.name}
                        </Text>
                    </View>
                  );

              })}
            </View>
          }

        </View>

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
