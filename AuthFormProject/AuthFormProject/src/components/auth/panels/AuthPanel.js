import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput
} from 'react-native';

import React, { Component, PropTypes } from 'react';


import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../../../actions/UsersActions.js'


import AuthForm from '../forms/AuthForm';


class AuthPanel extends Component {

  state = {

  }

  static defaultProps: {
      onLogin: PropTypes.func,
      onSignUp: PropTypes.func
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

  render() {
    let mode = this.state.mode;

    return (
      <View style={styles.container}>


        <AuthForm loading={this.props.loading}
                  onSignUpSubmit={this.onSignUpSubmit}
                  onLoginSubmit={this.onLoginSubmit} />


      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {

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
        }
    }
}

AuthPanel = connect(mapStateToProps, mapDispatchToProps)(AuthPanel)

export default AuthPanel;
