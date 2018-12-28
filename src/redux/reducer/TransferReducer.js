import  actionTypes from '../constants/action-types';

const TransferReducer = (state = {}, action) => {
    switch (action.type) {

        case actionTypes.GET_TRADES_COLUMNS_FOR_TRANSFERS:
            return { ...state, tradesColumn: action.tradeColumnsForTransfers};

        case actionTypes.RECEIVE_ALL_PURCHASE_TRADES:
            return { ...state, purchaseTrades: action.purchaseTrades };

        case actionTypes.RECEIVE_ALL_SALES_TRADES:
            return { ...state, salesTrades: action.salesTrades };

        case actionTypes.GET_MATCHING_TRANSPORTS_SUCCESS:
            return { ...state, matchingTransports: action.matchingTransports};

        case actionTypes.UPDATE_TRADE_STATUS_SUCCESS:
            return state;

        case actionTypes.UPDATE_TRANSPORT_ADD_TRANSFER_SUCCESS:
            return {...state, message: action.message};

        default:
            return state;
    }

}

export default TransferReducer;