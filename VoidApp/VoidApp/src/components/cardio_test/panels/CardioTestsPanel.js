/**
 * Created by sabir on 25.12.16.
 */


 import React, {PropTypes} from 'react';
 import {connect} from 'react-redux';
 import {bindActionCreators} from 'redux';

 import * as actions from '../../../actions/CardioTestsActions'

 import StepTestPanel from './StepTestPanel'

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

 import SensorsCardsPanel from '../cards/SensorsCardsPanel'

 class CardioTestsPanel extends React.Component {

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

     isSelected = () => {
         return ( this.props.cardioTest.currentTestName != undefined)
     }

     isStarted = () => {
         return ( this.props.cardioTest.startTimestamp != undefined)
     }

     stopTest = () => {

     }

     render = () => {
         let isSelected = this.isSelected();
         let isStarted = this.isStarted();
         let testName = this.props.cardioTest.currentTestName;

         return (
             <View style={styles.container} >

                 {isSelected == true ? null :
                    <SensorsCardsPanel />
                 }

                 {isSelected == false ? null :
                     <View>

                         {isStarted == true ?
                             null
                             :
                             <View style={styles.cancelTestButtonPlaceholder} >

                                 <TouchableHighlight
                                     style={styles.cancelTestButton}
                                     onPress={this.props.stopTest} >
                                     <Text style={styles.cancelTestButtonText}>
                                        Cancel
                                     </Text>
                                 </TouchableHighlight>

                             </View>
                         }


                         {testName == 'rufe' ?
                             <View>

                             </View>
                             :
                             <View>
                                 <StepTestPanel />
                             </View>
                         }

                     </View>
                 }

             </View>
         )
     }

 }

 var styles = StyleSheet.create({
     container: {
         flex: 1,
         backgroundColor: 'gainsboro'
     },

     testNameText: {
         padding: 10,
         textAlign: 'center',
         marginBottom: 10
     },

     cancelTestButton: {
         padding: 10,
         height: 40,
         justifyContent: 'center',
         // backgroundColor: 'azure',
         // borderRadius: 10,
         // borderWidth: 3,
     },

     cancelTestButtonText: {
        textAlign: 'center',
         // color: 'white'
     },

     cancelTestButtonPlaceholder: {
         justifyContent: 'center'
     }

 });


 const mapStateToProps = (state) => {
    return {
        cardioTest: state.cardioTest,
    }
 }



 const mapDispatchToProps = (dispatch) => {
    return {
        startTest: () => {
            return dispatch(actions.startTest());
        },
        stopTest: () => {
            return dispatch(actions.stopTest());
        }
    }
 }

 CardioTestsPanel = connect(mapStateToProps, mapDispatchToProps)(CardioTestsPanel)

 export default CardioTestsPanel