/**
 * Created by sabir on 26.12.16.
 */


 import React, {PropTypes} from 'react';
 import {connect} from 'react-redux';
 import {bindActionCreators} from 'redux';

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

 class RufeTestPanel extends React.Component {

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

     render = () => {

         return (
             <View style={styles.container} >

             </View>
         )
     }

 }

 var styles = StyleSheet.create({
     container: {
         flex: 1,
     },
 });


 const mapStateToProps = (state) => {
    return {
        dataMap: state.bluetooth.dataMap
    }
 }

 const mapDispatchToProps = (dispatch) => {
    return {

    }
 }

 RufeTestPanel = connect(mapStateToProps, mapDispatchToProps)(RufeTestPanel)

 export default RufeTestPanel