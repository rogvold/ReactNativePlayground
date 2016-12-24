/**
 * Created by sabir on 24.12.16.
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Navigator,
    Platform,
    BackAndroid,
    ActivityIndicator,
    TouchableHighlight
} from 'react-native';

class SensorsList extends React.Component {

    static defaultProps = {
        sensors: [],
        onSensorClick: (s) => {
            console.log('onClick', s);
        }
    }

    static propTypes = {
        sensors: PropTypes.array
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

    render = () => {
        let {sensors} = this.props;


        return (
            <View>

                {sensors.map((sensor, k) => {
                    let number = +k + 1;
                    let onPress = this.props.onSensorClick.bind(this, sensor);
                    return (
                        <View key={sensor.id} >
                            <TouchableHighlight style={styles.listItem} onPress={onPress} >
                                <Text style={styles.listItemText}> {number} ) {sensor.id} - {sensor.name}</Text>
                            </TouchableHighlight>
                        </View>
                    )
                    })
                }

            </View>
        )
    }

}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#23242A',
    },

    listItem: {
        backgroundColor: 'lightblue',
        marginBottom: 5,
        padding: 10,
        borderRadius: 3
    },

    listItemText: {
        fontSize: 16
    }

});

//const mapStateToProps = (state) => {
//    return {
//        currentUserId: state.users.currentUserId,
//        loading: state.users.loading
//    }
//}

//const mapDispatchToProps = (dispatch) => {
//    return {
//        onLogout: (data) => {
//            dispatch(actions.logOut())
//        }
//    }
//}

//SensorsList = connect(mapStateToProps, mapDispatchToProps)(SensorsList)

export default SensorsList