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
  ActivityIndicator,
  StatusBar
} from 'react-native';

//apps
import LoginApp from './LoginApp.js';

import UserInfoPanel from '../user/UserInfoPanel';

import AppNavigator from '../navigator/AppNavigator'

class App extends React.Component {

    static defaultProps = {}

    static propTypes = {
        currentUser: PropTypes.object,
        initialized: PropTypes.bool
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

    getUserContent() {


        return (
            <View style={{flex: 1}} >
                  <StatusBar
                      translucent={true}
                      backgroundColor="rgba(0, 0, 0, 0.2)"
                      barStyle="light-content"
                     />

                   <AppNavigator />
            </View>
        );
    }

    render() {
        console.log('App: render: this.props.initialized = ', this.props.initialized);
        if (this.props.initialized == false){

            return (
                <View style={{justifyContent: 'center', marginTop: 30}} >
                    <ActivityIndicator />
                    <Text style={{fontSize: 20, textAlign: 'center'}} >
                        loading...
                    </Text>
                </View>
            );
        }

        var user = this.props.currentUser;
        if (user == undefined){
            return (
                <LoginApp />
            );
        }

        return this.getUserContent();
    }

}

const mapStateToProps = (state) => {
    return {
        currentUser: state.users.currentUser,
        initialized: state.users.initialized
    }
}

App = connect(mapStateToProps, null)(App)

export default App
