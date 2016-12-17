import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image
} from 'react-native';

import React, { Component } from 'react';

import UserAvaPanel from '../user/panels/UserAvaPanel'

export default class IndexApp extends Component {

  state = {

  }

  constructor(props) {
    super(props);
  }

  render() {
    console.log('index app: render');
    return (
      <View style={styles.container}>

          <UserAvaPanel />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
    flex: 1,
    alignSelf: 'stretch'
  },


});
