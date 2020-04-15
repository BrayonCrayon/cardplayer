import * as actions from '../constants/authConstants'

const initialState = {
    token: "",    
    user: {},
};


export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case actions.SET_AUTH_TOKEN:
            return {
                ...state,
                token: action.token,
            };
        case actions.SET_USER:
            return {
                ...state,
                user: action.user,
            };
        default:
            return state
    }
};

export const getToken = state => state.token;
export const getUserId = state => state.user;
