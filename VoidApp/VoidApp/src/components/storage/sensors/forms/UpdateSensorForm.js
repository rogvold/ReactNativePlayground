/**
 * Created by sabir on 24.12.16.
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import { Field, reduxForm } from 'redux-form'
// import { reduxForm } from 'redux-form/native'

import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Navigator,
    Platform,
    BackAndroid,
    TextInput,
    ActivityIndicator,
    TouchableHighlight
} from 'react-native';

import TextField from '../../../fields/TextField'

const UpdateSensorForm = (props) => {
    const { handleSubmit, pristine, reset, submitting, valid } = props;
    return (
        <View onSubmit={handleSubmit} style={styles.container} >
            <Text style={styles.label}>
                Sensor name
            </Text>
            <Field name={'name'}
                   style={styles.input}
                   component={TextField} placeholder={'For example, "polar #23"'} />

            <View style={styles.buttonPlaceholder} >
                <TouchableHighlight style={styles.submitButton} onPress={handleSubmit} >
                    <Text style={styles.submitButtonText} >
                        Save
                    </Text>
                </TouchableHighlight>
            </View>

        </View>
    )
}

var styles = StyleSheet.create({
    container: {
        // flex: 1,
    },
    label: {
        fontWeight: 'bold',
        marginBottom: 5
    },
    input: {
        padding: 5,
        borderRadius: 3,
        borderColor: 'black',
        borderWidth: 1,
        height: 40
    },

    buttonPlaceholder: {
        marginTop: 5
    },

    submitButton: {
        backgroundColor: 'steelblue',
        padding: 10,
        borderRadius: 3,
        height: 40
    },

    submitButtonText: {
        textAlign: 'center',
        color: 'white'
    }

});

const validate = values => {
    const errors = {}
    if (values.name == undefined || values.name.trim() == ''){
        errors.name = 'Name is empty'
    }
    return errors
}

export default reduxForm({
    syncValidation: validate,
    form: 'sensor_form'  // a unique identifier for this form
})(UpdateSensorForm)