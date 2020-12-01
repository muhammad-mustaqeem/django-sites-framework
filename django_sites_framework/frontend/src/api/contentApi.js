import {ImageContentUrl} from "./urls";
import {fetchImages} from "../actions/contentActions";

export const fetchImageContent = (dispatch) => {
    fetch(ImageContentUrl, {
        method: 'GET',
    }).then(response => response.json())
        .then(json => dispatch(fetchImages(json)));
}

export const deleteImageContent = (dispatch, data) => {
    fetch(ImageContentUrl + data + "/", {
        method: 'GET',
    }).then(response => response.json())
        .then(json => dispatch(fetchImages(json)));
}
