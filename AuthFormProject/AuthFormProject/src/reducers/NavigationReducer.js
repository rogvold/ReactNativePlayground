import * as types from '../constants/ActionTypes.js'

const initialState = {
    tab: 'index'
}

const NavigationReducer =  (state = initialState, action = {}) => {

    switch (action.type) {

        case types.SWITCH_TAB:
            return {...state, tab: action.tab}

        default:
        return state;
    }

}

export default NavigationReducer;
