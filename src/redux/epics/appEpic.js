import { combineEpics } from 'redux-observable';
import tradeEpic from './tradeEpic';

export const appEpic = combineEpics(
    tradeEpic.getAllTrades,
    tradeEpic.addNewTrade,
    tradeEpic.updateTrade,
    tradeEpic.deleteTrade
);
