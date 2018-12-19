//import { RECEIVE_TRADES, GET_TRADES_COLUMNS, ADD_NEW_TRADE_SUCCESS, ADD_NEW_TRADE_FAIL, UPDATE_TRADE_SUCCESS, DELETE_TRADE_SUCCESS } from '../constants/action-types';
import  actionTypes from '../constants/action-types';

const TradeReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.RECEIVE_TRADES:
        return { ...state, trades: action.trades };

    case actionTypes.GET_TRADES_COLUMNS:
      return {...state, tradesColumn: action.tradeColumns};

    case actionTypes.ADD_NEW_TRADE_SUCCESS:
      return {...state, trades: [...state.trades, action.newlyAddedTrade], message: action.message};

    case actionTypes.ADD_NEW_TRADE_FAIL:
      return {...state, message: action.message};

    case actionTypes.UPDATE_TRADE_SUCCESS:
      let editIndex = state.trades.findIndex(x => x.trade_id === action.updatedTrade.trade_id);
      state.trades.splice(editIndex, 1, action.updatedTrade);
      return {...state, message: action.message};

    case actionTypes.DELETE_TRADE_SUCCESS:
      let deleteIndex = state.trades.findIndex(x => x.trade_id === action.tradeId);
      state.trades.splice(deleteIndex, 1);
      return{...state, message: action.message}

    default:
      return state;
  }
}

export default TradeReducer;
