import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableHighlight
} from 'react-native';

import React, { Component, PropTypes } from 'react';


import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../../../actions/UsersActions.js'

class LogoutPanel extends Component {

  state = {

  }

  static defaultProps = {
      buttonName: 'logout'
  }

  constructor(props) {
    super(props);
  }

  onLoginSubmit = (d) => {
      console.log('AuthPanel: onLoginSubmit: data = ', d);
      console.log('d.email = ', d.email);
      var data = Object.assign({}, d);
      this.props.onLogin(data);
  }

  onSignUpSubmit = (d) => {
      console.log('AuthPanel: onSignUpSubmit: data = ', d);
      console.log('d.email = ', d.email);
      var data = Object.assign({}, d);
      this.props.onSignUp(data);
  }

  render = () => {


    return (
      <View style={styles.container}>


        <TouchableHighlight style={styles.button} onPress={this.props.logOut} >
          <Text style={styles.buttonText} >
              {this.props.buttonName}
          </Text>
        </TouchableHighlight>


      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      marginTop: 10,
      padding: 10
  },

  buttonText: {
      textAlign: 'center',
      fontSize: 20,
      color: 'white'
  },

  button: {
      padding: 10,
      borderRadius: 20,
      alignSelf: 'center',
      alignSelf: 'stretch',
      borderWidth: 1,
      borderColor: 'white'
  },

  loginFormPlaceholder: {

  }

});

const mapStateToProps = (state) => {
    return {
        loading: state.users.loading,
        error: state.users.error,
        isLoggedIn: (state.users.currentUser != undefined),
        currentUser: state.users.currentUser
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLogin: (data) => {
            dispatch(actions.logIn(data))
        },
        onSignUp: (data) => {
            dispatch(actions.signUp(data))
        },
        logOut: () => {
            dispatch(actions.logOut())
        }
    }
}

LogoutPanel = connect(mapStateToProps, mapDispatchToProps)(LogoutPanel)

export default LogoutPanel;
