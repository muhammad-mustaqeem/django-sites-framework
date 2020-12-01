import {ImageContentUrl, VideoContentUrl} from "./urls";
import {deleteImage, fetchImages, fetchVideos} from "../actions/contentActions";
import myHeaders from "./header";

export const fetchImageContent = (dispatch) => {
    fetch(ImageContentUrl, {
        method: 'GET',
    }).then(response => response.json())
        .then(json => dispatch(fetchImages(json)));
}

export const fetchVideoContent = (dispatch) => {
    fetch(VideoContentUrl, {
        method: 'GET',
    }).then(response => response.json())
        .then(json => dispatch(fetchVideos(json)));
}

export const deleteImageContent = (dispatch, data) => {
    const requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        redirect: 'follow'
    };
    fetch(ImageContentUrl + data + "/", requestOptions)
        .then(response => response.json())
        .then(json => dispatch(deleteImage(json)));
}
