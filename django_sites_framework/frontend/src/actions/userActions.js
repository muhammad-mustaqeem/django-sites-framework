import {LOGIN_USER, LOGOUT_USER, REGISTER_USER} from "./actionTypes";


export const login_user = (payload) => ({
    type: LOGIN_USER,
    payload: payload
})

export const register_user = (payload) => ({
    type: REGISTER_USER,
    payload: payload
})

export const logout_user = (payload) => ({
    type: LOGOUT_USER,
    payload: payload
})
