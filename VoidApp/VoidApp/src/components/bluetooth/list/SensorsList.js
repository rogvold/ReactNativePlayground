
/**
 * Created by sabir on 01.12.16.
 */

import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import BleManager from 'react-native-ble-manager';

import * as bActions from '../../../actions/BluetoothActions';

import BLEHelper from '../../../helpers/BLEHelper'

import * as constants from '../../../constants/BluetoothConstants'

import ConnectToSensorButton from '../buttons/ConnectToSensorButton'

import CurrentSensorInfoSpan from '../panels/CurrentSensorInfoSpan'
import PureRenderMixin from 'react-addons-pure-render-mixin';

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


class SensorsList extends React.Component {

    static defaultProps = {
        sensorsIds: []
    }

    static propTypes = {
        sensorsConnectionStatusMap: PropTypes.object,
        discoveredSensorsMap: PropTypes.object,

        sensorsIds: PropTypes.array.isRequired,
        onSensorClick: PropTypes.func,

        sensorsMap: PropTypes.object
    }

    state = {

    }

    //ES5 - componentWillMount
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    componentWillReceiveProps() {

    }

    componentDidMount = () => {

    }


    getSensor = (sensorId) => {
        const {sensorsMap} = this.props;
        let map = this.props.discoveredSensorsMap;
        let sensor = map[sensorId];
        if (sensorsMap[sensorId] != undefined){
            sensor = Object.assign({}, sensor, {displayName: sensorsMap[sensorId].displayName});
        }else {
            sensor = Object.assign({}, sensor, {displayName: sensor.name});
        }

        return sensor;
    }

    getSensorStatus = (sensorId) => {
        let map = this.props.sensorsConnectionStatusMap;
        return map[sensorId];
    }

    getSensors = () => {
        var ids = this.props.sensorsIds;
        let sensors = ids.map((sensorId, k) => {
            return this.getSensor(sensorId);
        }, this)
        return sensors;
    }



    onSensorClick = (sensor) => {
        if (__DEV__){
          console.log('onSensorClick: sensor = ', sensor);
        }
      
        this.props.onSensorClick(sensor);
    }

    render() {
      let sensors = this.getSensors();
      if (__DEV__){
        console.log('SensorsList: render occured');
      }

      return (
          <View>
            <View  >

                {sensors.map( (sensor, k) => {
                    let key = 'sensor_' + k + '_' + sensor.id;
                    let status = this.getSensorStatus(sensor.id);
                    let shouldShowConnectButton = (status == constants.DISCOVERED || status == constants.NOT_CONNECTED);
                    let onClick = this.onSensorClick.bind(this, sensor)

                    return (
                        <View key={key} style={{flexDirection: 'row',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                padding: 5,
                                                height: 50
                                              }} >
                            <View >
                              <TouchableHighlight onPress={onClick}  >
                                  <Text style={{fontSize: 18}} >
                                    {sensor.displayName}
                                  </Text>
                              </TouchableHighlight>

                            </View>

                            <View style={{alignItems: 'center'}} >
                              {shouldShowConnectButton == true ?
                                  <ConnectToSensorButton sensorId={sensor.id} /> :
                                  <View>
                                    {status == constants.CONNECTED ?
                                        <CurrentSensorInfoSpan sensorId={sensor.id} /> :
                                        <Text>{status}</Text>
                                    }
                                  </View>
                              }
                            </View>

                        </View>
                    );

                }, this)}

            </View>

          </View>
      );
    }

}

let getAllSensorsIds = (state) => {
    let map = state.bluetooth.discoveredSensorsMap;
    var arr = [];
    for (var key in map){
        arr.push(map[key]);
    }
    arr.sort((a, b) => {
        if (a.name > b.name){
          return 1;
        };
        if (a.name == b.name){
          return 0;
        }
        return -1;
    });
    return arr.map((s, k) => s.id);
}

const mapStateToProps = (state) => {
    return {
        sensorsConnectionStatusMap: state.bluetooth.sensorsConnectionStatusMap,
        discoveredSensorsMap: state.bluetooth.discoveredSensorsMap,
        sensorsIds: getAllSensorsIds(state),
        sensorsMap: state.sensors.sensorsMap
    }
}


const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(bActions, dispatch)
}

SensorsList = connect(mapStateToProps, mapDispatchToProps)(SensorsList)

export default SensorsList;
