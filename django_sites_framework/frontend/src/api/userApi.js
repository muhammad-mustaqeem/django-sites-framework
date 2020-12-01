import {loginUserUrl, logoutUserUrl, registerUserUrl} from "./urls";
import {login_user, logout_user, register_user} from "../actions/userActions";
import myHeaders from "./header";

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
    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch(logoutUserUrl, requestOptions)
        .then(response => response.json())
        .then(json => console.log(json));
}

