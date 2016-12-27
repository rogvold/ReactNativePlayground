/**
 * Created by sabir on 26.12.16.
 */


 import React, {PropTypes} from 'react';
 import {connect} from 'react-redux';
 import {bindActionCreators} from 'redux';

 import moment from 'moment'

import * as actions from '../../../actions/CardioTestsActions'

 import {
     AppRegistry,
     StyleSheet,
     Text,
     Modal,
     View,
     TextInput,
     Navigator,
     TouchableHighlight,
     NativeAppEventEmitter,
     Platform,
     BackAndroid,
     ActivityIndicator,
     ProgressBarAndroid,
     ProgressViewIOS
 } from 'react-native';


 class StepTestPanel extends React.Component {

     static defaultProps = {}

     static propTypes = {}

     state = {}

     //ES5 - componentWillMount
     constructor(props) {
         super(props);
     }

     componentDidMount() {

     }

     componentWillReceiveProps() {

     }

     getRangesValues = (sensorId) => {
         let dataArr = this.getSensorData(sensorId);
         let {startTimestamp} = this.props;
         if (startTimestamp == undefined){
             return [];
         }

         dataArr = dataArr.filter((a) => {return a.t >= startTimestamp});
         dataArr = dataArr.map((a) => {let b = Object.assign({}, a, {t: a.t - startTimestamp}); return b;});

         let res = ranges.map( (range, k) => {
             let val = undefined;
             for (let j in dataArr){
                 let d = dataArr[j];
                 if (+d.t > +range){
                     val = d.hr;
                     break;
                 }
             }
             return val;
         })

         return res;
     }

     getRangesContent = (sensorId) => {
         let rangesValues = this.getRangesValues(sensorId);

         return ranges.map((range, k) => {
             let key = 'range_' + k;
             let num = +k + 1;
             let val = rangesValues[k];
             return (
                 <View style={styles.rangesPlaceholder} key={key} >
                     <View style={styles.range} >
                         <Text>T{num} = {val == undefined ? ' ? ' : val}</Text>
                     </View>
                 </View>
             )
         })
     }

     getResultData = (sensorId) => {
         let a = this.getRangesValues(sensorId);

         let ok = true;
         if (a == undefined){
             ok = false;
         }
         for (let i in a){
             if (a[i] == undefined){
                 ok = false;
             }
         }
         if (ok == false){
             return undefined;
         }
         let sum = 0;
         for (let i in a){
             sum = +sum + +a[i];
         }
         sum = sum / 2.0;
         if (sum == undefined || sum == 0){
             return undefined;
         }
         let k = 100.0 / sum;
         return {
             res9: 180 * k,
             res12: 240 * k
         }
     }

     getTimeElapsed = () => {
         if (this.props.startTimestamp == undefined){
             return 0;
         }
         let ms = (+new Date() - this.props.startTimestamp);
         return ms;
     }

     getCurrentHeartRate = (sensorId) => {
         if (__DEV__){
             console.log('getCurrentHeartRate occured for sensor with id = ', sensorId);
         }
         let d = this.getLastData(sensorId);
         if (__DEV__){
             console.log('d = ', d);
         }
         if (d == undefined){
             return null;
         }
         return d.hr;
     }

     getSensorData = (sensorId) => {
         let dataMap = this.props.dataMap;
         var arr = dataMap[sensorId];
         if (arr == undefined){
             arr = [];
         }
         return arr;
     }

     getLastData = (sensorId) => {
         let arr = this.getSensorData(sensorId);
         if (arr.length == 0){
             return undefined;
         }
         return arr[arr.length - 1];
     }

     toggleStartStop = () => {
         let {startTimestamp} = this.props;
         if (startTimestamp == undefined){
             this.props.startTest();
         }else {
             this.props.stopTest();
         }
     }

     getProgressComponent = () => {
         let ms = this.getTimeElapsed();
         let max = ranges[ranges.length - 1];
         let perc = Math.min(1, 1.0 * ms / max);
         if (__DEV__){
             console.log('getProgressComponent: perc = ', perc);
         }
         if (__DEV__){
             console.log('Platform.OS =', Platform.OS);
         }
         if (Platform.OS == 'android'){

            return (
                <ProgressBarAndroid styleAttr="Large" color="green" progress={perc} />
            )
         }
         if (Platform.OS == 'ios'){
            return (
                    <ProgressViewIOS styleAttr="Large" color="green"  progress={perc} />
                )
         }
         return null;
     }

     render = () => {
         let {sensors, startTimestamp} = this.props;
         if (__DEV__){
             console.log('StepTestPanel: render');
         }
         let timeElapsed = this.getTimeElapsed();
         let timeString = moment.utc(timeElapsed).format("mm:ss");
         let finished = (startTimestamp != undefined || timeElapsed > ranges[ranges.length - 1]);
         let percents = (startTimestamp == undefined) ? 0 : Math.min(Math.floor(100.0 * timeElapsed / ranges[ranges.length - 1]), 100);


         return (
             <View style={styles.container} >

                 <View style={styles.headerPlaceholder} >
                    <View style={styles.headerLeft} >
                        <Text style={styles.testName} >
                            Step Test
                        </Text>
                    </View>
                     <View style={styles.timePlaceholder}>
                         <Text style={styles.time} >
                             {timeString}
                         </Text>
                     </View>
                     <View style={styles.headerRight} >
                         <TouchableHighlight style={styles.stopButton} onPress={this.toggleStartStop} >
                             <Text style={styles.stopButtonText} >
                                 {startTimestamp == undefined ? 'Start' : 'Stop'}
                             </Text>
                         </TouchableHighlight>
                     </View>
                 </View>

                 {percents == 0 ? null :
                     <View style={styles.progressPlaceholder} >
                         {this.getProgressComponent()}
                     </View>
                 }

                 <View style={styles.sensorsList} >

                     {sensors.map( (sensor, k) => {
                         let key = 'sensor_' + sensor.id + '_' + k;
                         let heartRate = this.getCurrentHeartRate(sensor.id);
                         if (__DEV__){
                             console.log('rendering sensor: ', sensor, ' heart rate = ', heartRate);
                         }
                         let resData = this.getResultData(sensor.id);
                         return (
                             <View style={styles.listItem} key={key} >

                                 <View style={styles.itemLeft} >
                                     <View style={styles.itemTopLeft} >
                                         <View style={styles.namePlaceholder} >
                                             <Text style={styles.name} >
                                                 {
                                                     sensor.displayName
                                                 }
                                             </Text>
                                         </View>

                                         <View style={styles.currentHearRatePlaceholder} >
                                             <Text style={styles.currentHearRate} >
                                                 {
                                                     heartRate
                                                 }
                                             </Text>
                                         </View>
                                     </View>
                                     <View style={styles.itemBottomLeft} >
                                         <View style={styles.rangesPlaceholder} >
                                             {
                                                 this.getRangesContent(sensor.id)
                                             }
                                         </View>
                                     </View>
                                 </View>

                                 {resData == undefined ? null :
                                     <View style={styles.itemRight} >

                                         <View style={styles.resTop} >
                                             <Text style={styles.resText} >
                                                 Score9 = <Text style={{fontWeight: 'bold', fontSize: 32}} >{Math.round(resData.res9)}</Text>
                                             </Text>
                                         </View>

                                         <View style={styles.resBottom} >
                                             <Text style={styles.resText} >
                                                 Score12 = <Text style={{fontWeight: 'bold', fontSize: 32}} >{Math.round(resData.res12)}</Text>
                                             </Text>
                                         </View>

                                     </View>
                                 }


                             </View>
                         );
                     })}

                 </View>

             </View>
         )
     }

 }

 var styles = StyleSheet.create({
     container: {
         flex: 1,
         backgroundColor: 'white'
     },



     headerPlaceholder: {
         height: 50,
         backgroundColor: '#0059C7',
         alignSelf: 'stretch',
         flexDirection: 'row',
         paddingLeft: 10,
         paddingRight: 10
     },

     stopButton: {
        padding: 10,
         borderRadius: 5,
         height: 36,
         borderWidth: 2,
         borderColor: 'white',
         justifyContent: 'center',
         width: 80,
         alignSelf: 'flex-end'
     },

     stopButtonText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 24
     },

     testName: {
        color: 'white',
        fontSize: 32,
         // fontWeight: 'bold'
     },

     headerLeft: {
         flex: 1,
         justifyContent: 'center'
     },

     timePlaceholder: {
         flex: 1,
         justifyContent: 'center'
     },

     time: {
        textAlign: 'center',
         color: 'white',
         fontSize: 32
     },

     headerRight: {
        flex: 1,
        justifyContent: 'center'
     },

     sensorsList: {

     },

     textCenter: {
        textAlign: 'center'
     },

     listItem: {
         // padding: 10,
         height: 120,
         // justifyContent: 'center',
         flexDirection: 'row',
         margin: 5,
         backgroundColor: 'white',
         borderRadius: 3,
         alignItems: 'stretch',
         paddingLeft: 5,
         paddingRight: 5
     },

     itemLeft: {
         flex: 3,
         flexDirection: 'column'
     },

     itemTopLeft: {
         flex: 2,
         flexDirection: 'row'
     },

     itemBottomLeft: {
        flex: 1
     },

     itemRight: {
         flex: 1,
         // alignSelt: 'stretch',
         backgroundColor: 'azure',
         flexDirection: 'column'
     },

     resTop: {
         flex: 1,
         alignSelf: 'stretch',
         backgroundColor: '#D4E157',
         justifyContent: 'center'
     },

     resText: {
        alignSelf: 'center'
     },

     resBottom: {
         flex: 1,
         alignSelf: 'stretch',
         backgroundColor: '#B2DFDB',
         justifyContent: 'center'
     },

     namePlaceholder: {
        // flex: 1,
         justifyContent: 'center',
         flex: 3
     },

     name: {
        // textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 30
     },

     currentHearRatePlaceholder: {
         // flex: 1,
         justifyContent: 'center',
         flex: 1
     },

     currentHearRate: {
         textAlign: 'center',
         width: 100,
         fontSize: 30,
         fontWeight: 'bold'
     },

     timerPlaceholder: {
        justifyContent: 'center'
     },

     timer: {
        textAlign: 'center'
     },

     rangesPlaceholder: {
        // flex: 1,
        //  justifyContent: 'center',
         flexDirection: 'row',
         height: 50
     },

     range: {
         marginLeft: 3,
         marginRight: 3,
         alignSelf: 'center'
     },

     resultPlaceholder: {
        flexDirection: 'column',
        justifyContent: 'center'
     },

     resultTop: {
         flex: 1
     },

     resultBottom: {
         flex: 1,
         justifyContent: 'center'
     },

     progressPlaceholder: {
         height: 20,
         justifyContent: 'center',
         alignSelf: 'stretch',
         backgroundColor: 'white'
     }

 });

 let ranges = [120 * 1000, 150 * 1000, 180 * 1000, 210 * 1000, 240 * 1000, 270 * 1000];

let getSensors = (state) => {
    let map = state.sensors.sensorsMap;
    let selectedSensorsMap = state.cardioTest.selectedSensorsMap;
    let {connectedSensorsMap} = state.bluetooth;
    let arr = [];
    for (var key in map){
        let s = map[key];
        if (s.name != s.displayName && connectedSensorsMap[s.id] != undefined && selectedSensorsMap[s.id] != undefined){
            arr.push(s);
        }
    }
    arr.sort((a, b) => {
        if (a.id < b.id) return 1;
        if (a.id > b.id) return 1;
        return 0;
    })
    return arr;
}

 const mapStateToProps = (state) => {
    return {
        dataMap: state.bluetooth.dataMap,
        startTimestamp: state.cardioTest.startTimestamp,
        sensors: getSensors(state)
    }
 }

 const mapDispatchToProps = (dispatch) => {
    return {
        stopTest: () => {
            return dispatch(actions.stopTest());
        },
        startTest: () => {
            return dispatch(actions.startTest());
        }
    }
 }

 StepTestPanel = connect(mapStateToProps, mapDispatchToProps)(StepTestPanel)

 export default StepTestPanel