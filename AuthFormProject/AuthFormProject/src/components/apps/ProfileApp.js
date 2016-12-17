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

import UserAvaPanel from '../user/panels/UserAvaPanel'
import LogoutPanel from '../user/panels/LogoutPanel'

export default class ProfileApp extends Component {

  state = {

  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>

          <UserAvaPanel />

          <LogoutPanel />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20
    // flexDirection: 'column',
    // justifyContent: 'center',
    // alignItems: 'center'
  },

  loginFormPlaceholder: {
    // height: 200
  }

});
