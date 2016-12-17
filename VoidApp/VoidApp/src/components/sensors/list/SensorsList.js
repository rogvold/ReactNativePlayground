

import React, { Component, PropTypes} from 'react';
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


export default class VoidApp extends Component {

  static defaultProps = {

      onSensorClick: (sensor) => {
          console.log('clicked on sensor = ', sensor);
      }

  }

  static propTypes: {
      sensors: PropTypes.array,
      onSensorClick: PropTypes.func
  }

  onSensorClick = (sensor) => {
      this.props.onSensorClick(sensor);
  }

  render() {
    var list = this.props.sensors;

    return (
      <View style={styles.container}>

        {list.map( (sensor, k) => {
            var key = 'sensor_' + k + '_' + sensor.name;
            return (
              <TouchableHighlight key={key} style={styles.sensor_item} onPress={() => this.onSensorClick(sensor) }>
                  <Text>
                      {sensor.name}
                  </Text>
              </TouchableHighlight>
            )
        } )}

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

  sensor_item: {
    padding:20,
    borderWidth: 1,
    borderRadius: 4,
    marginTop: 20
  }
});
