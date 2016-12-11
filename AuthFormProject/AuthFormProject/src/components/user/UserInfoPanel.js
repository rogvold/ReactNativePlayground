import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button
} from 'react-native';

import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux';

import * as actions from '../../actions/UsersActions'

class UserInfoPanel extends Component {

  state = {

  }

  static propTypes: {
      logOut: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
  }

  onPress = () => {
      console.log('logging out');
      this.props.logOut();
  }

  render() {
    var user = this.props.currentUser;
    return (
      <View style={styles.container}>

        <Text>current user is {user.email}</Text>

        <Button title={'Logout'}
            color="#841584"
            onPress={this.onPress}
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
      paddingTop: 40
  },

});

const mapStateToProps = (state) => {
    return {
        currentUser: state.users.currentUser
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      logOut: () => {
          dispatch(actions.logOut())
      }
    }
}

UserInfoPanel = connect(mapStateToProps, mapDispatchToProps)(UserInfoPanel);

export default UserInfoPanel;
