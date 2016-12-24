/**
 * Created by sabir on 24.12.16.
 */

import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Navigator,
    TouchableHighlight,
    NativeAppEventEmitter,
    Platform,
    BackAndroid,
    ActivityIndicator
} from 'react-native';

 import React, {PropTypes} from 'react';
 import {connect} from 'react-redux';
 import {bindActionCreators} from 'redux';

 import PureRenderMixin from 'react-addons-pure-render-mixin';

 import SensorsList from '../list/SensorsList'

import UpdateSensorPanel from './UpdateSensorPanel'

import * as actions from '../../../../actions/SensorsActions'




 class SensorsPanel extends React.Component {

     static defaultProps = {}

     static propTypes = {}

     state = {}

     //ES5 - componentWillMount
     constructor(props) {
         super(props);
         this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
     }

     componentDidMount() {

     }

     componentWillReceiveProps() {

     }

     render = () => {
         const {sensors} = this.props;

         return (
             <View style={styles.container} >

                 <Text>
                     this is sensors panel
                 </Text>

                 <UpdateSensorPanel sensorId={'sabir'} />

                 <SensorsList sensors={sensors} />

             </View>
         )
     }

 }

 var styles = StyleSheet.create({
     container: {
         marginTop: 10,
         // flex: 1,
     },

 });


let getSensors = (map) => {
    let arr = [];
    for (var key in map){
        arr.push(map[key]);
    }
    arr.sort((a, b) => {
        if (a.id > b.id) {return 1}
        if (a.id < b.id) {return -1}
        return 0;
    });
    return arr;
}

const mapStateToProps = (state) => {
    return {
        loading: state.sensors.loading,
        sensorsMap: state.sensors.sensorsMap,
        sensors: getSensors(state.sensors.sensorsMap)
    }
}


const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(actions, dispatch)
}

 SensorsPanel = connect(mapStateToProps, mapDispatchToProps)(SensorsPanel)

 export default SensorsPanel