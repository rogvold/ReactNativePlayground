import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput
} from 'react-native';

import React, { Component } from 'react';

import CoolLoginForm from './CoolLoginForm';
import CoolSignUpForm from './CoolSignUpForm';

export default class AuthForm extends Component {

  state = {
      mode: 'login'
  }

  constructor(props) {
    super(props);

  }

  static defaultProps: {
      loading: false
  }

  onLoginSubmit = (data) => {
      console.log('onLoginSubmit: data = ', data);
      this.props.onLoginSubmit(data);
  }

  onSignUpSubmit = (data) => {
      console.log('onSignUpSubmit: data = ', data);
      this.props.onSignUpSubmit(data);
  }

  render() {
    let mode = this.state.mode;

    return (
      <View style={styles.container}>


        {mode == 'login' ?
            <View>
              <CoolLoginForm loading={this.props.loading}
               onSubmit={this.onLoginSubmit} />
            </View>
            : null}

          {mode == 'signup' ?
            <CoolSignUpForm loading={this.props.loading}
                            onSubmit={this.onSignUpSubmit} />
            : null}

        <View style={{marginTop: 0}} >

            {mode == 'login' ?
              <Text onPress={() => {this.setState({mode: 'signup'})}}
                  style={{textAlign: 'center'}}
                  >
                Do not have an account? Sign up!
              </Text> :
              <Text onPress={() => {this.setState({mode: 'login'})}}
                    style={{textAlign: 'center'}}
               >
                Have an account? Sign in!
              </Text>
            }

        </View>

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
