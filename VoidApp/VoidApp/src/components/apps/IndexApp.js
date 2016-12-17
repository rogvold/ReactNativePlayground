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
  ActivityIndicator
} from 'react-native';

import BluetoothComponent from '../bluetooth/BluetoothComponent'
import SensorsListPanel from '../bluetooth/panels/SensorsListPanel'
import ScanButton from '../bluetooth/buttons/ScanButton'


class IndexApp extends React.Component {

    static defaultProps = {}

    static propTypes = {

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
      return (
          <View style={{padding: 22}} >


            <ScanButton />

            <SensorsListPanel />



            <BluetoothComponent />

          </View>
      );
    }

}

export default IndexApp
