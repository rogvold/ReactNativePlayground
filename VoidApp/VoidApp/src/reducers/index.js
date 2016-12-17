import { combineReducers } from 'redux';

import BluetoothReducer from './BluetoothReducer.js';

export const reducer = combineReducers({
    bluetooth: BluetoothReducer,
});
