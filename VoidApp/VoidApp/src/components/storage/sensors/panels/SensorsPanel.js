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
    Modal,
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

     state = {
         selectedSensorId: undefined
     }

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
         const {selectedSensorId} = this.state;

         return (
             <View style={styles.container} >

                 <View style={styles.headerPlaceholder} >
                     <Text style={styles.header} >
                         Sensors
                     </Text>
                 </View>

                 {sensors.length == 0 ?
                     <View style={styles.noSensorsPlaceholder}>
                         <Text style={styles.noSensorsText} >
                             No sensors found. Please run scanning.
                         </Text>
                     </View> :
                     <SensorsList sensors={sensors} onSensorClick={(s) => {this.setState({selectedSensorId: s.id})}} />
                 }



                 <Modal
                     animationType={"slide"}
                     transparent={false}
                     visible={(selectedSensorId != undefined)}
                     onRequestClose={() => {alert("Modal has been closed.")}}
                 >
                         <View style={styles.dialogPlaceholder} >

                             <UpdateSensorPanel
                                 onUpdated={() => {this.setState({selectedSensorId: undefined})}}
                                 sensorId={selectedSensorId} />

                             <TouchableHighlight style={styles.closeButton} onPress={() => {this.setState({selectedSensorId: undefined})}}>
                                 <Text style={{textAlign: 'center'}} >
                                     Cancel
                                 </Text>
                             </TouchableHighlight>

                         </View>

                 </Modal>



             </View>
         )
     }

 }

 var styles = StyleSheet.create({
     container: {
         marginTop: 10,
         // flex: 1,
     },

     closeButton: {
         padding: 10,
         borderWidth: 1,
         borderColor: 'black',
         height: 40,
         marginTop: 10,
         borderRadius: 3
     },

     dialogPlaceholder: {
         padding: 22,
         paddingTop: 30
     },

     headerPlaceholder: {
         padding: 10,
     },

     header: {
         textAlign: 'center',
         fontSize: 18
     },

     noSensorsPlaceholder: {
        padding: 10
     },

     noSensorsText: {
        textAlign: 'center'
     }

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