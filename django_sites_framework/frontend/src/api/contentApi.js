import {ImageContentUrl, VideoContentUrl} from "./urls";
import {deleteImage, deleteVideo, fetchImages, fetchVideos, uploadImage, uploadVideo} from "../actions/contentActions";
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

export const deleteVideoContent = (dispatch, data) => {
    const requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch(VideoContentUrl + data + "/", requestOptions)
        .then(response => response.json())
        .then(json => dispatch(deleteVideo(json)));
}

export const uploadImageContent = (dispatch, data) => {
    const requestOptions = {
        method: 'POST',
        body: data,
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch(ImageContentUrl, requestOptions)
        .then(response => response.json())
        .then(json => dispatch(uploadImage(json)));
}

export const uploadVideoContent = (dispatch, data) => {
    const requestOptions = {
        method: 'POST',
        body: data,
        headers: myHeaders,
        redirect: 'follow'
    };
    fetch(VideoContentUrl, requestOptions)
        .then(response => response.json())
        .then(json => dispatch(uploadVideo(json)));
}
