import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  TouchableHighlight,
  NativeAppEventEmitter,
  Platform,
  PermissionsAndroid,
  Modal
} from 'react-native';

import BleManager from 'react-native-ble-manager';

import SensorsList from '../sensors/list/SensorsList'

import * as constants from '../../constants/BluetoothConstants'

import base64 from 'base64-js'

class BLEApp extends Component {

  constructor(){
      super()

      this.state = {
          ble: null,
          scanning:false,
          polarsMap: {},
          connectedDevicesMap: {},
          dataMap: {}

      }
  }

  consumeData = (d) => {
      var map = this.state.dataMap;
      var id = d.peripheral;
      if (id == undefined){
        return;
      }
      if (map[id] == undefined){
        map[id] = [];
      }
      var val = d.value;
      map[id].push(d.value);
      var byteArr = base64.toByteArray(val);
      console.log('byteArr = ', byteArr);
      this.setState({
          dataMap: map
      });
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

  handleScan() {
      BleManager.scan(['180D'], 30, true)
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

  handleDiscoverPeripheral = (data) => {
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

  handleCharacteristicChange = (d) => {
      console.log('handleCharacteristicChange: d = ', d);
      this.consumeData(d);
  }

  componentDidMount() {
      BleManager.start({showAlert: false});
      this.handleDiscoverPeripheral = this.handleDiscoverPeripheral.bind(this);

      NativeAppEventEmitter
          .addListener('BleManagerDiscoverPeripheral', this.handleDiscoverPeripheral );

      NativeAppEventEmitter
          .addListener('BleManagerDidUpdateValueForCharacteristic', this.handleCharacteristicChange);

      // BleManagerDidUpdateValueForCharacteristic

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



  connectSensorClick = () => {
      let {selectedSensor} = this.state;
      if (selectedSensor == undefined){
        return;
      }
      console.log('connect to sensor ', selectedSensor);
      var self = this;


      BleManager.connect(selectedSensor.id)
        .then((peripheralInfo) => {
          // Success code
          console.log('Connected');
          console.log(peripheralInfo);
          self.consumeConnectedDevice(peripheralInfo);


          self.startAllNotifications(peripheralInfo, peripheralInfo.characteristics);
          // BleManager.startNotification(selectedSensor.id, constants.HEART_RATE_SERVICE_UUID, constants.HEART_RATE_CHARACTERISTIC_UUID)
          //   .then(() => {
          //     console.log('Notification started');
          // })
          // .catch((error) => {
          //   console.log(error);
          // });

          BleManager.stopScan().then(() => {
                self.setState({scanning: false});
                console.log('Scan stopped');
              });
          self.toggleScanning(false);

        })
        .catch((error) => {
          // Failure code
          console.log(error);
        });
  }

  read = (device) => {
        // const serviceUUID = '180F';

        let {characteristics} = device;

        // this.readFromAll(device);

        // console.log('read: device = ', device);
        //
        BleManager.read(device.id, constants.HEART_RATE_SERVICE_UUID, constants.HEART_RATE_CHARACTERISTIC_UUID)
            .then((data) => {
        // Success code
            console.log('read data = ', data);
        }).catch((error) => {
          // Failure code
          console.log(error);
        });
  }

  startAllNotifications = (device, characteristics) => {
      for (var i in characteristics){
        var sUUId = characteristics[i].service;
        var cUUId = characteristics[i].characteristic;
        console.log('startAllNotifications: starting for sUUId, cUUID = ', sUUId, cUUId);
        ((suid, cuid) => {
          BleManager.startNotification(device.id, suid, cuid)
            .then((ddd) => {
              console.log('Notification started: sUUId, cUUId, ddd = ', suid, cuid, ddd);
          })
          .catch((error) => {
            console.log(error);
          });
        })(sUUId, cUUId)
      }
  }

  readFromAll = (device) => {
      console.log('readFromAll: device = ', device);
      let characteristics = device.characteristics;
      for (var i in characteristics){
        var sUUId = characteristics[i].service;
        var cUUId = characteristics[i].characteristic;

        ((suid, cuid) => {
          BleManager.read(device.id, suid, cuid)
            .then((data) => {
              console.log('--read data, sUUId, cUUId = ', data, ' | sUUID=', suid, ' | cUUID=', cuid);
          })
          .catch((error) => {
            console.log(error);
          });
        })(sUUId, cUUId)
      }
  }

  consumeConnectedDevice = (dev) => {
      let map = this.state.connectedDevicesMap;
      map[dev.id] = dev;
      this.setState({
          connectedDevicesMap: map,
          selectedSensor: undefined
      });
  }

  getConnectedDevices = () => {
    let map = this.state.connectedDevicesMap;
    var arr = [];
    for (var key in map){
      arr.push(map[key]);
    }
    return arr;
  }

  hasConnectedDevices = () => {
    let arr = this.getConnectedDevices();
    return (arr.length > 0);
  }

  componentWillUnmount = () => {
    BleManager.stopScan().then(() => {
        console.log('Scan stopped');
      });
  }

    render() {
      let connectedDevices = this.getConnectedDevices();
      let {dataMap} = this.state;

      const polars = this.getPolars();

        const container = {
            // flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#F5FCFF',
            padding: 50,
            height: 500
        }


        const bleList = this.state.ble
            ? <Text> Device found: {this.state.ble.name} </Text>
            : <Text>no devices nearby</Text>

        let selectedSensor = this.state.selectedSensor;



        return (
            <View style={container}>

              <Text>
                dataMap =
              </Text>
              <Text>
                {JSON.stringify(dataMap)}
              </Text>

              <TouchableHighlight style={{padding:20, backgroundColor:'#ccc'}} onPress={() => this.toggleScanning(!this.state.scanning) }>
                  <Text>Scan Bluetooth ({this.state.scanning ? 'on' : 'off'})</Text>
              </TouchableHighlight>



              <View>
                  <Text style={{textAlign: 'center', padding: 10}} >
                      Discovered devices:
                  </Text>
                  <View>
                      <SensorsList sensors={polars} onSensorClick={(sensor) => {this.setState({selectedSensor: sensor})}} />
                  </View>
              </View>

              <View>
                  <Text style={{textAlign: 'center', padding: 10}} >
                      Connected devices:
                  </Text>
                  <View>
                      {connectedDevices.map((dev, k) =>{
                          var key = 'dev_' + k;

                          return (
                              <TouchableHighlight key={key} style={{padding: 20, borderRadius: 4, borderWidth: 1}}
                                    onPress={() => {this.read(dev)}}
                               >
                                  <Text>{dev.name}</Text>
                              </TouchableHighlight>
                          );
                      })}
                  </View>
              </View>




              {selectedSensor == undefined ? null :
                <Modal
                          animationType={"slide"}
                          transparent={false}
                          visible={this.state.modalVisible}
                          onRequestClose={() => {alert("Modal has been closed.")}}
                          >

                          <View style={{marginTop: 22}}>
                           <View style={{padding: 10, justifyContent: 'center'}} >
                             <Text style={{fontSize: 20, marginBottom: 20, textAlign: 'center'}} >
                                connect to <Text style={{fontWeight: 'bold'}} >{selectedSensor.name}</Text>
                             </Text>

                             <TouchableHighlight
                              style={{padding: 20, backgroundColor: '#F04044', borderRadius: 4}}
                              onPress={() => {
                               this.connectSensorClick()
                             }}>
                               <Text style={{textAlign: 'center', fontSize: 20, color: 'white'}} >Connect</Text>
                             </TouchableHighlight>

                             <TouchableHighlight style={{padding: 20}}
                                          onPress={() => {
                                            this.setState({selectedSensor: undefined});
                                          }}>
                                          <Text style={{textAlign: 'center', fontSize: 20, textDecorationLine: 'underline'}} >
                                              select another one
                                          </Text>
                             </TouchableHighlight>


                           </View>
                          </View>

                </Modal>
              }

            </View>
        );
    }
}

export default BLEApp;
