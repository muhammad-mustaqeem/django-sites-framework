import {LOGIN_USER, LOGOUT_USER, REGISTER_USER} from "../actions/actionTypes";

let initialState = {
    user: null,
    isAuthenticated: false,
    serverSideErrors: [],
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_USER:
            localStorage.setItem('token', 'TOKEN ' + action.payload.data.auth_token.trim());
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload.data.user
            }
        case LOGOUT_USER:
            localStorage.removeItem('token');
            return {
                serverSideErrors: [],
                isAuthenticated: false,
                user: null
            }
        case REGISTER_USER:
            if (action.payload.status_code === 201) {
                localStorage.setItem('token', "Token " + action.payload.data.auth_token);
                return {
                    ...state,
                    user: action.payload.data.user,
                    isAuthenticated: true,
                };
            }
            return {
                ...state,
                serverSideErrors: action.payload,
            };
        default:
            return state
    }
}

export default userReducer;
