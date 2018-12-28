import {combineReducers} from 'redux';
import TradeReducer from './TradeReducer';
import TransportsReducer from './TransportsReducer';
import TransferReducer from './TransferReducer';

const AppReducer = combineReducers({
    TradeReducer,
    TransportsReducer,
    TransferReducer
});

export default AppReducer;
