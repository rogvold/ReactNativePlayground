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
  View
} from 'react-native';

//apps
import LoginApp from './LoginApp.js';


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

    getUserRoute() {

        console.log('getUserRoute occured');

        return (
            <LoginApp />
        );
    }

    render() {
        console.log('App: render: this.props.initialized = ', this.props.initialized);
        if (this.props.initialized == false){

            return (
                <View style={{justifyContent: 'center', marginTop: 30}} >
                    <Text style={{fontSize: 30}} >
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

        return this.getUserRoute();
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
