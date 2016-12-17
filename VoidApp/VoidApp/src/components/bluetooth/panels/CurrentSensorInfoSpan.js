
import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import BleManager from 'react-native-ble-manager';

import * as bActions from '../../../actions/BluetoothActions';

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

class CurrentSensorInfoSpan extends React.Component {

    static defaultProps = {

    }

    static propTypes = {
        bluetooth: PropTypes.object,
        sensorId: PropTypes.string.isRequired
    }

    state = {

    }

    //ES5 - componentWillMount
    constructor(props) {
        super(props);
    }

    componentWillReceiveProps() {

    }

    componentDidMount = () => {

    }



    getStatus = () => {
        var bl = this.props.bluetooth;
        var map = bl.sensorsConnectionStatusMap;
        var sensorId = this.props.sensorId;
        return map[sensorId];
    }

    getSensorData = () => {
        let sensorId = this.props.sensorId;
        let dataMap = this.props.bluetooth.dataMap;
        var arr = dataMap[sensorId];
        if (arr == undefined){
          arr = [];
        }
        return arr;
    }

    getLastData = () => {
        let arr = this.getSensorData();
        if (arr.length == 0){
          return undefined;
        }
        return arr[arr.length - 1];
    }


    render() {
      let bl = this.props.bluetooth;
      let sensorId = this.props.sensorId;
      let data = this.getLastData();
      // console.log('CurrentSensorInfoSpan: render: data = ', data);

      let text = 'CONNECTED';
      if (data != undefined){
          text = data.hr;
      }
      return (
        <Text style={{fontSize: 18}} >
            {text}
        </Text>
      );


    }

}

const mapStateToProps = (state) => {
    return {
        bluetooth: state.bluetooth
    }
}


const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(bActions, dispatch)
}



CurrentSensorInfoSpan = connect(mapStateToProps, mapDispatchToProps)(CurrentSensorInfoSpan)

export default CurrentSensorInfoSpan;
