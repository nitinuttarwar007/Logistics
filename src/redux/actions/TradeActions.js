import { GET_ALL_TRADES, RECEIVE_TRADES, GET_TRADES_COLUMNS, ADD_NEW_TRADE, ADD_NEW_TRADE_SUCCESS } from '../constants/action-types';

const tradeColumns = [
  { name: 'tradeDate', label: 'Trade Date', isDisabled: false, inputType:'date' },
  { name: 'commodity', label: 'Commodity', isDisabled: false, inputType:'text'},
  { name: 'side', label: 'Side', isDisabled: false, inputType:'radio'},
  { name: 'quantity', label: 'Quantity (MT)', isDisabled: false, inputType:'text' },
  { name: 'price', label: 'Price', isDisabled: false, inputType:'text' },
  { name: 'counterparty', label: 'Counterparty', isDisabled: false, inputType:'text' },
  { name: 'location', label: 'Location', isDisabled: false, inputType:'text' },
  { name: 'status', label: 'Status', isDisabled: true, inputType:'text' }
];

export const getAllTrades = () => ({
  type: GET_ALL_TRADES
});

export const receiveTrades = (trades) => ({
    type: RECEIVE_TRADES,
    trades
});

export const getTradesColumns = () => ({
  type: GET_TRADES_COLUMNS,
  tradeColumns
});

export const addNewTrade = (newTrade) => ({
  type: ADD_NEW_TRADE,
  newTrade
})

export const newTradeSuccess = (message) => ({
    type: ADD_NEW_TRADE_SUCCESS,
    message
});

