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

import {
  AppRegistry,
  Text,
  View,
  TouchableHighlight,
  NativeAppEventEmitter,
  Platform,
  PermissionsAndroid,
  Modal,
  ActivityIndicator
} from 'react-native';

import PureRenderMixin from 'react-addons-pure-render-mixin';

class ScanButton extends React.Component {

    static defaultProps = {
        scanTimeout: 10
    }

    static propTypes = {
        bluetoothStatus: PropTypes.string
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

    scan = () => {
        console.log('scan is clicked');
        BleManager.scan(['180D'], this.props.scanTimeout, true)
            .then((results) => {console.log('Scanning...'); this.props.startScanning()});
    }

    getStatus = () => {
        return this.props.bluetoothStatus;
    }

    render() {
      let status = this.getStatus();
      if(__DEV__){
          console.log('ScanButton: render occured: status = ' + status);
      }


      if (status == constants.SCANNING){
          return (
              <View style={{height: 50, borderRadius: 4, backgroundColor: 'powderblue', alignItems: 'center', justifyContent: 'center'}} >
                <ActivityIndicator animating={true} />
                <Text style={{textAlign: 'center', fontSize: 18, }} >
                  scanning...
                </Text>
              </View>
          )
      }

      return (
          <View>
            <TouchableHighlight style={{padding: 10, backgroundColor: 'steelblue',
                                        borderRadius: 4, height: 50,
                                        alignItems: 'center', justifyContent: 'center'

                                      }} onPress={() => {this.scan()}} >
              <Text style={{color: 'white', fontSize: 18}} >
                scan
              </Text>
            </TouchableHighlight>
          </View>
      );
    }

}

const mapStateToProps = (state) => {
    return {
        bluetoothStatus: state.bluetooth.bluetoothStatus
    }
}


const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(bActions, dispatch)
}



ScanButton = connect(mapStateToProps, mapDispatchToProps)(ScanButton)

export default ScanButton;
