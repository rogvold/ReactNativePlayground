

import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import BleManager from 'react-native-ble-manager';

import * as bActions from '../../../actions/BluetoothActions';

import BLEHelper from '../../../helpers/BLEHelper'

import SensorsListPanel from '../panels/SensorsListPanel'
import ScanButton from '../buttons/ScanButton'

import * as constants from '../../../constants/BluetoothConstants'

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


class BLEConnectionMaintainer extends React.Component {

    static defaultProps = {
        timerInterval: 2 * 1000
    }

    static propTypes = {
        bluetooth: PropTypes.object
    }

    state = {

    }

    //ES5 - componentWillMount
    constructor(props) {
        super(props);
    }

    componentWillReceiveProps() {

    }



    initTimer = () => {
        console.log('BLEConnectionMaintainer: initTimer occured');
        if (this.intervalId != undefined){
            return;
        }
        this.intervalId = setInterval(() => {
            this.onTick();
        }, this.props.timerInterval);
    }


    runConnectingProcess = (sensorId) => {

      var self = this;

      ((sId) => {
          self.props.connectToSensor(sId);
          BleManager.connect(sId)
            .then((peripheralInfo) => {
              console.log('Sensor [' + sId + '] is connected. Starting notification enabling...');
              BleManager.startNotification(sId, constants.HEART_RATE_SERVICE_UUID, constants.HEART_RATE_CHARACTERISTIC_UUID)
                .then(() => {
                  console.log('notification enabled, peripheralInfo = ', peripheralInfo);
                  self.props.connectToSensorSuccess(sId, peripheralInfo);
              })
              .catch((error) => {
                self.props.connectToSensorFail(sId);
              });
            })
            .catch((error) => {
              self.props.connectToSensorFail(sId);
            });
      })(sensorId);

    }

    onTick = () => {
        let sensors = getSensorsNeededToConnect(this.props.bluetooth);
        if (sensors.length == 0){
            return;
        }
        if (sensors.length > 0){
            console.log('sensors to connect - ', sensors);
        }
        let can = canStartConnectingNow(this.props.bluetooth);
        if (can == false){
          return;
        }
        this.runConnectingProcess(sensors[0].id);
        // for (var i in sensors){
        //     let s = sensors[i];
        //     this.runConnectingProcess(s.id);
        // }
    }

    componentDidMount = () => {
        this.initTimer();
    }

    componentWillUnmount = () => {
        if (this.intervalId != undefined){
            clearInterval(this.intervalId);
        }
    }


    render() {
      let bl = this.props.bluetooth;
      return (
        <View >

        </View>
      );
    }

}

const getSensorsNeededToConnect = (bluetooth) => {
    var map = bluetooth.discoveredSensorsMap;
    var arr = [];
    var connStatMap = bluetooth.sensorsConnectionStatusMap;
    for (var key in map){
      var discSensor = map[key];
      var st = connStatMap[key];
      if (st == undefined || st == constants.NOT_CONNECTED || st == constants.DISCOVERED){
          arr.push(map[key]);
      }
    }
    return arr;
}

const canStartConnectingNow = (bluetooth) => {
    let status = bluetooth.bluetoothStatus;
    if (status == constants.SCANNING){
        return false;
    }
    return true;
}

const mapStateToProps = (state) => {
    return {
        bluetooth: state.bluetooth
    }
}


const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(bActions, dispatch)
}



BLEConnectionMaintainer = connect(mapStateToProps, mapDispatchToProps)(BLEConnectionMaintainer)

export default BLEConnectionMaintainer;
