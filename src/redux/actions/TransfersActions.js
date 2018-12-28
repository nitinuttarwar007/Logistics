import actionTypes from '../constants/action-types';

const tradeColumnsForTransfers = [
  { name: 'tradeDate', label: 'Trade Date', isDisabled: false},
  { name: 'commodity', label: 'Commodity', isDisabled: false},
  { name: 'quantity', label: 'Qty (MT)', isDisabled: false},
  { name: 'location', label: 'Location', isDisabled: false}
];

const transferActions = {

    getTradesColumnsForTransfers: () => ({
      type: actionTypes.GET_TRADES_COLUMNS_FOR_TRANSFERS,
      tradeColumnsForTransfers
    }),

    getAllPurchaseTrades: () => ({
        type: actionTypes.GET_ALL_PURCHASE_TRADES
    }),

    receiveAllPurchaseTrades: (purchaseTrades) =>({
        type: actionTypes.RECEIVE_ALL_PURCHASE_TRADES,
        purchaseTrades
    }),

    getAllSalesTrades: () => ({
        type: actionTypes.GET_ALL_SALES_TRADES
    }),

    receiveAllSalesTrades: (salesTrades) =>({
        type: actionTypes.RECEIVE_ALL_SALES_TRADES,
        salesTrades
    }),

    getMatchingTransports: (purchase, sales) => ({
        type: actionTypes.GET_MATCHING_TRANSPORTS,
        purchase,
        sales
    }),

    receiveAllMatchingTransports: (matchingTransports) => ({
        type: actionTypes.GET_MATCHING_TRANSPORTS_SUCCESS,
        matchingTransports
    }),

    updateTradeStatus: (tradeId, statusToBeUpdated) => ({
        type: actionTypes.UPDATE_TRADE_STATUS,
        tradeId,
        statusToBeUpdated
    }),

    updateTradeStatusSuccess: () => ({
        type: actionTypes.UPDATE_TRADE_STATUS_SUCCESS
    }),

    updateTransportsAddTransfer: (transportID, loadTransfer, unloandTransfer) => ({
        type: actionTypes.UPDATE_TRANSPORT_ADD_TRANSFER,
        transportID, 
        loadTransfer,
        unloandTransfer
    }),

    updateTransportsAddTransferSuccess: (message) => ({
        type: actionTypes.UPDATE_TRANSPORT_ADD_TRANSFER_SUCCESS,
        message
    })
  }
  
  export default transferActions;
  