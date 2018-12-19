import actionTypes from '../constants/action-types';

const tradeColumns = [
  { name: 'tradeDate', label: 'Trade Date', isDisabled: false, inputType:'date' },
  { name: 'commodity', label: 'Commodity', isDisabled: false, inputType:'text'},
  { name: 'side', label: 'Side', isDisabled: false, inputType:'radio'},
  { name: 'quantity', label: 'Quantity (MT)', isDisabled: false, inputType:'text' },
  { name: 'price', label: 'Price', isDisabled: false, inputType:'text' },
  { name: 'counterparty', label: 'Counterparty', isDisabled: false, inputType:'text' },
  { name: 'location', label: 'Location', isDisabled: false, inputType:'text' }
];

const tradeActions = {
  getAllTrades: () => ({
    type: actionTypes.GET_ALL_TRADES
  }),

  receiveTrades: (trades) => ({
      type: actionTypes.RECEIVE_TRADES,
      trades
  }),

  getTradesColumns: () => ({
    type: actionTypes.GET_TRADES_COLUMNS,
    tradeColumns
  }),

  addNewTrade: (newTrade) => ({
    type: actionTypes.ADD_NEW_TRADE,
    newTrade
  }),

  newTradeSuccess: (message, newlyAddedTrade) => ({
    type: actionTypes.ADD_NEW_TRADE_SUCCESS,
    message,
    newlyAddedTrade
  }),

  newTradeFail: (message) => ({
    type: actionTypes.ADD_NEW_TRADE_FAIL,
    message
  }),

  updateTrade: (editTrade) => ({
    type: actionTypes.UPDATE_TRADE,
    editTrade
  }),

  updateTradeSuccess: (message, updatedTrade) => ({
    type: actionTypes.UPDATE_TRADE_SUCCESS,
    message,
    updatedTrade
  }),

  deleteTrade: (tradeId) => ({
    type: actionTypes.DELETE_TRADE,
    tradeId
  }),

  deleteTradeSuccess: (message, tradeId) => ({
    type: actionTypes.DELETE_TRADE_SUCCESS,
    message,
    tradeId
  })

}

export default tradeActions;
