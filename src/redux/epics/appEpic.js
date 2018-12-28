import { combineEpics } from 'redux-observable';
import tradeEpic from './tradeEpic';
import transportsEpic from './transportsEpic';
import transferEpic from './transferEpic';

export const appEpic = combineEpics(
    tradeEpic.getAllTrades,
    tradeEpic.addNewTrade,
    tradeEpic.updateTrade,
    tradeEpic.deleteTrade,
    
    transportsEpic.getAllTransports,
    transportsEpic.addNewTransport,
    transportsEpic.updateTransport,
    transportsEpic.deleteTransport,
    transportsEpic.getPurchaseTransports,
    transportsEpic.getSalesTransports,
    
    transferEpic.getAllPurchaseTrades,
    transferEpic.getAllSalesTrades,
    transferEpic.getAllMatchingTransports,
    transferEpic.updateTradeStatus,
    transferEpic.updateTransportsAddTransfer,
   
);
