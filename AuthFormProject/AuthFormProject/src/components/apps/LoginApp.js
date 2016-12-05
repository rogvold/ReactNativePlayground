import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput
} from 'react-native';

import React, { Component } from 'react';

import LoginForm from '../auth/forms/LoginForm';

import CoolLoginForm from '../auth/forms/CoolLoginForm';

import AuthPanel from '../auth/panels/AuthPanel';

export default class LoginApp extends Component {

  state = {

  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>

        <AuthPanel />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // flexDirection: 'column',
    // justifyContent: 'center',
    // alignItems: 'center'
  },

  loginFormPlaceholder: {
    // height: 200
  }

});
