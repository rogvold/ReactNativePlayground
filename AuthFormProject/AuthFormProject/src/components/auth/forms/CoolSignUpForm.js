
var t = require('tcomb-form-native');

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableHighlight,
  ActivityIndicator
} from 'react-native';

import React, { Component } from 'react';

var Form = t.form.Form;

var Person = t.struct({
  firstName: t.String,
  lastName: t.String,
  email: t.String,
  password: t.String,
});

var options = {
  fields: {
    email: {
      label: 'Email',
      placeholder: 'Email'
    },
    password: {
      label: 'Password',
      placeholder: 'Password'
    },
    firstName: {
      label: 'First name',
      placeholder: 'First name'
    },
    lastName: {
      label: 'Last name',
      placeholder: 'Last name'
    }
  }
};

export default class CoolSignUpForm extends Component {

  state = {

  }

  static defaultProps = {
      onSubmit: (data) => {
        console.log('onSubmit: data = ', data);
      },
      loading: false
    }

  constructor(props) {
    super(props);
  }

  onPress = () => {
    // call getValue() to get the values of the form
    var value = this.refs.form.getValue();

    console.log(value);

    if (value) { // if validation fails, value will be null
      console.log(value); // value here is an instance of Person
      this.props.onSubmit(value);
    }
  }

  render() {
    return (
      <View style={styles.container}>

      <Form
                ref="form"
                type={Person}
                options={options}
              />

      {this.props.loading == true ?
        <View style={styles.button}>
            <ActivityIndicator style={styles.loadingIndicator}  />
        </View> :
        <TouchableHighlight style={styles.button}
          onPress={this.onPress} underlayColor='#99d9f4'>
           <Text style={styles.buttonText}>Sign up</Text>
         </TouchableHighlight>
      }


      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 30,
    alignSelf: 'center',
    marginBottom: 30
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },

  loadingIndicator: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  }

});
