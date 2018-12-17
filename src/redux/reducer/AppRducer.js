import TradeReducer from './TradeReducer';
import {combineReducers} from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';

const AppReducer = combineReducers({
    TradeReducer,
    reduxFormReducer
});

export default AppReducer;
