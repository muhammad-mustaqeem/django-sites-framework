import {CREATE_IMAGE, CREATE_VIDEO, DELETE_IMAGE, DELETE_VIDEO, FETCH_IMAGES, FETCH_VIDEOS} from "./actionTypes";

export const fetchImages = (payload) => ({
    type: FETCH_IMAGES,
    payload: payload
})

export const fetchVideos = (payload) => ({
    type: FETCH_VIDEOS,
    payload: payload
})

export const uploadImage = (payload) => ({
    type: CREATE_IMAGE,
    payload: payload
})

export const uploadVideo = (payload) => ({
    type: CREATE_VIDEO,
    payload: payload
})

export const deleteImage = (payload) => ({
    type: DELETE_IMAGE,
    payload: payload
})

export const deleteVideo = (payload) => ({
    type: DELETE_VIDEO,
    payload: payload
})

