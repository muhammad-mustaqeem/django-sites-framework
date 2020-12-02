import {combineReducers} from 'redux'
import userReducer from './userReducer';
import contentReducer from "./contentReducer";

const rootReducer = combineReducers({
    user: userReducer,
    content: contentReducer,
});

export default rootReducer;
