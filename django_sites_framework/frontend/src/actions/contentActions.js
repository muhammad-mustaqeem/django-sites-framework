import {DELETE_IMAGE, FETCH_IMAGES} from "./actionTypes";

export const fetchImages = (payload) => ({
    type: FETCH_IMAGES,
    payload: payload
})

export const deleteImage = (payload) => ({
    type: DELETE_IMAGE,
    payload: payload
})

