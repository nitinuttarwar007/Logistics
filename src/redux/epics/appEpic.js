import { combineEpics } from 'redux-observable';
import { getAllTrades, addNewTrade } from './tradeEpic';

export const appEpic = combineEpics(
    getAllTrades,
    addNewTrade
);
