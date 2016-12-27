/**
 * Created by sabir on 25.12.16.
 */


 import React, {PropTypes} from 'react';
 import {connect} from 'react-redux';
 import {bindActionCreators} from 'redux';

 import * as actions from '../../../actions/CardioTestsActions'

 import CardsList from './CardsList'

 import SelectTestPanel from '../panels/SelectTestPanel'

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
     ActivityIndicator
 } from 'react-native';

 class SensorsCardsPanel extends React.Component {

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


     onCardClick = (id) => {
         const {selectedSensorsMap} = this.props;
         let newMap = Object.assign({}, selectedSensorsMap);
         if (newMap[id] == undefined){
             newMap = Object.assign({}, newMap, {[id]: 1});
         }else {
             newMap[id] = undefined;
         }
         this.props.selectSensors(newMap);
     }

     isAnythingSelected = () => {
         let selectedMap = this.props.selectedSensorsMap;
         for (let key in selectedMap){
             let s = selectedMap[key];
             if (s != undefined){
                 return true;
             }
         }
         return false;
     }

     render = () => {
         let {cards} = this.props;
         let selectedMap = this.props.selectedSensorsMap;
         let isAnythingSelected = this.isAnythingSelected();

         return (
             <View style={styles.container} >

                 {cards.length == 0 ?
                     <View>
                         <Text style={styles.noConnectedText}>
                             No connected sensors
                         </Text>
                     </View> :
                     <CardsList cards={cards}
                                onCardClick={this.onCardClick}
                                selectedMap={selectedMap} />
                 }

                 {isAnythingSelected == false ? null :
                     <SelectTestPanel />
                 }

             </View>
         )
     }

 }

 var styles = StyleSheet.create({
     container: {
         flex: 1,
     },

     noConnectedText: {
         textAlign: 'center'
     }

 });

 let getCards = (state) => {
     let map = state.sensors.sensorsMap;
     let {connectedSensorsMap} = state.bluetooth;
     let arr = [];
     for (var key in map){
         let s = map[key];
         if (s.name != s.displayName && connectedSensorsMap[s.id] != undefined){
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
        selectedSensorsMap: state.cardioTest.selectedSensorsMap,
        cards: getCards(state)
    }
 }

 const mapDispatchToProps = (dispatch) => {
    return {
        selectSensors: (sensorsMap) => {
            return dispatch(actions.selectSensors(sensorsMap))
        }
    }
 }

 SensorsCardsPanel = connect(mapStateToProps, mapDispatchToProps)(SensorsCardsPanel)

 export default SensorsCardsPanel