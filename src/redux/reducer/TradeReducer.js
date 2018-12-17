import { RECEIVE_TRADES, GET_TRADES_COLUMNS, ADD_NEW_TRADE_SUCCESS} from '../constants/action-types';

const TradeReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_TRADES:
        return { ...state, trades: action.trades };
    case GET_TRADES_COLUMNS:
      return {...state, tradesColumn: action.tradeColumns};
    case ADD_NEW_TRADE_SUCCESS:
      return {...state, message: action.message};
    default:
      return state;
  }
}

export default TradeReducer;
