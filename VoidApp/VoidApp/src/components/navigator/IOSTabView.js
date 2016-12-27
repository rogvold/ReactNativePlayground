/**
 * Created by sabir on 23.12.16.
 */
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
import SensorsApp from '../apps/SensorsApp'
import TestsApp from '../apps/TestsApp'



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
        if (__DEV__){
            console.log('rendering IOSTabView');
        }
        return (
            <TabBarIOS  tintColor={Colors.darkText} >

                <TabBarIOS.Item
                    title="Index"
                    selected={this.props.tab === 'index'}
                    onPress={this.onTabSelect.bind(this, 'index')} >

                    <IndexApp
                        navigator={this.props.navigator}
                    />

                </TabBarIOS.Item>

                <TabBarIOS.Item
                    title="Sensors"
                    selected={this.props.tab === 'sensors'}
                    onPress={this.onTabSelect.bind(this, 'sensors')} >

                    <SensorsApp
                        navigator={this.props.navigator}
                    />

                </TabBarIOS.Item>

                <TabBarIOS.Item
                    title="Tests"
                    selected={this.props.tab === 'tests'}
                    onPress={this.onTabSelect.bind(this, 'tests')} >

                    <TestsApp
                        navigator={this.props.navigator}
                    />

                </TabBarIOS.Item>

            </TabBarIOS>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        tab: state.navigation.tab
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onTabSelect: (tab) => dispatch(switchTab(tab)),
    }
}

IOSTabView = connect(mapStateToProps, mapDispatchToProps)(IOSTabView)

export default IOSTabView
