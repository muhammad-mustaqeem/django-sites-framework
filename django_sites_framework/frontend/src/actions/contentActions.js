import {DELETE_IMAGE, FETCH_IMAGES, FETCH_VIDEOS} from "./actionTypes";

export const fetchImages = (payload) => ({
    type: FETCH_IMAGES,
    payload: payload
})

export const fetchVideos = (payload) => ({
    type: FETCH_VIDEOS,
    payload: payload
})

export const deleteImage = (payload) => ({
    type: DELETE_IMAGE,
    payload: payload
})

