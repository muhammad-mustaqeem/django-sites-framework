import {loginUserUrl} from "./urls";
import {login_user} from "../actions/userActions";

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