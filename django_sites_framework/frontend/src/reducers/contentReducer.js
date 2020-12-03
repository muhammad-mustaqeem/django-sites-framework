import {
    CREATE_IMAGE,
    CREATE_VIDEO,
    DELETE_IMAGE,
    DELETE_VIDEO, FETCH_CONTENT,
    FETCH_IMAGES,
    FETCH_VIDEOS
} from "../actions/actionTypes";

let initialState = {
    imageContent: [],
    videoContent: [],
    isVideoContentAllowed: false,
    isImageContentAllowed: false,
}

const contentReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_IMAGES:
            if (action.payload.status_code === 200) {
                return {
                    ...state,
                    imageContent: action.payload.data,
                    isImageContentAllowed: true,
                }
            }
            return {
                ...state,
                isImageContentAllowed: false,
            }
        case FETCH_CONTENT:
            let content = {...state};
            if (action.payload.data.images_allowed){
                content.imageContent = action.payload.data.images;
                content.isImageContentAllowed = true;
            }
            if (action.payload.data.videos_allowed){
                content.imageContent = action.payload.data.videos;
                content.isVideoContentAllowed = true;
            }
            console.log('CONTENT API = ',content);
            return content;
        case FETCH_VIDEOS:
            if (action.payload.status_code === 200) {
                return {
                    ...state,
                    videoContent: action.payload.data,
                    isVideoContentAllowed: true,
                }
            }
            return {
                ...state,
                isVideoContentAllowed: false,
            }
        case CREATE_IMAGE:
            return {
                ...state,
                imageContent: [...state.imageContent, action.payload.data]
            }
        case CREATE_VIDEO:
            return {
                ...state,
                videoContent: [...state.videoContent, action.payload.data]
            }
        case DELETE_IMAGE:
            return {
                ...state,
                imageContent: state.imageContent.filter(image => parseInt(image.id) !== parseInt(action.payload.data.id)),
            }
        case DELETE_VIDEO:
            return {
                ...state,
                videoContent: state.videoContent.filter(video => parseInt(video.id) !== parseInt(action.payload.data.id)),
            }
        default:
            return state;
    }
}

export default contentReducer;
