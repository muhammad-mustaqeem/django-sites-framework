import {CREATE_IMAGE, DELETE_IMAGE, FETCH_IMAGES} from "../actions/actionTypes";

let initialState = {
    imageContent : [],
    videoContent : [],
}

const contentReducer = (state = initialState, action) =>{
    switch (action.type) {
        case FETCH_IMAGES:
            return {
                ...state,
                imageContent : action.payload.data,
            }
        case CREATE_IMAGE:
            return {
                ...state,
                imageContent : action.payload.data,
            }
        case DELETE_IMAGE:
            return {
                ...state,
                imageContent : this.imageContent.filter(image => parseInt(image.id) !== parseInt(action.payload.data.id)),
            }
        default:
            return state;
    }
}

export default contentReducer;