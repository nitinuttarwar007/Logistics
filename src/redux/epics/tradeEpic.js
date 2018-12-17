import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import tradesApi  from '../../api/tradesApi';
import { receiveTrades, newTradeSuccess } from '../actions/TradeActions';
import { GET_ALL_TRADES, ADD_NEW_TRADE } from '../constants/action-types';

/**
 * search products epic
 * @param action$
 * @param store
 * @returns {any|*|Observable}
 */
export const getAllTrades = (action$) => {
  return action$
    .ofType(GET_ALL_TRADES).switchMap(() => {
      return tradesApi.getAllTrades().then(res => receiveTrades(res))
    });
};

export const addNewTrade = (action$) => {
  return action$
    .ofType(ADD_NEW_TRADE).switchMap((payload) => {
      return tradesApi.addNewTrade(payload.newTrade).then(res => newTradeSuccess(res));
    });
};
