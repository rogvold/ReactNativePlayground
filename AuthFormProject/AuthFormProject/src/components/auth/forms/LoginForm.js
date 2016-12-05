import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput
} from 'react-native';

import React, { Component } from 'react';

export default class LoginForm extends Component {

  state = {
        email: '',
        password: ''
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>

        <View style={styles.inputPlaceholder} >
           <View >
             <Text style={styles.label}  >
                Email
             </Text>
           </View>
           <View style={styles.inputWrapper} >
             <TextInput value={this.state.email}  style={styles.input}
                        placeholder={'email'}
                        onChangeText={(text) => {this.setState({email: text})}} />
            </View>
        </View>

        <View style={styles.inputPlaceholder} >
           <View >
             <Text style={styles.label}  >
                Password
             </Text>
           </View>
           <View style={styles.inputWrapper} >
             <TextInput value={this.state.password} style={styles.input}
                        placeholder={'password'}
                        onChangeText={(text) => {this.setState({password: text})}} />
           </View>

        </View>

        <View style={styles.submitButtonWrapper} >
          <View style={styles.submitButton} >
            <Text style={{textAlign: 'center', color: 'white', fontSize: 16}} >
                Log in
            </Text>
          </View>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 200,
    width: 200,


    backgroundColor: '#F5FCFF',
    padding: 5,

    backgroundColor: 'white',

    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
  },

  inputPlaceholder: {
      flex: 1,
      alignSelf: 'stretch',
      // backgroundColor: 'powderblue'
  },

  inputWrapper: {
    alignSelf: 'stretch',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 4,
    height: 30,
    padding: 5
  },

  input: {
      flex: 1,
      alignSelf: 'stretch',
      width: 100
  },

  label: {
      fontSize: 16,
      marginBottom: 1,
      alignSelf: 'stretch',
  },

  submitButtonWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  submitButton: {
      padding: 5,
      // flex: 1,
      backgroundColor: 'steelblue',
      // width: 200,
      // marginTop: 10,
      alignSelf: 'stretch',
      borderRadius: 4
      // height: 25
  },

});
