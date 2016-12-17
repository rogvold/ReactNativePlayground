/**
 * Created by sabir on 28.11.16.
 */

import { combineReducers } from 'redux';

import UsersReducer from './UsersReducer.js';
import NavigationReducer from './NavigationReducer.js';

export const reducer = combineReducers({
    users: UsersReducer,
    navigation: NavigationReducer
});
