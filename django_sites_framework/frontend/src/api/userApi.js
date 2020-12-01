import {loginUserUrl, logoutUserUrl, registerUserUrl} from "./urls";
import {login_user, logout_user, register_user} from "../actions/userActions";

export const loginUser = (dispatch, data) => {
    fetch(loginUserUrl, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => response.json())
        .then(json => dispatch(login_user(json)));
}

export const registerUser = (dispatch, data) => {
    fetch(registerUserUrl, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => response.json())
        .then(json => dispatch(register_user(json)));
}


export const logoutUser = (dispatch) => {
    let myHeaders = new Headers();
    myHeaders.append("Authorization", localStorage.getItem('token'));
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
    };

    fetch(logoutUserUrl, requestOptions)
        .then(response => response.json())
        .then(json => dispatch(logout_user(json)));
}
