import {LOGIN_USER} from "../actions/actionTypes";

let initialState = {
    user: null,
    isAuthenticated: false,
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_USER:
            localStorage.setItem('token', 'TOKEN ' + action.payload.data.auth_token);
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload.data.user
            }
        default:
            return state
    }
}

export default userReducer;
