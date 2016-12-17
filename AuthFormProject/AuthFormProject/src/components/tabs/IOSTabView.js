/**
 * Created by sabir on 01.12.16.
 */

import React, {PropTypes, Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {switchTab} from '../../actions/NavigationActions'

import * as Colors from '../../constants/AppColors'

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TabBarIOS,
  ActivityIndicator,
  StatusBar
} from 'react-native';

//apps
import IndexApp from '../apps/IndexApp'
import ProfileApp from '../apps/ProfileApp'
import LoginApp from '../apps/LoginApp'


import UserInfoPanel from '../user/UserInfoPanel';

import AppNavigator from '../navigator/AppNavigator'



class IOSTabView extends Component {

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

    onTabSelect = (tab) => {
        this.props.onTabSelect(tab);
    }

    render = () => {
      console.log('rendering IOSTabView');
      return (
        <TabBarIOS  tintColor={Colors.darkText} >

          <TabBarIOS.Item
            title="Index"
            selected={this.props.tab === 'index'}
            onPress={this.onTabSelect.bind(this, 'index')}
            icon={require('../../assets/img/maps-icon.png')}
            selectedIcon={require('../../assets/img/maps-icon-active.png')} >

            <IndexApp
              navigator={this.props.navigator}
            />

          </TabBarIOS.Item>

          <TabBarIOS.Item
            title="Profile"
            selected={this.props.tab === 'profile'}
            onPress={this.onTabSelect.bind(this, 'profile')}
            icon={require('../../assets/img/info-icon.png')}
            selectedIcon={require('../../assets/img/info-icon-active.png')} >

            <ProfileApp
              navigator={this.props.navigator}
            />

          </TabBarIOS.Item>

        </TabBarIOS>
    )
    }

}

const mapStateToProps = (state) => {
    return {
        tab: state.navigation.tab,
        currentUser: state.users.currentUser,
        initialized: state.users.initialized
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onTabSelect: (tab) => dispatch(switchTab(tab)),
    }
}

IOSTabView = connect(mapStateToProps, mapDispatchToProps)(IOSTabView)

export default IOSTabView
