import { combineReducers } from 'redux';
import counterReducer from './counterReducer';
import userReducer from './UserReducer';

const rootReducer = combineReducers({
       accountUser: userReducer,
});

export default rootReducer;